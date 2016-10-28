/**
 * Historique_intrusionController
 *
 * @description :: Server-side logic for managing historique_intrusions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  historique : function(req, res){
    Historique_intrusion.GetHisto("", function(err, val){
      //if(err) return res.badRequest(err);
      console.log(val);
      return res.json(val);
    });
  },
  total_type_intrusion : function(req, res){
    Historique_intrusion.GetHistoParType("", function(err, val){
      //if(err) return res.badRequest(err);
      console.log(val);
      return res.json(val);
    });
  },

  total_categorie_intrusion : function(req, res){
    Historique_intrusion.GetHistoParCategorie("", function(err, val){
      //if(err) return res.badRequest(err);
      console.log(val);
      return res.json(val);
    });
  },
};

