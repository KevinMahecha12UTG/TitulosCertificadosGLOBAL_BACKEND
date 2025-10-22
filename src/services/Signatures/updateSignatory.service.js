require('dotenv').config();
const { pool } = require('../../config/db');
const { encrypt } = require('./utils/addSignatory.service.utils');

async function updateSignatoryService(data) {
  const {nombre,apellido_paterno,apellido_materno,email, archivo_certificado, archivo_key, contraseña_firma, id_marca, estatus,archivo_certificado_name,archivo_key_name } = data;

  try {
    // Encriptar contraseña si viene
    const contraseñaEncriptada = contraseña_firma ? encrypt(contraseña_firma) : null;

    const certificadoBuffer = archivo_certificado
      ? (Buffer.isBuffer(archivo_certificado) ? archivo_certificado : Buffer.from(archivo_certificado, 'base64'))
      : null;

    const keyBuffer = archivo_key
      ? (Buffer.isBuffer(archivo_key) ? archivo_key : Buffer.from(archivo_key, 'base64'))
      : null;

    const query = `
      SELECT * FROM public.fnc_update_firmante(
        $1::VARCHAR,
        $2::VARCHAR,
        $3::VARCHAR,
        $4::VARCHAR,
        $5::BYTEA,
        $6::BYTEA,
        $7::VARCHAR,
        $8::INT,
        $9::SMALLINT,
        $10::VARCHAR,
        $11::VARCHAR
      )
    `;

    const values = [
      email.trim(),
      nombre,
      apellido_paterno,
      apellido_materno,
      certificadoBuffer,
      keyBuffer,
      contraseñaEncriptada,
      id_marca,
      estatus,
      archivo_certificado_name,
      archivo_key_name
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

  } catch (err) {
    console.error("Error en updateSignatoryService:", err.message);
    return { success: false, message: "Error actualizando el firmante: " + err.message };
  }
}

module.exports = { updateSignatoryService };