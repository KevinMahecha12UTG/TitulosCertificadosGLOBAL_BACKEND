const { checkEmailExists } = require('./utils/checkSignatoryEmailExists');
const { pool } = require('../../config/db');
async function verifySignatoryService(email) {
  try {
    const exists = await checkEmailExists(email, 'usuarios');

    if (!exists) {
      return { exists: false, userData: null };
    }

    // Traer los datos del usuario y del firmante
    const query = `
      SELECT 
        u.email,
        u.nombre,
        u.apellido_paterno,
        u.apellido_materno,
        f.contraseña_firma,
        f.archivo_certificado_name,
        f.archivo_key_name
      FROM usuarios u
      LEFT JOIN firmantes f ON u.id_usuario = f.id_usuario
      WHERE LOWER(u.email) = LOWER($1)
      LIMIT 1
    `;
    const result = await pool.query(query, [email]);

    const userData = result.rows[0] || null;

    return { exists: true, userData };
  } catch (err) {
    console.error("Error en verifySignatoryService:", err.message);
    throw new Error("Error verificando el firmante: " + err.message);
  }
}

module.exports = { verifySignatoryService };