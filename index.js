var havenondemand = require('havenondemand')
var apiKey = require("./secret").hpe
var client = new havenondemand.HODClient(apiKey, 'v1')

var data = {
	file: './videoLibrary/Sample.mp4',
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
// if (resp.body.status === 'finished') {
// 				var doc = resp.body.actions[0].result.document;
// 				console.log(doc);
// 			}
// 			else {
// 				return 
// 			}
function getJobStatus (jobID){
	return new Promise (function (res, rej){
		client.getJobStatus(jobID, function(err, resp, body) {
			if(err) {
		  		rej(err)
		  	}
		  	res(resp.body.status)
		});
}
// getJobId()
// .then(function(jobID){
	//'finished'
	getJobStatus("w-eu_c6f410f8-0b20-43e5-b26d-fa9607aacfda")
	// client.getJobResult(jobID, function(err, resp, body) {
 //  		console.log(resp.body.action)
	// });
// })
// .catch(function(err) {
// 	console.log(err)
// });
//curl -X POST --form "file=@SampleVideo.mp4" --form "apikey=bbc568f7-9c8a-4d26-a686-c8841ea52e48" https://api.havenondemand.com/1/api/async/recognizespeech/v1


// _______________________________________________

// var text = 'I love puppies'
// var data = {text: text}

// client.call('analyzesentiment', data, function(err, resp, body){
//    var sentiment = body.aggregate.sentiment
//    var score = body.aggregate.score
//    console.log(text + " | " + sentiment + " | " + score)
// });