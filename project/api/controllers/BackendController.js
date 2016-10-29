/**
 * BackendController
 *
 * @description :: Server-side logic for managing backends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');


module.exports = {

  Acceuil : function(req, res){
    /*Eq_admin_formulaire.GetFormulaireWithMatricul(req.session.user.id_pers, function(err, formulaires){
      if(err) return res.badRequest(err);
      if(formulaires == undefined) res.badRequest(MessageErrorService.NotFoundIdFormulaire());

      return res.view('backend/Index', {historiques : historiques, active : 2});
      });*/
    Historique_intrusion.GetHisto("", function(err, val){
      return res.view('backend/Index', {message : false, list: val, layout : 'layoutBackend'});
    });
    
    },

  //création de nouvelle formulaire (pour avoir departement, titre, date, matricul créateur)
  NewFormulaire : function(req,res){
    async.series([
      R_departement.GetAll
    ],
    function(err, results){
      var departement = results[0];

      return res.view("backend/CreateEnquete", {departement : departement, active : 2});
    });
  },

  //enregistrement du nouveau formulaire et retourne la fenêtre de création de formulaire
  SaveNewFormulaire : function(req,res){

    if(req.param('titre') == undefined || req.param('titre') == "") return res.badRequest(MessageErrorService.ErrorTitre());
    if(!ValidationService.ValidateListNotEmpty(req.param('personnes'))) return res.badRequest("Liste des personnes concernées vide");

    var donnee = {
        titre : req.param('titre'),
        noteMaximum : req.param('noteMaximum'),
        departement : req.session.user.departement,
        date : DateService.DateDuJour('dd/mm/yyyy'),
        matricul : req.session.user.id_pers
    };

    var personnes = req.param('personnes');

    async.waterfall([
      function insertionFormulaire(callback){
        Eq_formulaire.Insert(donnee,callback);
      },

      function insertionPersForm(formulaire, callback){

        //ajout des matriculs par défaut (Stephane, mirah, mariolla, adrien)
        var matriculParDefauts = [1, 177, 665, 709, req.session.user.id_pers];

        matriculParDefauts.forEach(function(matriculParDefaut){
          //pour eviter les doublons
          if(!_.includes(personnes, matriculParDefaut)){
            personnes.push(matriculParDefaut);
          }
        });

        Eq_personne_formulaire.InsertListPersonne(personnes, formulaire.id_formulaire, function(err, personnes){
          if(err) return callback(err);

          return callback(null, formulaire);
        });
      },

      function insertionAdmin(formulaire, callback){
        Eq_admin_formulaire.InsertSingle(req.session.user.id_pers, formulaire.id_formulaire, function(err){
          if(err) return callback(err);

          return callback(null, formulaire);
        });
      }

    ],function(err, formulaire){
      if(err) return res.badRequest(err);
      if(formulaire == undefined) return res.badRequest(MessageErrorService.NotFoundIdFormulaire());

      else return res.ok(formulaire.id_formulaire);
    });

  },

  //mettre a jour l'enquete
  UpdateFormulaire : function(req, res){
    if(req.param('id_formulaire') == undefined) return res.badRequest(MessageErrorService.FormatIdFormulaire());

    var id_formulaire = req.param('id_formulaire');

    async.series([
        function(callback){
          Eq_question.GetWithFormulaireWithDefault(id_formulaire, callback);
        },
        function(callback){
          Eq_formulaire.Get(id_formulaire, callback);
        },
        Eq_input_type.GetAll
      ],
      function(err, results){
        if(err)  return res.badRequest(err);

        var listQuestion = results[0];
        var formulaire = results[1];
        var listInput = results[2];


        if(formulaire != undefined){

          return res.view("backend/EditFormulaire", {listInput : listInput, formulaire : formulaire, listQuestion : listQuestion ,update : false, active : 2});
        }
        else{
          return res.badRequest("Erreur récupération formulaire");
        }
      });
  },

  SaveQuestion : function(req, res){
    if(req.param('id_formulaire') == undefined) return res.badRequest(MessageErrorService.FormatIdFormulaire());

    var data = {
      id_formulaire : req.param('id_formulaire'),
      type : req.param('type'),
      titre : req.param('titre'),
      description : req.param('description'),
      question : req.param('question'),
      defaultValue : req.param('defaultValue')
    }

    Eq_question.InsertWithDefaultValue(data, function(err){
      if(err) return res.badRequest(MessageErrorService.ErrorInsertQuestion());

      //on prend la liste des questions
      async.series([
          function(callback){
            Eq_question.GetWithFormulaireWithDefault(data.id_formulaire, callback);
          }
        ],
        function(err, results){
          if(err) res.badRequest(err);

          var listQuestion = results[0];

          return res.view("backend/ListQuestion", {layout : false, listQuestion : listQuestion});
        });
    });

  },


  //retourne une json de question
  GetQuestion : function(req, res){
    if(req.param('id') == undefined) return res.badRequest(MessageErrorService.FormatIdQuestion());

    var id = req.param('id');
    Eq_question.Get(id, function(err, question){
      if(err) return res.badRequest(err);

      return res.json(question);
    });
  },

  //pour avoir la liste des questions
  GetListQuestion : function(req,res){
    if(req.param('id_formulaire') == undefined) return res.badRequest(MessageErrorService.FormatIdFormulaire());

    var id_formulaire = req.param('id_formulaire');

    async.series([
        function(callback){
          Eq_question.GetWithFormulaireWithDefault(id_formulaire, callback);
        }
      ],
      function(err, results){
        if(err) return res.badRequest(err);

        var listQuestion = results[0];

        return res.view("backend/ListQuestion",{layout : null, listQuestion : listQuestion});
      });
  },

  //supprmie la question
  DeleteQuestion : function(req, res){
    var id_question = req.param('id');
    if(id_question == undefined) return res.badRequest("Identifiant question invalide");

    Eq_question.DeleteWithDefaultValue(id_question, function(err, resultats){
      if(err) return res.badRequest(err);

      return res.ok();
    });
  },

  DeleteFormulaire : function(req, res){
    var id_formulaire = req.param('id_formulaire');
    if(id_formulaire == undefined) return res.badRequest(MessageErrorService.FormatIdFormulaire());

    Eq_formulaire.DeleteWithQuestion(id_formulaire, function(err, resultats){
      if(err) return res.badRequest(err);

      return res.ok();
    });
  },

  //récupération valeur par défaut
  GetDefaultValue : function(req, res){
    var id_question = req.param('id');

    Eq_default_value.GetWithQuestion(id_question, function (err, list) {
      if(err) return res.badRequest(err);

      return res.json(list);
    });
  },

  //ajoute une valeur par défaut au question spécifier
  AddDefaultValue  : function(req, res){
    var id_question = req.param('id');
    var value = req.param('value');

    CommonService.AddDefaultValue(id_question, value, function (err, list) {
      if(err) return res.badRequest(err);

      return res.json(list);
    });
  },


  //retourne un tableau contenant les listes de formulaire de l'utilisateur
  GetFormulaire : function(req, res){
    Eq_admin_formulaire.GetFormulaireWithMatricul(req.session.user.id_pers, function(err, formulaires){
      if(err) return res.badRequest(err);

      return res.view('backend/Index', {formulaires : formulaires, layout : false});
    });
  },

  GetAdmin : function(req, res){
    var id_formulaire = req.param('id_formulaire');
    if(!ValidationService.ValidateId(id_formulaire)) return res.badRequest(MessageErrorService.FormatIdFormulaire());

    Eq_admin_formulaire.GetAdmin(id_formulaire, function(err, admins){
      if(err) return res.badRequest(err);

      return res.json(admins);
    });
  },

  SaveAdminList : function(req, res){
    var admins = req.param('admins');
    var id_formulaire = req.param('id_formulaire');
    if(!ValidationService.ValidateListNotEmpty(admins)) return res.badRequest("Liste Administrateur vide");
    if(!ValidationService.ValidateId(id_formulaire)) return res.badRequest(MessageErrorService.FormatIdFormulaire());

    Eq_admin_formulaire.InsertWithDelete(id_formulaire, admins, function(err){
      if(err) return res.badRequest(err);

      return res.ok();
    });
  }

};

