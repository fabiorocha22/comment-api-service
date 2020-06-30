"use strict";

const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

var comment = require('./modules/comment');

module.exports.getAllComment = (event, context, callback) => {
	comment.getAllComment()
		.then((res) => {
			console.log(res)
			callback(null, {
				'statusCode': 200,
				'headers': {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin' : '*',
                    "Access-Control-Allow-Credentials" : true 
				},
				'isBase64Encoded': false,
				'body': JSON.stringify(res)
			})
		})
		.catch((err) => {
			callback(null, {
				'statusCode': 500,
				'headers': {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin' : '*',
                    "Access-Control-Allow-Credentials" : true 
				},
				'isBase64Encoded': false,
				'body': 'Error ::: ' + err
			})
		})
}

module.exports.appendComment = (event, context, callback) => {
	comment.appendComment(event)
	.then((res) => {
		callback(null, {
			'statusCode': 200,
			'headers': {
				'Content-Type': 'application/json; charset=utf-8',
				'Access-Control-Allow-Origin' : '*',
				"Access-Control-Allow-Credentials" : true 
			},
			'isBase64Encoded': false,
			'body': JSON.stringify(res)
		})
	})
	.catch((err) => {
		callback(null, {
			'statusCode': 500,
			'headers': {
				'Content-Type': 'application/json; charset=utf-8',
				'Access-Control-Allow-Origin' : '*',
				"Access-Control-Allow-Credentials" : true 
			},
			'isBase64Encoded': false,
			'body': 'Error ::: ' + err
		})
	})
}

module.exports.speech = (event, context, callback) => {
	const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
            apikey: 'UsGrpg8NMoX_cO-eMbiLZKHprzYDCrfJ8YVT_CORlqsx',
        }),
        url: 'https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/732e0ad0-28c1-422c-9543-ddbeea786730',
    });
	
	var value = {}
	try {
		value = JSON.parse(event.body).value;
	}
	catch {
		value = event.body.value
	}
	console.log(event.body)
    const synthesizeParams = {
        text: value,
        accept: 'audio/wav',
        voice: 'en-US_AllisonV3Voice',
    };

    textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            // only necessary for wav formats,
            // otherwise `response.result` can be directly piped to a file
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
			var fileName = 'text.wav'
			buffer.toString('base64')
			callback(null, {
				'statusCode': 200,
				'headers': {
					'Content-Type': 'audio/wav',
					'Access-Control-Allow-Origin' : '*',
					"Access-Control-Allow-Credentials" : true 
				},
				'isBase64Encoded': false,
				'body': JSON.stringify({
					data: buffer.toString('base64')
				})
			})
        })
        .catch(err => {
			callback(null, {
				'statusCode': 500,
				'headers': {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin' : '*',
					"Access-Control-Allow-Credentials" : true 
				},
				'isBase64Encoded': false,
				'body': 'Error ::: ' + err
			})
        });
}