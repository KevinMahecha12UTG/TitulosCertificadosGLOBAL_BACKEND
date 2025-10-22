require('dotenv').config();
const { pool } = require('../../../config/db');

async function checkEmailExists(email, table = 'usuarios') {
  try {
    const query = `
      SELECT COUNT(*) AS total
      FROM ${table}
      WHERE email = $1
    `;
    const result = await pool.query(query, [email]);
    return parseInt(result.rows[0].total, 10) > 0;
  } catch (err) {
    console.error(`Error verificando email en ${table}:`, err.message);
    throw new Error('Error checking email existence: ' + err.message);
  }
}

module.exports = { checkEmailExists };