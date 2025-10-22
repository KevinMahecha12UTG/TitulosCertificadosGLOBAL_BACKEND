const { Router } = require("express");
const { addSignatory } = require("../../controllers/Signatures/addSignatory.controller");
const { updateSignatory } = require("../../controllers/Signatures/updateSignatory.controller");
const { verifySignatory } = require("../../controllers/Signatures/verifySignatory.controller");

const router = Router();

router.get("/verifySignatoryExistence/:email",verifySignatory)
router.post("/addSignatory", addSignatory);
router.patch("/updateSignatory/:email", updateSignatory)

module.exports = router;