const express = require('express');
const app = express();

require('./startup/server')(app);

require('./startup/db')();

require('./startup/cors')(app);

require('./startup/route')(app,express)