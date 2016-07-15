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
			let string = text.toLowerCase();
			let str = delToken(string);
			let str0 = str.indexOf('hi');
			let str1 = str.indexOf('hello');
			let str2 = str.indexOf('xin chao');
			let str3 = str.indexOf('chao');
			let str4 = str.indexOf('alo');
			let str5 = str.indexOf('may la');
			let str6 = str.indexOf('mi la');
			let str7 = str.indexOf('bot la');
			let str8 = str.indexOf('ad la');
			let str9 = str.indexOf('bot ten');
			let str10 = str.indexOf('fuck');
			let str11 = str.indexOf('dm');
			let str12 =	string.indexOf('ngu');
			let str13 = string.indexOf('dốt');
			let str14 = str.indexOf('vl');
			let str15 = str.indexOf('thoi tiet');
			let str16 = str.indexOf('nhiet do');
			let str17 = str.indexOf('nang nong');
			let str18 = string.indexOf('mưa');
			let str19 = string.indexOf('trời');
			let str20 =	str.indexOf('an gi');
			let str21 = str.indexOf('mon gi');
			let str22 = str.indexOf('mon chi');
			let str23 = str.indexOf('an chi');
			let str24 = str.indexOf('quan nao');
			let str25 = str.indexOf('quan mo');
			if (str0 != -1 || str1 != -1 || str2 != -1 || str3 != -1 || str4 != -1){
				sendSayHelloMessage(sender, txt);
				continue;
			}
			else if (str5 != -1 || str6 != -1 || str7 != -1 || str8 != -1 || str9 != -1 ) {
				sendAdMessage(sender,txt);
				continue;
			}
			else if (str10 != -1 || str11 != -1 || str12 != -1 || str13 != -1 || str14 != -1){
				sendFuckMessage(sender, txt);
				continue;
			}
			else if (str15 != -1 || str16 != -1 || str17 != -1 || str18 != -1 || str19 != -1 || str === 'weather'){
				sendWeatherMessage(sender);
				continue;
			}
			else if (str20 != -1 ||str21 != -1 || str22 != -1 || str23 != -1 || str24 != -1 || str25 != -1 || str === 'foody'){
				sendFoodMessage(sender);	
				continue;
			}
			else if (text === 'headphone') {
				sendGenericMessage(sender);
				continue;
			}
				sendTextMessage(sender, "BotKid: Mình mới được sinh ra, còn ngây thơ :D. Chỉ có vài chức năng cơ bản, bạn thông cảm và có thể xem hướng dẫn ở bên dưới");
				sendSupportMessage(sender, text);
				//sendGuideMessage(sender, text);	
				continue;
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback);
			let str = text.length; 
			let textsup = "Rất vui được chào đón bạn đến với Bot cu teo ^^! Mời bạn xem hướng dẫn phía trên!";
			let sup =text.substr(12,88);
			console.log('day la gi the : ' +sup);
			sendTextMessage(sender, "Mô tả chi tiết: "+text.substring(11,str-1), token);
			if(sup === textsup){
				sendGuideMessage(sender, text);
			}
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
						"url": "https://www.messenger.com/",
						"title": "Link here"
					}, {
						"type": "postback",
						"title": "Detail Headphone",
						"payload": "no name vì chưa bik ghi gì.hà hà",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Descriptione 2",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Detail Headphone",
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
//send message xin chao
function sendSayHelloMessage (sender, text){
		let messageData = {text :"Chào bạn :)"};
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
//weather
function sendWeatherMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Weather for you",
					"subtitle": "Thời tiết tốt",
					"image_url": "http://www.biendao24h.vn/product_images/i/114/du-bao-thoi-tiet-hom-nay__09130_zoom.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://www.nchmf.gov.vn/web/vi-VN/62/21/92/map/Default.aspx",
						"title": "Link here"
					},{
						"type": "postback",
						"title": "Detail Weather",
						"payload": "ko thấy link phía trên hà"
					}]
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

//search food
function sendFoodMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Món ăn ngon cho bạn",
					"subtitle": "Các quán ăn ngon Đà thành",
					"image_url": "http://www.baodanang.vn/dataimages/201408/original/images1055070_banh_trang_cuon_thit_heo.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://www.foody.vn/da-nang/quan-an",
						"title": "Link here"
					},{
						"type": "postback",
						"title": "Detail Food",
						"payload": "Chi tiết ở link trên",
					}]
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

// support message
function sendSupportMessage(sender, text) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Support for you",
					"subtitle": "Khen ai hiếp zu, ế nhầm...Can i help you? ^^",
					"image_url": "http://usaremote.com/wp/wp-content/uploads/2015/06/Technical-support-scams.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.facebook.com/SudoKid",
						"title": "Link fb của chủ BotKid đập chai. keke"
					},{
						"type": "postback",
						"title": "Detail Support",
						"payload":"Rất vui được chào đón bạn đến với Bot cu teo ^^! Mời bạn xem hướng dẫn phía trên!",
					}]
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
//Guide message
function sendGuideMessage (sender, text){
		let messageData = {text :"Hướng dẫn dùng BotKid:" +"\n" +"1. Để xem các loại tai nghe, xin gõ: 'headphone'"+ "\n"+  "2. Để xem các quán ăn ngon, xin gõ: 'foody'"+ "\n"+ "3. Để xem thông tin thời tiết, xin gõ: 'weather'"
								+ "\n" + "4. Để xem thông tin của AD đập chai, vui lòng click link bên dươi. keke"};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	});
}
// declare funtion del mark
 function delToken(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
}
// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});
