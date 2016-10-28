/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'user', // nom du table qui est associé avec le modele Dossier
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_user: { //id du dossier
      type: 'integer',
      size: 11,
      autoIncrement: true,
      defaultsTo: 0,
    },
    nom: {
      type: 'string',
      size: 40

    },

    prenom: {
      type: 'string',
      size: 40
    },

    adresse: {
      type: 'string',
      size: 255
    },

    cp: {
      type: 'string',
      size: 40
    },

    ville: {
      type: 'string',
      size: 40
    },

    pays: {
      type: 'string',
      size: 40
    },

    age: {
      type: 'datetime',
      size: 40
    },

    mail: {
      type: 'string',
      size: 40
    },

    tel: {
      type: 'integer',
      size: 10,
      defaultsTo: 0
    },

    username: {
      type: 'string',
      size: 40
    },

    password: {
      type: 'string',
      size: 40
    },

    actif:{
      type: 'boolean',
      columnName: 'actif'
    }

  },

  Login : function(login, password, next){
    User.findOne({username : login, password : password, actif : true})
      .exec(function(err, personne){
        if(err) next(err);

        return next(null, personne);
      });
  }
};

