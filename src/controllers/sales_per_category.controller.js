const pool = require('../db');

exports.getAllSalesPerCategory = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        //console.log(req.query)
        // Base query
        let query = `
            SELECT 
                pc.name AS category_name,
                pc.id AS category_id,
                SUM(oi.quantity) AS total_quantity,
                SUM(oi.price * oi.quantity) AS total_sales
            FROM 
                archived_order_items oi
            JOIN 
                products p ON oi.product_id = p.id
            JOIN 
                product_categories pc ON p.product_category_id = pc.id
        `

        // Conditions array
        const conditions = [];
        const params = [];

        if (startDate) {
            conditions.push('oi.created_at >= ?');
            params.push(new Date(startDate));
        }

        if (endDate) {
            conditions.push('oi.created_at <= ?');
            params.push(new Date(endDate));
        }

        // Add WHERE clause if needed
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // Final grouping and ordering
        query += `
            GROUP BY 
                pc.id, pc.name
            ORDER BY total_sales DESC;
        `;

        const [rows] = await pool.query(query, params);
        
        //console.log(rows)
        res.json(rows);
    } catch (err) {
        console.error('Error fetching order_items:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
