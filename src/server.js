const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2');

// ✅ TEST DB CONNECTION
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL successfully.');
  }
});

const authRoutes = require('./routes/auth.routes');
const ordersRoutes = require('./routes/orders.routes');
const customersRoutes = require('./routes/customers.routes');
const categoriesRoutes = require('./routes/categories.routes');
const salesPerProduct = require('./routes/sales/sales_per_product.routes');
const salesPerCategory = require('./routes/sales/sales_per_category.routes');
const vat = require('./routes/vat/vat.routes');

const PORT = process.env.SERVER_PORT;

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api/auth', authRoutes);
app.use('/api', ordersRoutes);
app.use('/api', customersRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', salesPerProduct);
app.use('/api', salesPerCategory);
app.use('/api', vat);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
