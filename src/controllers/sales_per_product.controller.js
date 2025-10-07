const pool = require('../db');

exports.getAllSalesPerProduct = async (req, res) => {
    try {
        const { start_date_gte, end_date_lte } = req.query;

        const conditions = [];
        const params = [];

        // Join archived_orders for filtering by created_at
        if (start_date_gte) {
            conditions.push('o.created_at >= ?');
            params.push(new Date(start_date_gte));
        }

        if (end_date_lte) {
            conditions.push('o.created_at <= ?');
            params.push(new Date(end_date_lte));
        }

        let query = `
                SELECT 
                    p.name AS product_name,
                    oi.product_id,
                    SUM(oi.quantity) AS total_quantity,
                    SUM(oi.price * oi.quantity) AS total_sales
                FROM 
                    archived_order_items oi
                JOIN 
                    products p ON oi.product_id = p.id
                JOIN
                    archived_orders o ON oi.archived_order_id = o.id
            `;

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')} `;
        }

        query += `
            GROUP BY oi.product_id, p.name
            ORDER BY total_sales DESC
            LIMIT 20;
        `;

        const [rows] = await pool.query(query, params);

        //console.log(rows)
        res.json(rows);
    } catch (err) {
        console.error('Error fetching order_items:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
