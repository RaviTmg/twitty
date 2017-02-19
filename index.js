console.log("hello im index");

var Twit = require('twit');
var Config = require('./config');

var T = new Twit(Config);


var stream = T.stream('user');
stream.on('tweet', tweetEvent);
stream.on('follow', followed);
function followed(event){
	var name = event.source.name;
	var screenName = event.source.screen_name;
	tweetIt('@'+screenName+' thank you for following me');
}
function tweetEvent(eventMsg){
	//var fs = require('fs');
	//var json = JSON.stringify(eventMsg, null, 2);
	//fs.writeFile("tweet.json", json);
	var replyto = eventMsg.in_reply_to_screen_name;
	text = eventMsg.text;
	var from = eventMsg.user.screen_name;
	console.log(replyto + ' ' + from);
	if (replyto == 'tmgravi') {
		var newTweet = '@' + from +' thankyou for tweeting me';
		tweetIt(newTweet);
	}

}
function tweetIt(message){

	var tweet = { 
	status: message }

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if (err) {
			console.log("something went wrong");
		} else{
			console.log("worked");
		}
	}
}


