const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

