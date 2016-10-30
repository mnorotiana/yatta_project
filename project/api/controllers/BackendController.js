/**
 * BackendController
 *
 * @description :: Server-side logic for managing backends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');


module.exports = {

  Acceuil : function(req, res){
    
    Historique_intrusion.GetHisto("", function(err, val){

      console.log(val);
      return res.view('backend/Index', {message : false, list: val, layout : 'layoutBackend'});
    });

    },

};

