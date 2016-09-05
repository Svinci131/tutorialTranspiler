var getTextObj = require("./getContent")

getTextObj("Sample1.mp4")
.then(function(cont){
	console.log("FINISHED:", cont);
})
.catch(function(err) {
	console.log(err)
});