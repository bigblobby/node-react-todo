require('dotenv').config();
const express = require('express');
var https = require('https');
var http = require('http');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT;
const sequelize = require('./db');

const { createReadStream } = require('fs');

const todoRouter = require('./routers/todo.router');
const articleRouter = require('./routers/article.router');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/todo', todoRouter);
app.use('/api/article', articleRouter);

async function startServer() {
    try {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        http.createServer(app).listen(port, () => {
            console.log('Server started on port ' + port);
        });
        https.createServer({}, app).listen(443);
        // app.listen(port, () == => {
        //     console.log('Server started on port ' + port);
        // });
    } catch(e) {
        console.error(e);
    }
}

module.exports = {
    startServer: startServer
};


