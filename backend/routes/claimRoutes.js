const express = require("express");
const router = express.Router();
const {
  predictClaim,
  getClaims
} = require("../controllers/claimController");

router.post("/predict", predictClaim);
router.get("/claims", getClaims);

module.exports = router;

