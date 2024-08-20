const shortid = require('shortid');
const Url = require('../models/url')
const {URL} = require('url');
function validateUrl(urlString) {
  try {
    new URL(urlString); 
    return true;
  } catch (err) {
    return false;
  }
}

async function handleGenerateNewShortURL(req,res){
  const body = req.body;
  try{
  if(!body.url) return res.status(400).json({error: "url is required"})
  if(!validateUrl(body.url)) return res.status(400).send({ error : "Invalid url" } )  
  const shortID = shortid();
  
  const result = await Url.findOne({redirectURL:body.url});
  if(result) return res.status(400).json({error: "url is used"})
  await Url.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory:[],
  });
  const urls = await Url.find({});
  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT
  return res.render("home",{id: shortID,urls,protocol,host,port});
  }catch(e){
  console.log(e)
  res.status(500).send({ error : "Internal Server Error" } )
  }
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  try{

  
  const result = await Url.findOne({shortId});
  res.json({
    clicks: result.visitHistory.length,
    
    analytics:result.visitHistory});
  }catch(e){
    console.log(e)
    res.status(500).send({ error : "Internal Server Error" } )
  }   
}
async function handleRedirects(req,res){
  const shortId = req.params.shortId;
  try{
  const entry = await Url.findOneAndUpdate({shortId},{
      $push:{
          visitHistory:{
              timestamp:Date.now(),
          }
      }
  });
  res.redirect(entry.redirectURL);
  }catch(e){
    console.log(e)
    res.status(500).send({ error : "Internal Server Error" } )
  }
}
async function handleStaticRoute(req,res){
  try{
  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT;
  const urls = await Url.find({});
  res.render('home',{
    urls,protocol,host,port
   })
  }catch(e){
    console.log(e)
    res.status(500).send({ error : "Internal Server Error" } )
  }
}
module.exports = {handleGenerateNewShortURL,handleGetAnalytics,handleRedirects,handleStaticRoute}