const express = require("express");
const {handleUserSignUp, handleUserLoign} = require("../controllers/user")
 const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLoign);


 module.exports = router;
