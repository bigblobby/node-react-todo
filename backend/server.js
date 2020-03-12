require('dotenv').config();
const https = require('https');
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT;
const sequelize = require('./db');
const passport = require('passport');
const strategy = require('./helpers/user.helper').strategy;

// Apps/Routers
const todoRouter = require('./routers/todo.router');
const articleRouter = require('./routers/article.router');
const productRouter = require('./routers/product.router');
const userRouter = require('./routers/user.router');
const enquiryRouter = require('./routers/forms/enquiry.router');

app.disable('x-powered-by');
app.disable('X-Powered-By');

// Middleware
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(strategy);

// Routes
app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);
app.use('/api/article', articleRouter);
app.use('/api/product', productRouter);
app.use('/api/enquiry', enquiryRouter);

// Test authentication
app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json('Success! You can now see this without a token.');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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


