const { verifySignatoryService } = require("../../services/Signatures/verifySignatory.service");

async function verifySignatory(req, res) {
  try {
    console.log("Petición servicio verificación existencia firmante captada...");

    const {email} = req.params;

    if (!email || email.trim() === '') {
      return res.status(400).json({
        error: true,
        message: "El email es obligatorio para verificar la existencia del firmante"
      });
    }

    const updatedData = await verifySignatoryService(email);

    res.json({
      error: false,
      givenEmail: email,
      data: updatedData
    });

  } catch (err) {
    console.error("Error in verifySignatoryService:", err.message);
    res.status(500).json({
      error: true,
      message: "Error verificando el firmante"
    });
  }
}

module.exports = { verifySignatory };