/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	Details : function(req, res){
    /*Eq_admin_formulaire.GetFormulaireWithMatricul(req.session.user.id_pers, function(err, formulaires){
      if(err) return res.badRequest(err);
      if(formulaires == undefined) res.badRequest(MessageErrorService.NotFoundIdFormulaire());

      return res.view('backend/Index', {historiques : historiques, active : 2});
      });*/

      if(typeof  req.session.user == "undefined")
      {

        return res.redirect("/login");
      }

      var personne = req.session.user;

      Societe.find(function(err, societes) {
        if (err) {return res.serverError(err);}
       return res.view('backend/profile', {personne: personne, societes : societes,message : false, layout : 'layoutBackend'});
    });

    	
    },
    Register : function(req, res){

        Societe.find(function(err, societes) {
          if (err) {return res.serverError(err);}
         return res.view('backend/profile', {societes : societes,message : false, layout : 'layoutBackend'});
      });
    },

    Save : function(req,res){

      var user_id = req.param('id_user') ;

      if( user_id != '' && parseInt(user_id) > 0)
      {
        User.update({id_user:user_id
                  },
                  {
                    nom:req.param('nom'),
                    prenom: req.param('prenom'),
                    adresse: req.param('adresse'),
                    cp:req.param('cp'),
                    ville:req.param('ville'),
                    tel:req.param('tel'),
                    mail:req.param('mail'),
                    moyen_com:req.param('moyen_com[]'),
                    username:req.param('identifiant'),
                    actif:1,
                    societe: req.param('societe')}).exec(function afterwards(err, updated){

                    if (err) {
                      // handle error here- e.g. `res.serverError(err);`
                      return;
                    }
                  });

        if(req.param('password') != '')
        {
          User.update({id_user:user_id
                  },
                  {
                    password:req.param('password')
                  }).exec(function afterwards(err, updated){

                    if (err) {
                      // handle error here- e.g. `res.serverError(err);`
                      return;
                    }
                  });
        }

        User.find({id_user:user_id}).exec(function (err, current){
        if (err) {
            return res.serverError(err);
          }
          req.session.user = undefined;    
          req.session.user = current;
        });

        return res.redirect("/tableau_bord");
      }
      else
      {
        var intrusions = req.param('intrusion[]');
        var categories = req.param('categories');

          User.create(
                    {
                      nom:req.param('nom'),
                      prenom: req.param('prenom'),
                      adresse: req.param('adresse'),
                      cp:req.param('cp'),
                      ville:req.param('ville'),
                      tel:req.param('tel'),
                      mail:req.param('mail'),
                      moyen_com:req.param('moyen_com[]'),
                      password:req.param('password'),
                      username:req.param('username'),
                      actif:1,
                      societe: req.param('societe')
                    }).exec(function (err, finn){
                      if (err) { 
                        return res.serverError(err);
                      }

                      var id = finn.id;

                      
                      
                    });
          return res.redirect("/tableau_bord");     

      }

      
    }
};

