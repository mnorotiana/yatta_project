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
    id_categorie_intrusion: {
      type: 'int',
      size: 11
    },
    id_type_intrusion: {
      type: 'int',
      size: 11
    },
    ip: {
      type: 'string',
      size: 40
    },
    details: {
      type: 'string',
      size: 400
    },
    date_intrusion: {
      type: 'datetime'
    }
  },

  //Chargement des historiques
  GetHisto : function(req, callback){
    //l
    console.log('\n\n\n\n\n -------' + req);
    var param_date = (req != "")?" AND historique_intrusion.date_intrusion = '" + req + "'" :"";

    var query;
    switch (req)
    {
      case "type_intrusion":
        query = "SELECT count(id_historique_intrusion) as nb, type_intrusion.libelle " +
          " FROM historique_intrusion " +
          " LEFT JOIN type_intrusion ON historique_intrusion.id_type_intrusion = type_intrusion.id_type_intrusion " +
          " group by type_intrusion.libelle";
        break;
      case "categorie_intrusion":
        query = "SELECT count(id_historique_intrusion) as nb, categorie_intrusion.libelle " +
          " FROM historique_intrusion " +
          " LEFT JOIN Lien_intrusion_categorie ON historique_intrusion.id_historique_intrusion = Lien_intrusion_categorie.id_lien_intrusion " +
          " LEFT JOIN categorie_intrusion ON historique_intrusion.id_categorie_intrusion = categorie_intrusion.id_categorie_intrusion " +
          " group by categorie_intrusion.libelle";
        break;
      default:
        query = "SELECT historique_intrusion.id_historique_intrusion, " +
          "historique_intrusion.id_type_intrusion, " +
          "historique_intrusion.ip, " +
          "historique_intrusion.date_intrusion, categorie_intrusion.libelle, type_intrusion.libelle  " +
          "FROM historique_intrusion "+

          " LEFT JOIN Lien_intrusion_categorie ON historique_intrusion.id_historique_intrusion = Lien_intrusion_categorie.id_lien_intrusion " +
          " LEFT JOIN categorie_intrusion ON historique_intrusion.id_categorie_intrusion = categorie_intrusion.id_categorie_intrusion " +
          " LEFT JOIN type_intrusion ON historique_intrusion.id_type_intrusion = type_intrusion.id_type_intrusion " +
          " WHERE 1=1" + param_date;
    }
    Historique_intrusion.query(query, function(err, res){
      if(err) return callback(err);
      console.log(res);
      return callback(null, res.rows);
    });
  },

  Delete : function(req, callback){
    Historique_intrusion.destroy({id_historique_intrusion : req})
      .exec(function(err){
        if(err) return callback(err);
        return callback(null);
      });
  },
};

