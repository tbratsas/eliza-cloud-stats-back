const pool = require('../db');

exports.getTotalVat = async (req, res) => {
    try {
        // total vat per vat category
        const [rows1] = await pool.query(`
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
        //console.log(rows1)

        // total vat per product and vat category
        const [rows2] = await pool.query(`
           SELECT
                p.name AS product_name,
                p.vat,
                SUM(oi.price * CAST(oi.quantity AS UNSIGNED) *
                    CASE p.vat
                        WHEN 1 THEN 0.24
                        WHEN 2 THEN 0.13
                        ELSE 0
                    END
                ) AS total_vat_amount
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            GROUP BY p.id, p.name, p.vat
            ORDER BY p.vat, total_vat_amount DESC;
            `);
        //console.log(rows2)
        res.json({
            totalVat: rows1,
            totalVatPerRoduct: rows2
        });
    } catch (err) {
        console.error('Error fetching order_items:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
