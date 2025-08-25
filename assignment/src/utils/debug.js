// Debug utility để kiểm tra dữ liệu
export const debugLocalStorage = () => {
	console.log('=== DEBUG LOCALSTORAGE ===');
	console.log('Accounts:', JSON.parse(localStorage.getItem('accounts') || '[]'));
	console.log('Auth User:', JSON.parse(localStorage.getItem('auth:user') || 'null'));
	console.log('Orders:', JSON.parse(localStorage.getItem('orders') || '[]'));
	console.log('Cart:', JSON.parse(localStorage.getItem('cart') || '[]'));
	console.log('Wishlist:', JSON.parse(localStorage.getItem('wishlist') || '[]'));
	console.log('========================');
};

export const clearAllData = () => {
	localStorage.clear();
	console.log('All localStorage data cleared');
};

export const createTestAccount = () => {
	const testAccount = {
		id: 2,
		username: "testuser",
		email: "test@example.com",
		password: "Test@123",
		name: "Test User",
		secretQuestion: "What is your first pet's name?",
		answer: "Fluffy",
		wishlist: [],
		avatar: "",
		address: {
			streetName: "Test Street",
			streetNumber: "123",
			city: "Test City",
			country: "Viet Nam"
		}
	};
	
	const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
	accounts.push(testAccount);
	localStorage.setItem('accounts', JSON.stringify(accounts));
	console.log('Test account created:', testAccount);
};
