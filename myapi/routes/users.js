var express = require('express');
var router = express.Router();

var userController = require('../controller/users');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  userController.login(req, res, next);
});


router.post('/register',function(req, res, next) {
  userController.register(req, res, next);
}); 

router.get('/emailverify',function(req, res, next) {
  userController.emailverify(req, res, next);
}); 

router.get('/logout',function(req, res, next) {
  userController.logout(req, res, next);
}); 


router.post('/findpass',function(req, res, next) {
  userController.findpass(req, res, next);
}); 


router.get('/verifyImg',function(req, res, next) {
  userController.verifyImg(req, res, next);
});


router.get('/getuser',function(req, res, next) {
  userController.getuser(req, res, next);
}); 

module.exports = router;
