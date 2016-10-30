module.exports = {

sendEmail: function() {

        var template = "email";

        var data = {
            recipientName: "Team",
            senderName: "News",
            senderEmail: "ntinamihari@gmail.com",
            message: "options.message",
            subject: "options.subject",
            fecha: "options.fecha"
        };

        var opts = {
                "subject": "options.subject",
                "from_email": "ntinamihari@gmail.com",
                "from_name": "Service",
                "to": "nourouh@gmail.com",
                "text": "contenu du mail"            
        };

        sails.hooks.email.send(template, data, opts, function(err) {
            if (err) {sails.log.debug(err); }
            else { sails.log.debug("Sent"); }            
        });
    }
};