var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({
    code: req.query.code,
    scope: req.query.scope
  });
});

router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;
