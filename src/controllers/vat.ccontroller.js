const pool = require('../db');

exports.getTotalVat = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
            vat,
            SUM(price * quantity * 
            CASE vat
                WHEN 1 THEN 0.24
                WHEN 2 THEN 0.13
            ELSE 0
            END
            ) AS total_vat_amount
            FROM order_items
            GROUP BY vat
            ORDER BY total_vat_amount DESC;
            `);
        //console.log(rows)
        res.json(rows);
    } catch (err) {
        console.error('Error fetching order_items:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
