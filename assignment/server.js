const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 9999;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Đường dẫn đến file accounts.json
const ACCOUNTS_FILE = path.join(__dirname, 'data', 'accounts.json');

// Helper function để đọc file accounts.json
async function readAccountsFile() {
    try {
        const data = await fs.readFile(ACCOUNTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading accounts file:', error);
        return [];
    }
}

// Helper function để ghi file accounts.json
async function writeAccountsFile(accounts) {
    try {
        await fs.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing accounts file:', error);
        return false;
    }
}

// GET /accounts - Lấy danh sách tất cả accounts
app.get('/accounts', async (req, res) => {
    try {
        const accounts = await readAccountsFile();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read accounts' });
    }
});

// GET /accounts/:id - Lấy account theo ID
app.get('/accounts/:id', async (req, res) => {
    try {
        const accounts = await readAccountsFile();
        const account = accounts.find(a => a.id === parseInt(req.params.id));
        
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read account' });
    }
});

// POST /accounts - Tạo account mới
app.post('/accounts', async (req, res) => {
    try {
        const accounts = await readAccountsFile();
        
        // Tự động tăng ID
        const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
        
        const newAccount = {
            id: newId,
            ...req.body
        };
        
        accounts.push(newAccount);
        
        // Ghi vào file accounts.json
        const success = await writeAccountsFile(accounts);
        
        if (success) {
            res.status(201).json(newAccount);
        } else {
            res.status(500).json({ error: 'Failed to write to accounts file' });
        }
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
});

// PATCH /accounts/:id - Cập nhật account
app.patch('/accounts/:id', async (req, res) => {
    try {
        const accounts = await readAccountsFile();
        const accountIndex = accounts.findIndex(a => a.id === parseInt(req.params.id));
        
        if (accountIndex === -1) {
            return res.status(404).json({ error: 'Account not found' });
        }
        
        // Cập nhật account
        accounts[accountIndex] = { ...accounts[accountIndex], ...req.body };
        
        // Ghi vào file accounts.json
        const success = await writeAccountsFile(accounts);
        
        if (success) {
            res.json(accounts[accountIndex]);
        } else {
            res.status(500).json({ error: 'Failed to write to accounts file' });
        }
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Failed to update account' });
    }
});

// DELETE /accounts/:id - Xóa account
app.delete('/accounts/:id', async (req, res) => {
    try {
        const accounts = await readAccountsFile();
        const filteredAccounts = accounts.filter(a => a.id !== parseInt(req.params.id));
        
        if (filteredAccounts.length === accounts.length) {
            return res.status(404).json({ error: 'Account not found' });
        }
        
        // Ghi vào file accounts.json
        const success = await writeAccountsFile(filteredAccounts);
        
        if (success) {
            res.json({ message: 'Account deleted successfully' });
        } else {
            res.status(500).json({ error: 'Failed to write to accounts file' });
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});

// GET /products - Lấy danh sách products
app.get('/products', async (req, res) => {
    try {
        const productsPath = path.join(__dirname, 'data', 'products.json');
        const data = await fs.readFile(productsPath, 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read products' });
    }
});

// GET /products/:id - Lấy product theo ID
app.get('/products/:id', async (req, res) => {
    try {
        const productsPath = path.join(__dirname, 'data', 'products.json');
        const data = await fs.readFile(productsPath, 'utf8');
        const products = JSON.parse(data);
        const product = products.find(p => p.id === parseInt(req.params.id));
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read product' });
    }
});

// POST /orders - Tạo order mới
app.post('/orders', async (req, res) => {
    try {
        const ordersPath = path.join(__dirname, 'data', 'orders.json');
        let orders = [];
        
        try {
            const data = await fs.readFile(ordersPath, 'utf8');
            orders = JSON.parse(data);
        } catch (error) {
            // File không tồn tại, tạo mới
        }
        
        const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
        const newOrder = {
            id: newId,
            ...req.body
        };
        
        orders.push(newOrder);
        
        await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), 'utf8');
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// GET /orders?userId=:userId - Lấy orders theo userId
app.get('/orders', async (req, res) => {
    try {
        const { userId } = req.query;
        const ordersPath = path.join(__dirname, 'data', 'orders.json');
        
        try {
            const data = await fs.readFile(ordersPath, 'utf8');
            const orders = JSON.parse(data);
            
            if (userId) {
                const filteredOrders = orders.filter(o => o.userId === parseInt(userId));
                res.json(filteredOrders);
            } else {
                res.json(orders);
            }
        } catch (error) {
            // File không tồn tại
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read orders' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log(`File accounts.json sẽ được cập nhật tại: ${ACCOUNTS_FILE}`);
});

module.exports = app;
