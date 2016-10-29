/**
 * Categorie_intrusion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'categorie_intrusion', //
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id_categorie_intrusion: {
      type: 'int',
      size: 11,
      primaryKey: true,
    },
    libelle: {
      type: 'string',
      size: 40
    },
  },
  Get : function(req, res){
    if(req.id_categorie_intrusion)
    categorie_intrusion.findOne({id_categorie_intrusion : req.id_categorie_intrusion})
      .populate('id_input_type')
      .sort({id_question : 'asc'})
      .exec(function(err, questions){
        if(err) return callback(err);

        return callback(null, questions);
      });
  },
};
