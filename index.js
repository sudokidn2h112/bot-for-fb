'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('port', (process.env.PORT || 6969));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot');
});

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_encode_verify') {
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong token');
});

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging;
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i];
		let sender = event.sender.id;
		if (event.message && event.message.text) {
			let text = event.message.text;
			let txt = text.substr(0,200);
			let str = txt.toLowerCase();
			let str1 = str.indexOf('ad la');
			let str2 = str.indexOf('bot la');
			let str3 = str.indexOf('m la');
			let str4 = str.indexOf('mi la');
			let str5 = str.indexOf('mày là');
			let str6 = str.indexOf('hi');
			let str7 = str.indexOf('chào');
			let str8 = str.indexOf('ngu');
			let str9 = str.indexOf('dm');
			let str10 = str.indexOf('dmm');
			let str11 = str.indexOf('fuck');
			let str12 = str.indexOf('vl');
			if (text === 'hoang') {
				sendGenericMessage(sender);
				continue;
			}
			else if (str1 != -1 || str2 != -1 || str3 != -1 || str4 != -1 || str5 != -1 || str6 != -1 || str7 != -1 ) {
				sendAdMessage(sender,txt);
				continue;
			}
			else if (str8 != -1 || str9 != -1 || str10 != -1 || str11 != -1 || str12 != -1){
				sendFuckMessage(sender, txt);
				continue;
			}
				sendTextMessage(sender, "BotKid: what's "  +txt+  " mean?");
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback);
			sendTextMessage(sender,"Thông tin chi tiết" +text.substring(0, 200), token);
			continue;
		}
	}
	res.sendStatus(200);
});


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAADypJni9YMBANDguikZChw572tZCLrmTwB0CRcZCPjBE89Vt62WPmZBJRanIbLKx6PRSlb4EzvT0X8dG9Hpx3HrOwgmmPp0gMHDoWnmqUv6kyUZAl9vLZBNl6tM0sojy3QHDdiX2ZCY0nknFej9CumZB5iAT7PGqaifb9CxfZBsGFwZDZD";
// send message 
function sendTextMessage(sender, text) {
	let messageData = { text:text };
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		console.log("loi error nek: "+ response.body.entry);
		if (error) {
			console.log('Error sending messages: ', error);
		} else if (response.body.error) {
			console.log('Error : ', response.body.error);
		}
	});
}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Descriptione 1",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.facebook.com/SudoKid",
						"title": "Link here"
					}, {
						"type": "postback",
						"title": "Detail",
						"payload": "no name vì chưa bik ghi gì.hà hà",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Descriptione 2",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Detail",
						"payload": "chỉ để test chưa ghi",
					}],
				}]
			}
		}
	};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}
// send message hi
function sendAdMessage (sender, text){
		let messageData = {text :"Hi bạn, mình là BotKid của Ad HoangNguyen đập chai, mình có thể giúp gì cho bạn?"};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}
//send tn chui tuc. hehe
function sendFuckMessage (sender, text){
		let messageData = {text :"BotKid hiền lành, thân thiện, éo chửi tục. Cút ngay ko bố tát xéo háng nghen con ^^"};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});
