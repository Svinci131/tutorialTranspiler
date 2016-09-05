var havenondemand = require('havenondemand')
var apiKey = require("./secret").hpe
var client = new havenondemand.HODClient(apiKey, 'v1')
var chalk = require("chalk");
var blue = function (message) { console.log(chalk.blue(message))}
var green = function (message) { console.log(chalk.green(message))}
var red = function (message) { console.log(chalk.red(message))}
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
function getJobStatus (jobID){
	return new Promise (function (res, rej){
		client.getJobStatus(jobID, function(err, resp, body) {
			if(err) rej(err)
		 
			if (resp.body.status === 'finished') {
				var doc = resp.body.actions[0].result.document;
				console.log(doc);
				res(doc);
			}
			else {
				blue(jobID+": status:"+resp.body.status)
				return getJobStatus(jobID)
			}
		});
	});
}
//"w-eu_c6f410f8-0b20-43e5-b26d-fa9607aacfda"
getJobId()
.then(function(jobID){
	green("Starting Job:"+ jobID)
	getJobStatus(jobID)
})
.then(function(doc){
	green(doc)
})
.catch(function(err) {
	console.log(err)
});
//curl -X POST --form "file=@SampleVideo.mp4" --form "apikey=bbc568f7-9c8a-4d26-a686-c8841ea52e48" https://api.havenondemand.com/1/api/async/recognizespeech/v1


// _______________________________________________

// var text = 'I love puppies'
// var data = {text: text}

// client.call('analyzesentiment', data, function(err, resp, body){
//    var sentiment = body.aggregate.sentiment
//    var score = body.aggregate.score
//    console.log(text + " | " + sentiment + " | " + score)
// });