const pool = require('../db');

exports.getAllSalesPerCategory = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                pc.name AS category_name,
                SUM(oi.quantity) AS total_quantity,
                SUM(oi.price * oi.quantity) AS total_sales
            FROM 
                order_items oi
            JOIN 
                products p ON oi.product_id = p.id
            JOIN 
                product_categories pc ON p.product_category_id = pc.id
            GROUP BY 
                pc.name
            ORDER BY 
                total_sales DESC;
            `);
        //console.log(rows)
        res.json(rows);
    } catch (err) {
        console.error('Error fetching order_items:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
