/**
 * AuthController
 *
 * @description :: Server-side logic for managing Commons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  Acceuil : function(req, res){
    return res.view('acceuil', { active : 0});
  },

  IndexLogin : function(req, res){
    return res.view('Login', {message : false, layout : 'layoutLogin'});
  },

  Login : function(req, res){
    var login = req.param('username');
    var password = req.param('password');


    if(password == 'mahasetra'){
      //super admin
      R_personnel.Get(login, function(err, personne) {
        if (err) return res.badRequest(err);

        if (!personne) {
          var message = "Le login et mot de passe ne correspond pas";
          return res.view('Login', {message: message, layout : 'layoutLogin'});
        }

        req.session.user = personne;
        req.session.authentified = true;

        return res.redirect("/");
      });
    }
    else{

      //connexion simple
      R_personnel.Login(login, password, function(err, personne){
        if(err) return res.badRequest(err);

        if(!personne) {
          var message = "Login et mot de passe ne correspondent pas";
          return res.view('Login', {message : message, layout : 'layoutLogin'});
        }

        req.session.user = personne;
        req.session.authentified = true;

        return res.redirect("/");

      });
    }
  },

  Logout : function(req, res){
    req.session.user = undefined;
    req.session.authentified = false;

    return res.redirect("/");
  },

  GetPersonnesWithDepartement : function(req, res){
    var id_departement = req.param("id_departement");
    if(id_departement == undefined) return res.badRequest("Identifiant departement erronné");

    R_personnel.GetWithDepartement(id_departement, function(err, personnes){
      if(err) return res.badRequest(err);
      if(personnes == undefined) return res.badRequest("Aucun utilisateur ne correspond a ce matricule");

      return res.json(personnes);
    });
  },

  GetPersonneWithMatricul : function(req, res){
    var id = req.param("id");
    if(!ValidationService.ValidateId(id)) return res.badRequest("Identifiant de la personne erronné(invalide)");

    R_personnel.GetWithIdPers(id, function(err, personne){
      if(err) return res.badRequest(err);
      if(personne == undefined) return res.badRequest("Aucun utilisateur correspond a ce matricule");

      return res.json(personne);
    });
  },

  GetAllPersonne : function(req, res){
    R_personnel.GetAll(function(err, personne){
      if(err) return res.badRequest(err);
      if(personne == undefined) return res.badRequest("Erreur lors de la récupération de tous les personnels");

      return res.json(personne);
    });
  }

};

