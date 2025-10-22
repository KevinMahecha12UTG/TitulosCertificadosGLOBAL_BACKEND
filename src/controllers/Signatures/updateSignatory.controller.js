const { updateSignatoryService } = require("../../services/Signatures/updateSignatory.service");

async function updateSignatory(req, res) {
  try {
    console.log("Petición servicio actualización firmante captada...");

    const {email} = req.params;

    const {nombre,apellido_paterno,apellido_materno,archivo_certificado, archivo_key, contraseña_firma,
       id_marca, estatus,archivo_certificado_name,archivo_key_name } = req.body;

    // Validación: email siempre obligatorio
    if (!email || email.trim() === '') {
      return res.status(400).json({
        error: true,
        message: "El email es obligatorio para actualizar el firmante"
      });
    }

    // Validación: al menos un campo para actualizar
    if (!nombre && !apellido_paterno && !apellido_materno && !archivo_certificado && !archivo_key && !contraseña_firma && id_marca === undefined && estatus === undefined && !archivo_certificado_name && !archivo_key_name) {
      return res.status(400).json({
        error: true,
        message: "Debe especificar al menos un campo para actualizar: nombre, apellido_paterno, apellido_materno, archivo_certificado, archivo_key, contraseña_firma, id_marca o estatus"
      });
    }

    const updatedData = await updateSignatoryService({nombre,apellido_paterno,apellido_materno,email, archivo_certificado, archivo_key, contraseña_firma, 
      id_marca, estatus, archivo_certificado_name,archivo_key_name });

    res.json({
      error: false,
      data: updatedData
    });

  } catch (err) {
    console.error("Error in updateSignatoryService:", err.message);
    res.status(500).json({
      error: true,
      message: "Error actualizando el firmante"
    });
  }
}

module.exports = { updateSignatory };