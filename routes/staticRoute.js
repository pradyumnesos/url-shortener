const express = require('express');
const router = express.Router();
const URL = require('../models/url');
router.get('/',async(req,res)=>{
    const urls = await URL.find({});
     res.render('home',{
      urls
     })
})

module.exports = router;