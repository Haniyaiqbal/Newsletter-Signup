const express = require('express');

const bodyParser = require('body-parser');

const request = require('request');

const https = require('https');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended:true}));


app.get("/", function(req, res) {
	
	res.sendFile(__dirname +"/signup.html")

})


app.post("/", function(req, res) {
	const firstname = req.body.fname;
	const lastname = req.body.lname;
	const email = req.body.email;

	const data = {

	members : [
	{
		email_address:email,
		status : "subscribed",
		merge_fields: {
			FNAME: firstname,
			LNAME: lastname
		}
	}
	]

	};

	const jsonData = JSON.stringify(data);

	const url = "https://us8.api.mailchimp.com/3.0/lists/5f61563610";

	const options = {
			method:"POST",
			auth : "honey:63deac39be88fd88a0820aaacd55edc5-us8"
		}


    const request = https.request(url, options, function(response) {

    	if (response.statusCode===200) {
    		res.sendFile(__dirname+ "/success.html");
    	}
    	else{
    		res.sendFile(__dirname+ "/failure.html");
    	}

    	response.on("data", function(data) {
    		console.log(JSON.parse(data));
    	})
	})

	request.write(jsonData);
	request.end();


});

app.post("/failure", function(req, res) {
	res.redirect("/");
})





app.listen(3000, function() {
	console.log("server is running at 3000.")
});




// 63deac39be88fd88a0820aaacd55edc5-us8

// audience id

// 5f61563610.