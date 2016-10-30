 module.exports.crontab = { 
  
 /* 
  
 * The asterisks in the key are equivalent to the 
  
 * schedule setting in crontab, i.e. 
  
 * minute hour day month day-of-week year 
  
 * so in the example below it will run every minute 
  
 */ 
  
  
 crons:function() 
 { 
	 var jsonArray = []; 
	 jsonArray.push({interval:'1 * * * * * ',method:'get_log'}); 
	  
	  
	 // add more cronjobs if you want like below 
	 // but dont forget to add a new method. 
	 //jsonArray.push({interval:'*/1 * * * * * ',method:'anothertest'}); 
	  
	 return jsonArray; 
	  
	 }, 
	  
	 // declare the method mytest 
	 // and add it in the crons function 
	 get_log: function(){ 
	 	require('../crontab/get_log.js').run(); 
	  
	 } 
 }; 