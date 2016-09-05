var havenondemand = require('havenondemand')
var apiKey = require("./secret").hpe
var client = new havenondemand.HODClient(apiKey, 'v1')
var utils = require("./utils")
var message = utils.messages
var data = {
	file: './videoLibrary/Sample1.mp4',
	language: 'en-US'
}

function getJobId() {
	return new Promise (function (res, rej){
		client.call('recognizespeech', data, true, function(err, resp, body){
		  	if(err) {
		  		rej(err)
		  	}
		  	jobID = resp.body.jobID
		  	res(jobID)
		});
	})
}
function getJobStatus (jobID, doc){
	return new Promise (function (res, rej){
		client.getJobStatus(jobID, function(err, resp, body) {
			if(err) rej(err)
			
			if (resp.body.status === 'finished') {
				var doc = resp.body.actions[0].result.document;
				message.green(doc)
				res(doc)
			}
			else {
				message.blue(jobID+": status:"+resp.body.status)
				res(getJobStatus(jobID))
			}
		});

	});
}
//"w-eu_c6f410f8-0b20-43e5-b26d-fa9607aacfda"
getJobId()
.then(function(jobID){
	message.green("Starting Job:"+ jobID)
	return getJobStatus(jobID)
})
.then(function(doc){
	console.log("HERE", doc)
	message.green(doc)
})
.catch(function(err) {
	console.log(err)
});