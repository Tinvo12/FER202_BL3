import axios from 'axios';

// Dữ liệu tĩnh fallback
const fallbackProducts = [
  {
    "id": 1,
    "title": "iPhone 15 Pro Max",
    "name": "Apple",
    "image": "/images/iphone15promax.jpg",
    "price": 1199,
    "salePrice": 1099,
    "description": "Flagship Apple với chip A17 Pro, màn hình 6.7\" Super Retina XDR.",
    "tags": ["hot", "sale"]
  },
  {
    "id": 2,
    "title": "iPhone 14",
    "name": "Apple",
    "image": "/images/iphone14.jpg",
    "price": 799,
    "salePrice": 749,
    "description": "Thiết kế quen thuộc, chip A15 Bionic, camera kép chất lượng.",
    "tags": ["sale"]
  },
  {
    "id": 3,
    "title": "iPhone 13 Mini",
    "name": "Apple",
    "image": "/images/iphone13mini.jpg",
    "price": 699,
    "description": "Nhỏ gọn 5.4\", hiệu năng mạnh mẽ, pin được cải thiện.",
    "tags": []
  },
  {
    "id": 4,
    "title": "Samsung Galaxy S23 Ultra",
    "name": "Samsung",
    "image": "/images/galaxys23ultra.jpg",
    "price": 1199,
    "salePrice": 999,
    "description": "Flagship với S-Pen, camera 200MP, Snapdragon 8 Gen 2.",
    "tags": ["hot", "sale"]
  },
  {
    "id": 5,
    "title": "Samsung Galaxy Z Fold 5",
    "name": "Samsung",
    "image": "/images/galaxyzfold5.jpg",
    "price": 1799,
    "description": "Điện thoại gập 7.6\", đa nhiệm mạnh, thiết kế cao cấp.",
    "tags": ["hot"]
  },
  {
    "id": 6,
    "title": "Samsung Galaxy A54",
    "name": "Samsung",
    "image": "/images/galaxya54.jpg",
    "price": 449,
    "salePrice": 399,
    "description": "Tầm trung nổi bật với màn AMOLED, pin 5000mAh.",
    "tags": ["sale"]
  },
  {
    "id": 7,
    "title": "Xiaomi 13 Pro",
    "name": "Xiaomi",
    "image": "/images/xiaomi13pro.jpg",
    "price": 899,
    "description": "Camera hợp tác Leica, chip Snapdragon 8 Gen 2, sạc nhanh 120W.",
    "tags": ["hot"]
  },
  {
    "id": 8,
    "title": "Xiaomi Redmi Note 12",
    "name": "Xiaomi",
    "image": "/images/redminote12.jpg",
    "price": 299,
    "salePrice": 249,
    "description": "Phân khúc phổ thông, màn AMOLED 120Hz, pin 5000mAh.",
    "tags": ["sale"]
  },
  {
    "id": 9,
    "title": "Oppo Find X6 Pro",
    "name": "Oppo",
    "image": "/images/oppofindx6pro.jpg",
    "price": 1099,
    "description": "Camera Hasselblad, màn 2K 120Hz, sạc nhanh 100W.",
    "tags": []
  },
  {
    "id": 10,
    "title": "Vivo X90 Pro+",
    "name": "Vivo",
    "image": "/images/vivox90pro.jpg",
    "price": 999,
    "description": "Chụp ảnh mạnh mẽ với ZEISS optics, Snapdragon 8 Gen 2.",
    "tags": []
  },
  {
    "id": 11,
    "title": "Google Pixel 7 Pro",
    "name": "Google",
    "image": "/images/pixel7pro.jpg",
    "price": 899,
    "salePrice": 849,
    "description": "Camera AI xuất sắc, Android gốc, chip Tensor G2.",
    "tags": ["sale"]
  },
  {
    "id": 12,
    "title": "OnePlus 11",
    "name": "OnePlus",
    "image": "/images/oneplus11.jpg",
    "price": 699,
    "description": "Thiết kế đẹp, Snapdragon 8 Gen 2, sạc nhanh 100W.",
    "tags": []
  }
];

const fallbackAccounts = [
  {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "password": "Admin@123",
    "name": "Administrator",
    "secretQuestion": "Your birthplace?",
    "answer": "Earth",
    "wishlist": [],
    "avatar": "",
    "address": {
      "streetName": "Admin Street",
      "streetNumber": "1",
      "city": "Admin City",
      "country": "Viet Nam"
    }
  }
];

export const api = axios.create({
	baseURL: 'http://localhost:9999',
	headers: { 'Content-Type': 'application/json' },
	timeout: 3000 // 3 giây timeout
});

// Products
export const getProducts = async () => {
	try {
		const { data } = await api.get('/products');
		return data;
	} catch (error) {
		console.warn('JSON Server not running, using fallback data');
		return fallbackProducts;
	}
};

export const getProductById = async (id) => {
	try {
		const { data } = await api.get(`/products/${id}`);
		return data;
	} catch (error) {
		console.warn('JSON Server not running, using fallback data');
		return fallbackProducts.find(p => p.id === parseInt(id));
	}
};

// Accounts
export const findAccountByEmail = async (email) => {
	try {
		const { data } = await api.get(`/accounts?email=${email}`);
		return data[0] || null;
	} catch (error) {
		console.warn('JSON Server not running, using fallback data');
		return fallbackAccounts.find(acc => acc.email === email) || null;
	}
};

export const getAccountById = async (id) => {
	try {
		const { data } = await api.get(`/accounts/${id}`);
		return data;
	} catch (error) {
		console.warn('JSON Server not running, using fallback data');
		return fallbackAccounts.find(acc => acc.id === parseInt(id)) || null;
	}
};

export const createAccount = async (payload) => {
	try {
		const { data } = await api.post('/accounts', payload);
		return data;
	} catch (error) {
		console.error('Error creating account:', error);
		throw new Error('Failed to create account. Please try again.');
	}
};

export const updateAccount = async (id, partial) => {
	try {
		const { data } = await api.patch(`/accounts/${id}`, partial);
		return data;
	} catch (error) {
		console.error('Error updating account:', error);
		throw new Error('Failed to update account. Please try again.');
	}
};

// Orders
export const createOrder = async (payload) => {
	try {
		const { data } = await api.post('/orders', payload);
		return data;
	} catch (error) {
		console.warn('JSON Server not running, using localStorage fallback');
		// Fallback to localStorage
		const orders = JSON.parse(localStorage.getItem('orders') || '[]');
		const newOrder = { 
			id: orders.length + 1, 
			...payload 
		};
		orders.push(newOrder);
		localStorage.setItem('orders', JSON.stringify(orders));
		return newOrder;
	}
};

export const getOrdersByUserId = async (userId) => {
	try {
		const { data } = await api.get(`/orders?userId=${userId}`);
		return data;
	} catch (error) {
		console.warn('JSON Server not running, using localStorage fallback');
		const orders = JSON.parse(localStorage.getItem('orders') || '[]');
		return orders.filter(o => o.userid === userId);
	}
};


