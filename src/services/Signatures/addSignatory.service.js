require('dotenv').config();
const { pool } = require('../../config/db');
const { encrypt, decrypt } = require('./utils/addSignatory.service.utils'); 

async function addSignatoryService(data) {
  const {nombre,apellido_paterno,apellido_materno,email,id_marca = null,archivo_certificado,archivo_key,contraseña_firma,estatus = 1,archivo_certificado_name,archivo_key_name} = data;

  try {
    const certificadoBuffer = Buffer.isBuffer(archivo_certificado)
      ? archivo_certificado
      : Buffer.from(archivo_certificado, 'base64');

    const keyBuffer = Buffer.isBuffer(archivo_key)
      ? archivo_key
      : Buffer.from(archivo_key, 'base64');

    const contraseñaEncriptada = encrypt(contraseña_firma);

    const query = `
      SELECT * FROM public.fnc_registrar_firmante(
        $1::VARCHAR,
        $2::VARCHAR,
        $3::VARCHAR,
        $4::VARCHAR,
        $5::INT,
        $6::BYTEA,
        $7::BYTEA,
        $8::VARCHAR,
        $9::SMALLINT,
        $10::VARCHAR,
        $11::VARCHAR
      )
    `;

    const values = [
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      id_marca,
      certificadoBuffer,
      keyBuffer,
      contraseñaEncriptada,
      estatus,
      archivo_certificado_name,
      archivo_key_name
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

  } catch (err) {
    console.error("Error en addSignatoryService:", err.message);
    return { success: false, message: 'Error al registrar el firmante: ' + err.message };
  }
}

module.exports = { addSignatoryService, decrypt };