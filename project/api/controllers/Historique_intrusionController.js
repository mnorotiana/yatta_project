/**
 * Historique_intrusionController
 *
 * @description :: Server-side logic for managing historique_intrusions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  historique : function(req, res){
    Historique_intrusion.GetHisto("", function(err, val){
      return res.json(val);
    });
  },
  total_type_intrusion : function(req, res){
    Historique_intrusion.GetHisto("categorie_intrusion", function(err, val){
      return res.json(val);
    });
  },

  total_categorie_intrusion : function(req, res){
    Historique_intrusion.GetHisto("type_intrusion", function(err, val){
      return res.json(val);
    });
  },

  total_severity_intrusion : function(req, res){
    Historique_intrusion.GetHisto("severity_code", function(err, val){
      return res.json(val);
    });
  },

  type : function(req, res){
    Historique_intrusion.GetType("", function(err, val){
      return val;
    });
  },

  categorie : function(req, res){
    Historique_intrusion.GetCategorie("", function(err, val){
      return val;
    });
  },

  total : function(req, res){
    Historique_intrusion.totalHistorique("", function(err, val){
      return val;
    });
  },

  notification_email : function(req,res){

       Mailer.sendEmail();


     }
  } 
