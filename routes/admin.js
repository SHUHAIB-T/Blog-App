const express = require('express');
const router = express.Router();
const adminHelper = require('../helpers/adminHelper');
const userHelper = require('../helpers/userHelper')

const noCache = (req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
}

const verifyLogin=(req,res,next) => {
  if(req.session.admin?.logedIn){
    next();
  }
  else{
    res.redirect('admin/login')
  }
}

router.get('/',noCache,verifyLogin,(req,res) => {
  adminHelper.getAllusers().then((user) => {
    res.render('admin/home',{userData: user})
  })
})

router.get('/login',noCache,(req,res) => {
  res.render('admin/login',{err:req.session.err})
  delete req.session.err
})

router.post('/admin-login',noCache,(req, res) => {
  console.log(req.body)
  adminHelper.doLogin(req.body).then((user) => {
    req.session.admin ={
      user: user,
      logedIn:true
    }
    res.redirect('/admin')
  }).catch((err) => {
    req.session.err = {
      message: err
    }
    res.redirect('/admin/login')
  })
})
router.get("/logout", verifyLogin, (req, res) => {
  console.log("log out");
  req.session.destroy();
  res.redirect("/admin/login");
});

router.get('/deleteUser/:id',verifyLogin,(req,res)=>{
  adminHelper.deleteUser(req.params.id).then(()=>{
      res.redirect('/admin')
  })
})
router.get('/update-user/:id',verifyLogin,(req,res) => {
  adminHelper.getUser(req.params.id).then((userData) => {
    res.render('admin/update-user',{userData,err:req.session.err})
    delete req.session.err
  })
})
router.post('/update_user_data',verifyLogin,(req,res) => {
  let user_id = req.body._id
  adminHelper.updateUser(user_id,req.body).then(() => {
    res.redirect('/admin')
  }).catch((err) => {
    req.session.err = {
      message:err
    }
    let url = "/admin/update-user/"+user_id
    res.redirect(url)
  })
})
router.get('/new-user',(req,res) => {
  res.render('admin/add-user',{err:req.session.err})
  delete req.session.err
})
router.post('/new-user',(req,res) => {
  userHelper.createUser(req.body).then(() => {
    res.redirect('/admin')
  }).catch(() => {
    req.session.err = {
      message:"Email Allready used"
    }
    res.redirect('/admin/new-user')
  })
})
router.get('/search-user',(req,res) => {
  let userName = req.query.userName;
  adminHelper.searchUser(userName).then((user) => {
    res.render('admin/home',{userData: user})
  })
})
module.exports = router;
