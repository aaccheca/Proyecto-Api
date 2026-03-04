// simple item model, not an ORM, just SQL helpers
const pool = require('../db');

const Item = {
  findAll: async () => {
    const res = await pool.query('SELECT * FROM items ORDER BY id');
    return res.rows;
  },
  findById: async (id) => {
    const res = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return res.rows[0];
  },
  create: async (data) => {
    const { name, description } = data;
    const res = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return res.rows[0];
  },
  update: async (id, data) => {
    const { name, description } = data;
    const res = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return res.rows[0];
  },
  delete: async (id) => {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
  },
};

module.exports = Item;