require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT;
const sequelize = require('./db');

const todoRouter = require('./todo/todo.router');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/todo', todoRouter);

async function startServer(){
    try {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        app.listen(port, () => {
            console.log('Server started on port ' + port);
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    startServer: startServer
};


