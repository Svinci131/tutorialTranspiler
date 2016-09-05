var havenondemand = require('havenondemand')
var apiKey = require("./secret").hpe
var client = new havenondemand.HODClient(apiKey, 'v1')

var data = {
	file: './videoLibrary/SampleVideo.mp4',
	language: 'en-US'
}

function getJobId() {
	return new Promise (function (res, rej){
		client.call('recognizespeech', data, true, function(err, resp, body){
		  	if(err) {
		  		rej(err)
		  	}
		  	jobID = resp.body.jobID
		  	//console.log(jobID)
		  	res(jobID)
		});
	})
}
getJobId()
.then(function(jobID){
	console.log(jobID)
})
.catch(err)
//curl -X POST --form "file=@SampleVideo.mp4" --form "apikey=bbc568f7-9c8a-4d26-a686-c8841ea52e48" https://api.havenondemand.com/1/api/async/recognizespeech/v1


// _______________________________________________

// var text = 'I love puppies'
// var data = {text: text}

// client.call('analyzesentiment', data, function(err, resp, body){
//    var sentiment = body.aggregate.sentiment
//    var score = body.aggregate.score
//    console.log(text + " | " + sentiment + " | " + score)
// });