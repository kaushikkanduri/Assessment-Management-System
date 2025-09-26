const router = require("express").Router();
const {userLogin, userRegister, serveLogin, serveRegister} = require("../Controllers/userController");

router.get('/login',serveLogin);
router.post('/login',userLogin);

router.get('/register',serveRegister);
router.post('/register',userRegister);

module.exports = router