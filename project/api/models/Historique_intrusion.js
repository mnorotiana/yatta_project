/**
 * Historique_intrusion.js
 *
 * @description :: Model pour l'historique des intrusions.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'historique_intrusion', //
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id_historique_intrusion: {
      type: 'integer',
      size: 11,
      autoIncrement: true,
      primaryKey: true,
      defaultsTo: 0
    },
    id_type_intrusion: {
      type: 'int',
      size: 11
    },
    ip: {
      type: 'string',
      size: 40
    },
    date_intrusion: {
      type: 'datetime'
    }
  },
  GetAll : function(next){
    Historique_intrusion.find()
      .sort({id_historique_intrusion : 'desc'})
      .exec(function(err, historique_intrusion){
        if(err) next(err);
        return next(null, historique_intrusion);
      });
  },

  //Chargement des historiques
  GetHisto : function(req, res){

    var param = req.params.all();
    var param_date = (param._date != null)?" AND historique_intrusion.date_intrusion = '" + param._date + "'" :"";
    if(!param) return res.err("Error: param ");

    var query = "SELECT historique_intrusion.id_historique_intrusion, " +
      "historique_intrusion.id_type_intrusion, " +
      "historique_intrusion.ip, " +
      "historique_intrusion.date_intrusion, categorie_intrusion.libelle, type_intrusion.libelle  " +

      " LEFT JOIN Lien_intrusion_categorie ON historique_intrusion.id_historique_intrusion = Lien_intrusion_categorie.id_lien_intrusion " +
      " LEFT JOIN categorie_intrusion ON historique_intrusion.id_categorie = categorie_intrusion.id_categorie_intrusion " +
      " LEFT JOIN type_intrusion ON historique_intrusion.id_type_intrusion = type_intrusion.id_type_intrusion " +
      " FROM historique_intrusion WHERE 1=1" + param_date;

    historique_intrusion.query(query, function(err, res){
      if(err) return next(err);
      if(rows[0].count > 0) return null;
      else return  res.rows;
    });
  },

  Delete : function(id_question, callback){
    historique_intrusion.destroy({id_historique_intrusion : id_question})
      .exec(function(err){
        if(err) return callback(err);
        return callback(null);
      });
  },
};

