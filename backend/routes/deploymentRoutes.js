const express = require("express");

const router = express.Router();

const {
  getDeployments,
  getYaml,
  scale,
  restart,
} = require("../controllers/deploymentController");

router.get("/", getDeployments);

router.get(
  "/:namespace/:name/yaml",
  getYaml
);

router.put(
  "/:namespace/:name/scale",
  scale
);

router.put(
  "/:namespace/:name/restart",
  restart
);

module.exports = router;