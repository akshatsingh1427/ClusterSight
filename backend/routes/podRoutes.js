const express = require("express");
const router = express.Router();

const {
  getPods,
  getPod,
  getLogs,
} = require("../controllers/podController");

router.get("/", getPods);
router.get("/:namespace/:name", getPod);
router.get("/:namespace/:name/logs", getLogs);

module.exports = router;