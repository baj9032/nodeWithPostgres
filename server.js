var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
var router = express.Router();
const dotenv = require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// all apis are define insite route for separation
app.use('/api', routes);

// return error when no one route match.
app.use((req, res) => {
    res.status(404).json({
        errors: {
            global:
                'Still working on it. Please try again later when we implement it'
        }
    });
});
var port = process.env.APPLICATION_PORT || 3000;
app.listen(port, () => console.log('Server is running on localhost:', port));

module.exports = app; // for testing
