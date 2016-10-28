/**
 * Categorie_intrusion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'Categorie_intrusion', //
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id_categorie_intrusion: {
      type: 'int',
      size: 11
    },
    libelle: {
      type: 'string',
      size: 40
    },
  }
};
