module.exports = { 
	 run : function(req,res){ 

	 	console.log('debut');

	 	var https = require('http');

	    var options = {
	      host: '192.168.1.209',
	      port: 9200,
	      path: '/filebeat-*/_search?pretty',
	      method: 'GET'
	    };

	    https.request(options, function(response) {
	    var responseData = '';
	    response.setEncoding('utf8');

	    response.on('data', function(chunk){
	      responseData += chunk;
	    });

	    response.once('error', function(err){
	      // Some error handling here, e.g.:
	      res.serverError(err);
	    });

	    response.on('end', function(){
	      try {
	        // response available as `responseData` in `yourview`
	        // insertion dans la base de donnée

	        var toInsert = [];
	        var results = JSON.parse(responseData);	

	        console.log('donnée recuperee');

	        var lists = results['hits'].hits;

	        var string = JSON.stringify(lists);

	        results = JSON.parse(string);	
	        
	        for(var i=0; i < results.length;i++)
	        {
	        	console.log('donnée parcours');
	        	var data = JSON.stringify(results[i]._source);
	        	var arr = JSON.parse(data);

	        	var infos = [];

				for(var x in arr){

					if(x == 'message' || x == 'source' || x == 'host' || x == 'name' || x == 'syslog_timestamp' || x == 'syslog_severity_code' || x == 'syslog_severity')
					{
						infos[x] = arr[x];
					}
				}

				toInsert.push(infos);
	        }

	        var source_path = '';

	        var source = '';
	        var type = '';


	        //"tentative d'authentification" : 1
	        //"tentative d'accès à la base de donnée" : 2
	        //"tentative d'accès via DNS" : 3
	        //"tentative d'accès au serveur FTP" : 4
	        //"tentative d'accès au serveur web" : 5
	        //"tentative d'accès au processus serveur" : 6
	        //"Détecteur d'intrusion" : 7
	        //"Tentative d'intrusion au serveur mail" : 8


	        //"Réseau informatique" :1
	        //"serveur de base de donnée" : 2
	        //"serveur de fichiers" : 3
	        //"serveur web" : 4
	        //"serveur mail" : 5

	        for( var j = 0; j < toInsert.length; j++)
	        {
	        	source_path = toInsert[j]['source'];
        		if(toInsert[j]['source'].includes('auth.log'))
        		{
        			source = 1;
        			type = 1;
        		}
        		else if(toInsert[j]['source'].includes('mysql.log') || toInsert[j]['source'].includes('postgresql.log') || toInsert[j]['source'].includes('oracle.log'))
        		{
        			source = 2;
        			type = 2;
        		}
        		else if(toInsert[j]['source'].includes('named.log'))
        		{
        			source = 3;
        			type = 1;
        		}
        		else if(toInsert[j]['source'].includes('vsftpd.log') || toInsert[j]['source'].includes('proftpd.log') )
        		{
        			source = 4;
        			type = 3;
        		}
        		else if(toInsert[j]['source'].includes('acces.log') || toInsert[j]['source'].includes('error.log') )
        		{
        			source = 5;
        			type = 4;
        		}
        		else if(toInsert[j]['source'].includes('daemon.log'))
        		{
        			source = 6;
        			type = 1;
        		}
        		else if(toInsert[j]['source'].includes('snort.log') || toInsert[j]['source'].includes('alert.log'))
        		{
        			source = 7;
        			type = 1;
        		}
        		else if(toInsert[j]['source'].includes('mail.log') || toInsert[j]['source'].includes('mail.er'))
        		{
        			source = 8;
        			type = 5;
        		}

        		var message = toInsert[j]['message'];
        		var host = toInsert[j]['host'];
        		var date = toInsert[j]['syslog_timestamp'];
        		var code = toInsert[j]['severity_code'];
        		var severity = toInsert[j]['severity_severity'];

        		/*var type_id = 0;

        		var intrusion = Type_intrusion.find({libelle:source}).exec(function (err, type_intrusion){
			        if (err) {
			            console.log(err);
			          }
			          else
			          {
			          	return type_intrusion;
			          }
			      });

		          if(typeof(intrusion) == 'undefined' || (typeof(intrusion) !== 'undefined' && type_intrusion.id_type_intrusion <= 0))
		          {
		          	console.log('insertion type intrusion');
		          	Type_intrusion.create(
	                    {
	                      libelle:source
	                    }).exec(function (err, finn){
	                      if (err) { 
	                        console.log(err);
	                      }

	                      type_id = finn.id_type_intrusion;
                	});
		          }
		          else
		          {
		          	console.log(type_intrusion);
		          }
	        		var categorie_id = 0;
	        		var categories = Categorie_intrusion.find({libelle:type}).exec(function (err, categorie){
				        if (err) {
				            console.log(err);
				        }
				        else
				        {
				        	return categorie;
				        }
				    });

	        		console.log(categories);


			        if(typeof(categories) !== 'undefined' && categories.id_categorie_intrusion > 0)
			        {
			          	categorie_id = categories.id_categorie_intrusion;
			        }

			        var liens = Lien_intrusion_categorie.find({id_intrusion:type_id,id_categorie:categorie_id}).exec(function (err, lien){
				        if (err) {
				            //return res.serverError(err);
				            console.log(err);
				        }
				        else
				        {
				        	return lien;
				        }
				        
			        });

			        if(typeof(liens) === 'undefined' || liens.id_lien_intrusion <= 0)
			        {
			        	console.log('insertion lien intrusion');
			          	Lien_intrusion_categorie.create(
		                    {
		                      id_intrusion:type_id,
		                      id_categorie:categorie_id
		                    }).exec(function (err, finn){
		                      if (err) { 
		                        console.log(err);
		                      }

		                      var lien_id = finn.id;
                    	});
			        }

			        /*** test si le IP n'est pas encore enregistré **/

			        
	        			Historique_intrusion.create({
				              id_type_intrusion:type,
				              id_categorie_intrusion:source,
				              ip:host,
				              source:source_path,
				              severity_code:code,
				              details:message,
				              date_intrusion:date
				            }).exec(function (err, finn){
				              if (err) { 
				                console.log(err);
				              }

				              var lien_id = finn.id;
				    	});
	        }

	      } catch (e) {
	        sails.log.warn('Could not parse response from options.hostname: ' + e);
	      }

	      console.log('fin');

	    });
	  }).end();	
	 } 
 }; 