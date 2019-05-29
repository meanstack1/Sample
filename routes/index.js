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
	var lnme=req.body.lastname;
	var uname= req.body.username;
	var roll= req.body.roll;
	var reg= req.body.register;
	var mail= req.body.mail;
	var date= req.body.date;
	var age= req.body.age;
	console.log("lastname:",lnme);
	console.log("firstname:",fname);
	console.log("username:",uname);
	console.log("rolno:",roll);
	console.log("registration no:",reg);
	console.log("Email:",mail);
	console.log("date of birth:",date);
	console.log("age:",age);
	res.redirect("/")
});

module.exports = router;