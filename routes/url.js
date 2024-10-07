const express = require("express");
const {handleGenerateNewShortUrl, handleGetAnalytics, handleGetOriginalUrl} = require("../controllers/url");
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get("/analytics/:shortid", handleGetAnalytics);

router.get("/:shortid", handleGetOriginalUrl);
module.exports = router; 