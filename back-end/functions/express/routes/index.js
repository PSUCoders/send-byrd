const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send({
    code: req.query.code,
    scope: req.query.scope
  });
});

router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;
