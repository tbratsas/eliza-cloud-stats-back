const pool = require('../db');

exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product_categories');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
