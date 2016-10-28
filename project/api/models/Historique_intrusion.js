/**
 * Historique_intrusion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'tistorique_intrusion', //
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id_historique_intrusion: {
      type: 'integer',
      size: 11,
      autoIncrement: true,
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
  }
};

