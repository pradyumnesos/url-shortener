require('dotenv').config();
const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const {handleGenerateNewShortURL,handleGetAnalytics,handleRedirects, handleStaticRoute} = require("../controller/url");
router.get('/',handleStaticRoute);
router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleRedirects);
router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;