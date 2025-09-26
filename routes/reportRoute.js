const router = require("express").Router();
const { verifyToken } = require("../middlewares/tokenHandler");
const { reportDashboard, generatePdfFromSession } = require("../Controllers/reportController");

router.get('/generate-report',verifyToken,reportDashboard);
router.get('/generate-report/:id',verifyToken,generatePdfFromSession);
module.exports = router;