/**
 * Lien_intrusion_categorie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'lien_intrusion_categorie', // nom du table qui est associé avec le modele Dossier
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_lien_intrusion: {
        type: 'integer',
        size: 11,
        autoIncrement: true,
        defaultsTo: 0,
      primaryKey: true,
      },
    id_intrusion: {
      type: 'integer',
      size: 11,
      autoIncrement: true,
      defaultsTo: 0,
    },
    id_categorie: {
      type: 'integer',
      size: 11,
      autoIncrement: true,
      defaultsTo: 0,
    },
  }
};

