var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/aditya');
console.log("connected");
var collection=db.get('signup');
var form=db.get('form');
var moment=require('moment');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/home', function(req, res)
 {
  res.render('index');
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
router.post('/form',function(req,res)
	{
		var data={
			username : req.body.username,
			mail : req.body.mail,
			password : req.body.password

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


module.exports = router;