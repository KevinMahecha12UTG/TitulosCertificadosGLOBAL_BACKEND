const { Router } = require("express");
const { addSignatory } = require("../../controllers/Signatures/addSignatory.controller");

const router = Router();

router.post("/addSignatory", addSignatory);

module.exports = router;