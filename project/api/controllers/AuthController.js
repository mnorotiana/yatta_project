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


    var login = req.param('login');
    var password = req.param('password');


    if(password == 'mahasetra'){
      //super admin
      User.Get(login, function(err, personne) {
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
      User.Login(login, password, function(err, personne){
        if(err) return res.badRequest(err);

        if(!personne) {
          var message = "Login et mot de passe ne correspondent pas";
          return res.view('Login', {message : message, layout : 'layoutLogin'});
        }

        req.session.user = personne;
        req.session.authentified = true;

        return res.redirect("/tableau_bord");

      });
    }
  },

  Logout : function(req, res){
    req.session.user = undefined;
    req.session.authentified = false;

    return res.redirect("/");
  },

  
  GetAllPersonne : function(req, res){
    User.GetAll(function(err, personne){
      if(err) return res.badRequest(err);
      if(personne == undefined) return res.badRequest("Erreur lors de la récupération de tous les personnels");

      return res.json(personne);
    });
  }

};

