const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const ordersRoutes = require('./routes/orders.routes');
const customersRoutes = require('./routes/customers.routes');
const categoriesRoutes = require('./routes/categories.routes');

const PORT = process.env.SERVER_PORT
console.log(PORT)

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', ordersRoutes);
app.use('/api', customersRoutes);
app.use('/api', categoriesRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
