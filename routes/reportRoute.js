const router = require("express").Router();
const { verifyToken } = require("../middlewares/tokenHandler");
const { reportDashboard } = require("../Controllers/reportController");

router.get('/generate-report',verifyToken,reportDashboard);

module.exports = router;