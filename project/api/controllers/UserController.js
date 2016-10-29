/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	Details : function(req, res){

		console.log( req.session.user);
    /*Eq_admin_formulaire.GetFormulaireWithMatricul(req.session.user.id_pers, function(err, formulaires){
      if(err) return res.badRequest(err);
      if(formulaires == undefined) res.badRequest(MessageErrorService.NotFoundIdFormulaire());

      return res.view('backend/Index', {historiques : historiques, active : 2});
      });*/

    	return res.view('backend/profile', {message : false, layout : 'layoutBackend'});
    },
    Register : function(req, res){
    	return res.view('backend/Index', {message : false, layout : '../layoutBackend'});
    },
};

