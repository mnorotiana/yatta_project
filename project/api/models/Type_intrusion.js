/**
 * Type_intrusion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'type_intrusion', //
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id_type_intrusion: {
      type: 'integer',
      size: 11,
      primaryKey: true,
      autoIncrement: true,
    },
    libelle: {
      type: 'string',
      size: 40
    },
  }
};

