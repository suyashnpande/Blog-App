const express = require('express');
const router = express.Router();

router.get('/demo',(req, res)=>{
    res.send(" it is demo route");
})

module.exports = router;