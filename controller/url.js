const shortid = require('shortid');
const URL = require('../models/url')
async function handleGenerateNewShortURL(req,res){
  const body = req.body;
  if(!body.url) return res.status(400).json({error: "url is required"})

  const shortID = shortid();
  
  const result = await URL.findOne({redirectURL:body.url});
  if(result) return res.status(400).json({error: "url is used"})
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory:[],
  });
  const urls = await URL.find({});
  const protocol = req.protocol;
  const host = req.hostname;
  const Url = req.originalUrl;
  const port = process.env.PORT
  return res.render("home",{id: shortID,urls,protocol,host,port});

}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  res.json({
    clicks: result.visitHistory.length,
    
    analytics:result.visitHistory}); 
}
async function handleRedirects(req,res){
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({shortId},{
      $push:{
          visitHistory:{
              timestamp:Date.now(),
          }
      }
  });
  res.redirect(entry.redirectURL);
}
async function handleStaticRoute(req,res){
  const protocol = req.protocol;
  const host = req.hostname;
  const Url = req.originalUrl;
  const port = process.env.PORT;
  const urls = await URL.find({});
  res.render('home',{
    urls,protocol,host,port
   })
}
module.exports = {handleGenerateNewShortURL,handleGetAnalytics,handleRedirects,handleStaticRoute}