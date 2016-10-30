/**
 * Societe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'societe', //
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id_societe: {
      type: 'integer',
      size: 11,
      autoIncrement: true
    },
    nom: {
      type: 'string',
      size: 40
    },
    nif_stat: {
      type: 'string',
      size: 40
    },
    adresse: {
      type: 'string',
      size: 40
    },
  },
  GetAll : function(next){
  Societe.find()
      .sort({id_societe : 'asc'})
      .exec(function(err, societe){
        if(err) next(err);
        return next(null, societe);
      });
  }
};

