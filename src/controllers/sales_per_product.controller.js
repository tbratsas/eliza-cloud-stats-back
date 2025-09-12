const pool = require('../db');

exports.getAllSalesPerProduct = async (req, res) => {
    try {
        const [rows] = await pool.query(`
                SELECT 
                p.name AS product_name,
                oi.product_id,
                SUM(oi.quantity) AS total_quantity,
                SUM(oi.price * oi.quantity) AS total_price
                FROM 
                order_items oi
                JOIN 
                products p ON oi.product_id = p.id
                GROUP BY 
                oi.product_id, p.name
                ORDER BY total_price DESC;
            `);
        //console.log(rows)
        res.json(rows);
    } catch (err) {
        console.error('Error fetching order_items:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
