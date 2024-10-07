const shortid = require("shortid");
const URL = require("../models/url.js");
async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({err : "url is required"});
    const shortId = shortid();
    await URL.create({
        shortID : shortId,
        redirectUrl : body.url,
        visitHistory : [],
        createdBy : req.user._id 
    })
    return res.render("home", {
        id : shortId
    })
    // return res.json({id : shortId}); 
}

async function handleGetOriginalUrl(req, res){   
        const shortid = req.params.shortid; 
        const entry = await URL.findOneAndUpdate(
            {shortID : shortid},
            {$push : {visitHistory : {
            timestamp : Date.now() }
                }
            }
        );
        return res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req,res){
    const shortid = req.params.shortid;
    const result = await URL.findOne({shortID : shortid});
    return res.json({totalClicks : result.visitHistory.length, analytics : result.visitHistory});
}
module.exports = {handleGenerateNewShortUrl, handleGetAnalytics, handleGetOriginalUrl};