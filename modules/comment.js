var mysql = require('mysql');
const config = require('../config/database.js');

exports.getAllComment = async (req, res) => {
    var connection = await mysql.createConnection(config);
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM comments ORDER BY createdAt DESC LIMIT 10', (err, res) => {
            connection.end();
            if(err) reject(err);
            res = res.map(v => Object.assign({}, v));
            resolve(res);
        })
    })
};

exports.appendComment = async (req, res) => {
    var connection = await mysql.createConnection(config);
    return new Promise((resolve, reject) => {
        try {
            data = JSON.parse(req.body)
        } catch {
            data = req.body
        }
        connection.query('INSERT INTO comments SET ?', data, (err, res) => {
            connection.end();
            if (err) reject(err);
            resolve({
                message: "Adicionado com sucesso!"
            })
        })
    })
}
