const express = require('express');
const {handleGenerateNewShortURL,handleGetAnalytics,handleRedirects} = require("../controller/url")
const router = express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleRedirects)
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;