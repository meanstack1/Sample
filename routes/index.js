var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/aditya');
console.log("connected");
var collection=db.get('signup');
var form=db.get('form');
var moment=require('moment');
var nodemailer = require('nodemailer');
var randomstring=require('randomstring');
var multer=require('multer');
var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })
// var session=require('client-session')

/* GET home page. */
router.get('/login',function(req,res){
	if(req.session&&req.session.user)
	{
		res.locals.user=req.session.user
		res.redirect('/home')
	}
	else{
		req.session.reset();
		res.render('index')
	}
});
router.get('/home', function(req, res)
 {
 	if(req.session&&req.session.user)
	{
     res.locals.user=req.session.user
     res.render('index');
}
});
router.get('/form',function(req,res)
{
	form.find({},function(err,docs)
	{
		console.log(docs);
		res.locals.data=docs;
		res.render('form');
	});
});
router.get('/forgot', function(req, res)
 {
  res.render('forgotpassword');
}); 
//logout
router.get('/logout', function(req, res)
 {
  res.render('/logout');
}); 
router.post('/forgotpassword', function(req, res)
 {
 	var email=req.body.name;
 	console.log(email);
 	var otp=randomstring.generate(5);
 	var msg="<html><head></head><body><b>"+otp+"</b></body></html>"
collection.update({"email":email},{$set:{"password":otp}})
var transporter = nodemailer.createTransport(
		 {
		  service: 'gmail.com',
		  auth: {
		    user: 'prasadnaidu977@gmail.com',
		    pass: 'prasad@3333'
		  }
		});

		var mailOptions = {
		  from: 'prasadnaidu977@gmail.com',
		  to: req.body.name,
		  subject: 'thanks for registration',
		  html:msg
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log("mail not sent");
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});
		res.redirect('/home');
	});

router.post('/form', upload.single('image'),function(req,res)
	{
		console.log(req.file.originalname);
		var data={
			username : req.body.username,
			mail : req.body.mail,
			password : req.body.password,
			rollno:req.body.Rollno,
			img:req.file.originalname
		}
		form.insert(data, function(err,docs){
           res.redirect('/form');
		});
	});
router.post('/edit',function(req,res)
{
	var id=req.body.no;
	collection.find({"rollno":id},function(err,docs)
	{
		res.send(docs);
	});
});
router.post('/remove',function(req,res)
{
	var id=req.body.no;
	console.log(id);
	form.remove({"rollno":id},function(err,docs)
	{
		res.send(docs);
	});
});
router.post('/update',function(req,res){
	var data={
		username : req.body.username,
			mail : req.body.mail,
			rollno:req.body.Rollno,
			password : req.body.password
		}
	collection1.update({"_id":req.body.id},{$set:data},function(err,docs){
		res.redirect('/form');

	});
});


router.post('/signup',function(req,res){
        //Email
		var transporter = nodemailer.createTransport(
		 {
		  service: 'gmail.com',
		  auth: {
		    user: 'prasadnaidu977@gmail.com',
		    pass: 'prasad@3333'
		  }
		});

		var mailOptions = {
		  from: 'prasadnaidu977@gmail.com',
		  to: req.body.mail,
		  subject: 'thanks for registration',
		  text: 'your account is successfully  created'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log("mail not sent");
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});


		var data={
		fname:req.body.firstname,
		lname:req.body.lastname,
		uname:req.body.username,
		rollno:req.body.roll,
		rgno:req.body.register,
		mail:req.body.mail,
		bday:req.body.date,
		age:req.body.age,
		gender:req.body.gender,
		phone:req.body.number,
		password:req.body.password,
		Cpassword:req.body.confirmpassword,
		};
		// console.log("firstname:",req.body.firstname);
		// console.log("Lastname:",lname);
		// console.log("username:",uname);
		// console.log("roll:",rollno);
		// console.log("registerno:",rgno);
		// console.log("email:",mail);
		// console.log("date of birth:",bday);
		// console.log("age:",age);
  //       console.log("Gender:",gender);
  //       console.log("Phone:",phone);
  //       console.log("password:",password);
  //       console.log("confirm password:",Cpassword);
        //console.log(req,body);
        console.log(req.body);


        // collection.insert({"firstname":fname,"lastname":lname,"username":uname,"roll":rollno,"register":rgno,"mail":mail,"date":bday,"gender":gender,"number":phone,"password":password,"confirmpassword":Cpassword});
			collection.insert(data,function(err,data)
			{
				if(err){
					console.log("error");
				}
			})
			collection.insert(data,function(err,data)
			{
				if(err){
					console.log("error");
				}
				else{
					console.log(data);       

				}
				
			res.redirect("/home");
});
});
router.post("/login",function(req,res)
{
	 var uname =req.body.username;
	  var password=req.body.password;
	  var logintime=moment().format("hh:mm:ss a");
	  console.log(logintime);
	  collection.update({"name":uname},{$set:{"logintime":logintime}})
	collection.findOne({"uname":req.body.username,"mail":req.body.mail,"password":req.body.password},function(err,docs)
		{
			if(!docs)
			{
				console.log("mismatch");
				res.render('index',{err:"invalid username or password"});
			}
			else if(docs){
				console.log("success");
				res.render('home');
			}
			else{
				console.log(err);
			}
			
			
		});
});
router.post("/login",function(req,res)
{
	 var uname =req.body.username;
	  var password=req.body.password;
	  var logintime=moment().format("hh:mm:ss a");
	  console.log(logintime);
	  collection.update({"name":uname},{$set:{"logintime":logintime}})
	collection.findOne({"uname":req.body.username,"mail":req.body.mail,"password":req.body.password},function(err,docs)
		{
			if(!docs)
			{
				res.render('index')
			}
			else{
				delete docs.password
				req.session.user=docs;
			}
			});
});
module.exports = router;