var havenondemand = require('havenondemand')
var apiKey = require("./secret").hpe
var client = new havenondemand.HODClient(apiKey, 'v1')
var utils = require("./utils")
var message = utils.messages
//Sample1.mp4

//(str) => stringified jobid
function _startJob(videoFile) {
	var data = {
		file: './videoLibrary/'+videoFile,
		language: 'en-US'
	}
	return new Promise (function (res, rej){
		client.call('recognizespeech', data, true, function(err, resp, body){
		  	if(err) rej(err)
		  	jobID = resp.body.jobID
		  	res(jobID)
		});
	})
}
//recursively checksstatus until status = finished
//(str) => promise
function _getJobStatus (jobID){
	return new Promise (function (res, rej){
		client.getJobStatus(jobID, function(err, resp, body) {
			if(err) rej(err)
			
			if (resp.body.status === 'finished') {
				var doc = resp.body.actions[0].result.document;
				res(doc)
			}
			else {
				message.blue(jobID+": status:"+resp.body.status)
				res(_getJobStatus(jobID))
			}
		});

	});
}

//(str) => obj.content || err
module.exports = function getContent (videoFile) {
	return _startJob(videoFile)
			.then(function(jobID){
				message.green("Starting Job:"+ jobID)
				return _getJobStatus(jobID)
			})
			.then(function(doc){
				message.green(doc)
				return doc
			})
			.catch(function(err) {
				console.log(err)
			});
}

