const { addSignatoryService } = require("../../services/Signatures/addSignatory.service");

async function addSignatory(req, res) {
  try {
    console.log("Petición servicio registro firmante captada...")

    const {nombre,email,id_marca,archivo_certificado,archivo_key,contraseña_firma,estatus} = req.body;

    if (!nombre || !email || !archivo_certificado || !archivo_key || !contraseña_firma) {
      return res.status(400).json({
        error: true,
        message: "Required fields are missing for signatory registration"
      });
    }

    const signatoryData = await addSignatoryService({nombre,email,id_marca,archivo_certificado,archivo_key,contraseña_firma,estatus});

    res.json({
      error: false,
      data: signatoryData
    });

  } catch (err) {
    console.error("Error in addSignatoryService:", err.message);
     res.status(500).json({
      error: true,
      message: "Error adding signatory"
    });
  }
}

module.exports = { addSignatory };