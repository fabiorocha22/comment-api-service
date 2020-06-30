"use strict";

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