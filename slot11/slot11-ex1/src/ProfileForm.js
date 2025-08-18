// Import React và useState hook để quản lý state
import React, { useState } from 'react';
// Import PropTypes để validate props
import PropTypes from 'prop-types';

// Component ProfileForm nhận prop onSubmit từ component cha
const ProfileForm = ({ onSubmit }) => {
  // ===== STATE MANAGEMENT =====
  // State cho các giá trị input
  const [name, setName] = useState('');           // Lưu trữ giá trị tên người dùng
  const [email, setEmail] = useState('');         // Lưu trữ giá trị email
  const [age, setAge] = useState('');             // Lưu trữ giá trị tuổi
  
  // State cho các thông báo lỗi validation
  const [nameError, setNameError] = useState('');     // Lỗi validation cho tên
  const [emailError, setEmailError] = useState('');   // Lỗi validation cho email
  const [ageError, setAgeError] = useState('');       // Lỗi validation cho tuổi
  
  // State cho UI components
  const [showToast, setShowToast] = useState(false);      // Hiển thị/ẩn toast notification
  const [showModal, setShowModal] = useState(false);      // Hiển thị/ẩn modal
  const [submittedData, setSubmittedData] = useState(null); // Lưu trữ dữ liệu đã submit

  // ===== VALIDATION FUNCTIONS =====
  
  /**
   * Validate tên người dùng
   * @param {string} value - Giá trị tên cần validate
   * @returns {boolean} - true nếu hợp lệ, false nếu không hợp lệ
   */
  const validateName = (value) => {
    if (!value.trim()) {  // Kiểm tra nếu tên rỗng hoặc chỉ có khoảng trắng
      setNameError('Name is required');  // Set thông báo lỗi
      return false;
    }
    setNameError('');  // Xóa thông báo lỗi nếu hợp lệ
    return true;
  };

  /**
   * Validate email người dùng
   * @param {string} value - Giá trị email cần validate
   * @returns {boolean} - true nếu hợp lệ, false nếu không hợp lệ
   */
  const validateEmail = (value) => {
    // Regex pattern để kiểm tra định dạng email (phải có @ và domain)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value.trim()) {  // Kiểm tra nếu email rỗng
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {  // Kiểm tra định dạng email
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');  // Xóa thông báo lỗi nếu hợp lệ
    return true;
  };

  /**
   * Validate tuổi người dùng
   * @param {string} value - Giá trị tuổi cần validate
   * @returns {boolean} - true nếu hợp lệ, false nếu không hợp lệ
   */
  const validateAge = (value) => {
    if (!value) {  // Kiểm tra nếu tuổi rỗng
      setAgeError('Age is required');
      return false;
    }
    if (value < 1) {  // Kiểm tra nếu tuổi nhỏ hơn 1
      setAgeError('Age must be at least 1');
      return false;
    }
    setAgeError('');  // Xóa thông báo lỗi nếu hợp lệ
    return true;
  };

  // ===== EVENT HANDLERS =====
  
  /**
   * Xử lý khi người dùng thay đổi giá trị input tên
   * @param {Event} e - Event object từ input
   */
  const handleNameChange = (e) => {
    const value = e.target.value;  // Lấy giá trị từ input
    setName(value);               // Cập nhật state name
    validateName(value);          // Validate giá trị mới
  };

  /**
   * Xử lý khi người dùng thay đổi giá trị input email
   * @param {Event} e - Event object từ input
   */
  const handleEmailChange = (e) => {
    const value = e.target.value;  // Lấy giá trị từ input
    setEmail(value);              // Cập nhật state email
    validateEmail(value);         // Validate giá trị mới
  };

  /**
   * Xử lý khi người dùng thay đổi giá trị input tuổi
   * @param {Event} e - Event object từ input
   */
  const handleAgeChange = (e) => {
    const value = e.target.value;  // Lấy giá trị từ input
    setAge(value);                // Cập nhật state age
    validateAge(value);           // Validate giá trị mới
  };

  // ===== FORM VALIDATION =====
  
  /**
   * Kiểm tra xem form có hợp lệ hay không
   * @returns {boolean} - true nếu tất cả fields đều hợp lệ
   */
  const isFormValid = () => {
    // Gọi tất cả validation functions và trả về true chỉ khi tất cả đều pass
    return validateName(name) && validateEmail(email) && validateAge(age);
  };

  // ===== FORM SUBMISSION =====
  
  /**
   * Xử lý khi người dùng submit form
   * @param {Event} e - Event object từ form
   */
  const handleSubmit = (e) => {
    e.preventDefault();  // Ngăn chặn form reload trang
    
    if (isFormValid()) {  // Chỉ xử lý nếu form hợp lệ
      // Tạo object chứa dữ liệu đã submit
      const formData = { 
        name, 
        email, 
        age: parseInt(age)  // Chuyển age từ string sang number
      };
      
      setSubmittedData(formData);  // Lưu dữ liệu để hiển thị trong modal
      setShowToast(true);          // Hiển thị toast notification
      setShowModal(true);          // Hiển thị modal
      
      // Tự động ẩn toast sau 3 giây
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // Gọi callback function từ component cha nếu có
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  // ===== MODAL HANDLERS =====
  
  /**
   * Đóng modal và reset dữ liệu
   */
  const closeModal = () => {
    setShowModal(false);      // Ẩn modal
    setSubmittedData(null);   // Xóa dữ liệu đã submit
  };

  // ===== RENDER UI =====
  return (
    // Container chính với background màu xám nhạt
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Tiêu đề chính của ứng dụng */}
      <h1 style={{ textAlign: 'center', color: '#333' }}>Profile Form Application</h1>
      
      {/* Card chứa form với shadow và border radius */}
      <div style={{ 
        maxWidth: '500px', 
        margin: '50px auto', 
        padding: '30px', 
        backgroundColor: 'white', 
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'  // Shadow effect
      }}>
        {/* Tiêu đề form */}
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Profile Form</h2>
        
        {/* Form element với onSubmit handler */}
        <form onSubmit={handleSubmit}>
          {/* ===== NAME FIELD ===== */}
          <div style={{ marginBottom: '20px' }}>
            {/* Label cho input tên */}
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
              Name:
            </label>
            {/* Input field cho tên */}
            <input
              type="text"
              value={name}                    // Controlled component - giá trị từ state
              onChange={handleNameChange}     // Event handler khi thay đổi
              placeholder="Enter your name"   // Placeholder text
              style={{
                width: '100%',
                padding: '12px',
                // Border đỏ nếu có lỗi, xám nếu bình thường
                border: nameError ? '2px solid #dc3545' : '2px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'       // Include padding trong width
              }}
            />
            {/* Hiển thị thông báo lỗi nếu có */}
            {nameError && (
              <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {nameError}
              </span>
            )}
          </div>

          {/* ===== EMAIL FIELD ===== */}
          <div style={{ marginBottom: '20px' }}>
            {/* Label cho input email */}
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
              Email:
            </label>
            {/* Input field cho email */}
            <input
              type="email"                    // HTML5 email validation
              value={email}                   // Controlled component
              onChange={handleEmailChange}    // Event handler
              placeholder="Enter your email"  // Placeholder text
              style={{
                width: '100%',
                padding: '12px',
                // Border đỏ nếu có lỗi, xám nếu bình thường
                border: emailError ? '2px solid #dc3545' : '2px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {/* Hiển thị thông báo lỗi nếu có */}
            {emailError && (
              <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {emailError}
              </span>
            )}
          </div>

          {/* ===== AGE FIELD ===== */}
          <div style={{ marginBottom: '20px' }}>
            {/* Label cho input tuổi */}
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
              Age:
            </label>
            {/* Input field cho tuổi */}
            <input
              type="number"                   // HTML5 number input
              value={age}                     // Controlled component
              onChange={handleAgeChange}      // Event handler
              placeholder="Enter your age"    // Placeholder text
              min="1"                         // Giá trị tối thiểu
              style={{
                width: '100%',
                padding: '12px',
                // Border đỏ nếu có lỗi, xám nếu bình thường
                border: ageError ? '2px solid #dc3545' : '2px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {/* Hiển thị thông báo lỗi nếu có */}
            {ageError && (
              <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {ageError}
              </span>
            )}
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <button
            type="submit"                     // Submit form khi click
            disabled={!isFormValid()}         // Disable nếu form không hợp lệ
            style={{
              width: '100%',
              padding: '12px',
              // Màu xanh nếu enable, xám nếu disable
              backgroundColor: isFormValid() ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              // Cursor pointer nếu enable, not-allowed nếu disable
              cursor: isFormValid() ? 'pointer' : 'not-allowed'
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* ===== TOAST NOTIFICATION ===== */}
      {/* Hiển thị toast chỉ khi showToast = true */}
      {showToast && (
        <div style={{
          position: 'fixed',              // Fixed position để hiển thị trên cùng
          top: '20px',                    // Khoảng cách từ top
          right: '20px',                  // Khoảng cách từ right
          backgroundColor: '#28a745',     // Màu xanh lá cho success
          color: 'white',                 // Chữ màu trắng
          padding: '15px 20px',           // Padding bên trong
          borderRadius: '5px',            // Bo góc
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Shadow effect
          zIndex: 1000                    // Hiển thị trên các element khác
        }}>
          Submitted successfully!
        </div>
      )}

      {/* ===== MODAL ===== */}
      {/* Hiển thị modal chỉ khi showModal = true và có dữ liệu */}
      {showModal && submittedData && (
        // Overlay - background tối để focus vào modal
        <div 
          style={{
            position: 'fixed',              // Fixed position
            top: 0,                         // Cover toàn màn hình
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Background tối với opacity
            display: 'flex',                // Flexbox để center modal
            justifyContent: 'center',       // Center horizontally
            alignItems: 'center',           // Center vertically
            zIndex: 1000                    // Hiển thị trên các element khác
          }}
          onClick={closeModal}              // Đóng modal khi click outside
        >
          {/* Modal content */}
          <div 
            style={{
              background: 'white',          // Background trắng
              borderRadius: '10px',         // Bo góc
              padding: '20px',              // Padding bên trong
              maxWidth: '500px',            // Chiều rộng tối đa
              width: '90%'                  // Responsive width
            }}
            onClick={(e) => e.stopPropagation()}  // Ngăn event bubble lên overlay
          >
            {/* Modal header với nút đóng */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>Success!</h3>
              {/* Nút đóng modal */}
              <button 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            
            {/* Modal body - hiển thị thông tin đã submit */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #007bff' }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#333', textAlign: 'center' }}>Submitted Information</h4>
              {/* Hiển thị tên */}
              <p style={{ margin: '10px 0', color: '#555', fontSize: '16px' }}>
                <strong style={{ color: '#333' }}>Name:</strong> {submittedData.name}
              </p>
              {/* Hiển thị email */}
              <p style={{ margin: '10px 0', color: '#555', fontSize: '16px' }}>
                <strong style={{ color: '#333' }}>Email:</strong> {submittedData.email}
              </p>
              {/* Hiển thị tuổi */}
              <p style={{ margin: '10px 0', color: '#555', fontSize: '16px' }}>
                <strong style={{ color: '#333' }}>Age:</strong> {submittedData.age}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== PROPTYPES VALIDATION =====
// Validate props được truyền vào component
ProfileForm.propTypes = {
  onSubmit: PropTypes.func  // onSubmit phải là function
};

// Export component để sử dụng ở component khác
export default ProfileForm;
