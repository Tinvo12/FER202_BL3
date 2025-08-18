// Import React library
import React from 'react';
// Import ProfileForm component từ file ProfileForm.js
import ProfileForm from './ProfileForm';

// Component App chính của ứng dụng
function App() {
  /**
   * Callback function được truyền xuống ProfileForm component
   * Sẽ được gọi khi form được submit thành công
   * @param {Object} formData - Dữ liệu form đã được validate và submit
   */
  const handleFormSubmit = (formData) => {
    // Log dữ liệu ra console để debug
    console.log('Form submitted with data:', formData);
    // Ở đây có thể thêm logic xử lý dữ liệu như:
    // - Gửi API request
    // - Lưu vào database
    // - Hiển thị thông báo khác
  };

  // Render component App
  return (
    // Container chính với className "App" (có thể style trong App.css)
    <div className="App">
      {/* Render ProfileForm component và truyền callback function */}
      <ProfileForm onSubmit={handleFormSubmit} />
    </div>
  );
}

// Export component App để có thể import ở file khác (thường là index.js)
export default App;