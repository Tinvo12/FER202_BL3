const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 9999;

// ================= Middleware =================
// Middleware
app.use(cors());

// Tăng giới hạn payload để tránh lỗi 413
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.static('public'));


// ================= Đường dẫn dữ liệu =================
const DATA_DIR = path.join(__dirname, 'data');
const ACCOUNTS_FILE = path.join(DATA_DIR, 'accounts.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// ================= Helper function =================
async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return [];
    }
}

async function writeJsonFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        return false;
    }
}

// ================= Accounts APIs =================

// GET /accounts - Lấy tất cả accounts
app.get('/accounts', async (req, res) => {
    const accounts = await readJsonFile(ACCOUNTS_FILE);
    res.json(accounts);
});

// GET /accounts/:id - Lấy account theo ID
app.get('/accounts/:id', async (req, res) => {
    const accounts = await readJsonFile(ACCOUNTS_FILE);
    const account = accounts.find(a => a.id === parseInt(req.params.id));
    if (!account) {
        return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
});

// POST /accounts - Tạo account mới
app.post('/accounts', async (req, res) => {
    const accounts = await readJsonFile(ACCOUNTS_FILE);
    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;

    const newAccount = { id: newId, ...req.body };
    accounts.push(newAccount);

    const success = await writeJsonFile(ACCOUNTS_FILE, accounts);
    if (success) {
        res.status(201).json(newAccount);
    } else {
        res.status(500).json({ error: 'Failed to save account' });
    }
});

// PATCH /accounts/:id - Cập nhật account
app.patch('/accounts/:id', async (req, res) => {
    const accounts = await readJsonFile(ACCOUNTS_FILE);
    const index = accounts.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Account not found' });
    }

    accounts[index] = { ...accounts[index], ...req.body };

    const success = await writeJsonFile(ACCOUNTS_FILE, accounts);
    if (success) {
        res.json(accounts[index]);
    } else {
        res.status(500).json({ error: 'Failed to update account' });
    }
});

// DELETE /accounts/:id - Xóa account
app.delete('/accounts/:id', async (req, res) => {
    const accounts = await readJsonFile(ACCOUNTS_FILE);
    const filtered = accounts.filter(a => a.id !== parseInt(req.params.id));

    if (filtered.length === accounts.length) {
        return res.status(404).json({ error: 'Account not found' });
    }

    const success = await writeJsonFile(ACCOUNTS_FILE, filtered);
    if (success) {
        res.json({ message: 'Account deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete account' });
    }
});

// ================= Products APIs =================

// GET /products - Lấy tất cả products
app.get('/products', async (req, res) => {
    const products = await readJsonFile(PRODUCTS_FILE);
    res.json(products);
});

// GET /products/:id - Lấy product theo ID
app.get('/products/:id', async (req, res) => {
    const products = await readJsonFile(PRODUCTS_FILE);
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// ================= Orders APIs =================

// POST /orders - Tạo order mới
app.post('/orders', async (req, res) => {
    let orders = await readJsonFile(ORDERS_FILE);
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;

    const newOrder = { id: newId, ...req.body };
    orders.push(newOrder);

    const success = await writeJsonFile(ORDERS_FILE, orders);
    if (success) {
        res.status(201).json(newOrder);
    } else {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// GET /orders?userId=:userId - Lấy orders theo userId (nếu có)
app.get('/orders', async (req, res) => {
    const orders = await readJsonFile(ORDERS_FILE);
    const { userId } = req.query;

    if (userId) {
        return res.json(orders.filter(o => o.userId === parseInt(userId)));
    }
    res.json(orders);
});

// ================= Start Server =================
app.listen(PORT, () => {
    console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📂 Accounts lưu tại: ${ACCOUNTS_FILE}`);
});

module.exports = app;
