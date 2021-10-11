var express = require('express');
const { render } = require('../app');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isAuth){
    res.render('home')
  }else{
    res.render('index', { title: 'Login', error:'' });
  }
  
});

router.post('/home',auth, function(req,res){
  console.log(req.body.username,"user")
  console.log(req.body.password,"pass")
  res.render('home')
})


function auth(req,res,next){
  const admin = {
    userid:"abin",
    pass:"12345678"
  }
  if(req.body.username==admin.userid && req.body.password==admin.pass ){
    req.session.isAuth = true
    console.log(req.session)
    next()
  }else{
    res.render('index', { title: 'Login', error:'incorrect username or password!' });
  }
  
}
router.get('/logout',function(req,res){
  req.session.isAuth=false

  // res.render('index', { title: 'Login', error:'' });
  res.clearCookie('myCookie');
  res.clearCookie('connect.sid');
  console.log("befor",req.session);
   req.session.destroy(function(err) {
    console.log("aftre",req.session);
    res.render('index', { title: 'Login', error:'' });
   })
  
})

module.exports = router;
