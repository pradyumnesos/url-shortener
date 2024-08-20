require('dotenv').config();
const express = require('express');
const router = express.Router();
const URL = require('../models/url');
router.get('/',async(req,res)=>{
    const protocol = req.protocol;
    const host = req.hostname;
    const Url = req.originalUrl;
    const port = process.env.PORT
    const urls = await URL.find({});
     res.render('home',{
      urls,protocol,host,port
     })
})

module.exports = router;