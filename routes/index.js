var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res)
 {
  res.render('index');
});

router.post('/signup',function(req,res)
{
	var fname= req.body.firstname;
	console.log(fname);
	res.redirect("/")
});

module.exports = router;