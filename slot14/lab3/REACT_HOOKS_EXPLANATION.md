# Giải thích Chi tiết React Hooks và Components

## 1. React Hooks được sử dụng theo yêu cầu đề bài

### 1.1 useState Hook
**Mục đích**: Quản lý state đơn giản trong components

**Vị trí sử dụng**:
- `ProfileWizardModal.js`: Quản lý activeTab và showSuccessModal
- `AccountTab.js`: Quản lý showPassword và showConfirmPassword  
- `ProfileSuccessModal.js`: Quản lý showToast
- `Navbar.js`: Quản lý searchTerm và isSearchFocused
- `App.js`: Quản lý quickSearchTerm và showProfileWizard

**Cách hoạt động**:
```javascript
const [activeTab, setActiveTab] = useState('about');
// activeTab: giá trị hiện tại của state
// setActiveTab: function để cập nhật state
// 'about': giá trị khởi tạo
```

### 1.2 useEffect Hook
**Mục đích**: Thực hiện side effects khi component mount/unmount hoặc dependencies thay đổi

**Vị trí sử dụng**:
- `ProfileWizardModal.js`: Reset form khi modal đóng
- `ProfileSuccessModal.js`: Hiển thị toast khi modal mở

**Cách hoạt động**:
```javascript
useEffect(() => {
  if (!show) {
    dispatch({ type: 'RESET_FORM' });
    setActiveTab('about');
  }
}, [show]); // Chỉ chạy khi show thay đổi
```

### 1.3 useReducer Hook
**Mục đích**: Quản lý state phức tạp cho form data

**Vị trí sử dụng**:
- `ProfileWizardModal.js`: Quản lý formData với nhiều trường

**Cách hoạt động**:
```javascript
const [formData, dispatch] = useReducer(formReducer, initialState);

// formReducer function xử lý các actions
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
  }
};
```

### 1.4 useMemo Hook
**Mục đích**: Tối ưu hóa performance, chỉ tính toán lại khi dependencies thay đổi

**Vị trí sử dụng**:
- `ProfileWizardModal.js`: Tính stepValidity và progressPercentage

**Cách hoạt động**:
```javascript
const stepValidity = useMemo(() => ({
  about: validateAboutTab(),
  account: validateAccountTab(),
  address: validateAddressTab()
}), [validateAboutTab, validateAccountTab, validateAddressTab]);
```

### 1.5 useCallback Hook
**Mục đích**: Tối ưu hóa performance, tránh tạo lại function mỗi lần render

**Vị trí sử dụng**:
- `ProfileWizardModal.js`: Các handler functions (nextStep, prevStep, handleFieldChange, etc.)

**Cách hoạt động**:
```javascript
const handleFieldChange = useCallback((field, value) => {
  dispatch({ type: 'UPDATE_FIELD', field, value });
}, []); // Empty dependency array = function không bao giờ thay đổi
```

## 2. React Bootstrap Components được sử dụng

### 2.1 Form Components
- **Form**: Container cho form elements
- **Form.Group**: Nhóm các form controls
- **Form.Control**: Input fields (text, email, password)
- **Form.Select**: Dropdown select
- **Form.Label**: Labels cho form fields
- **Form.Control.Feedback**: Hiển thị validation errors

### 2.2 Modal Components
- **Modal**: Container cho modal dialog
- **Modal.Header**: Header của modal
- **Modal.Body**: Body content của modal
- **Modal.Footer**: Footer của modal

### 2.3 Navigation Components
- **Nav**: Navigation container
- **Nav.Item**: Navigation item
- **Nav.Link**: Navigation link

### 2.4 Layout Components
- **Row**: Bootstrap row
- **Col**: Bootstrap column
- **Container**: Bootstrap container

### 2.5 UI Components
- **Button**: Buttons với các variants
- **Card**: Card container
- **ProgressBar**: Progress indicator
- **Toast**: Toast notification
- **ToastContainer**: Container cho toasts
- **InputGroup**: Input với additional elements

## 3. PropTypes Validation

**Mục đích**: Kiểm tra kiểu dữ liệu props trong development

**Vị trí sử dụng**: Tất cả components chính
```javascript
ComponentName.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    // ...
  }).isRequired
};
```

## 4. React Icons

**Mục đích**: Cung cấp icons cho UI

**Icons được sử dụng**:
- `FaUser`: Icon user mặc định
- `FaCamera`: Icon camera cho upload
- `FaEye/FaEyeSlash`: Icons cho password visibility
- `FaUserPlus`: Icon cho "Build your Profile" link
- `FaCheckCircle`: Icon cho success
- `FaGraduationCap`: Icon cho logo
- `FaSearch`: Icon cho search
- `FaTimes`: Icon cho clear search

## 5. Luồng hoạt động của ứng dụng

### 5.1 Khởi tạo
1. App component mount với useState hooks
2. NavigationBar render với "Build your Profile" link
3. ProfileWizardModal được render nhưng ẩn (show=false)

### 5.2 Mở Profile Wizard
1. User click "Build your Profile" link
2. handleShowProfileWizard được gọi
3. setShowProfileWizard(true) cập nhật state
4. ProfileWizardModal hiển thị với tab "About" active

### 5.3 Điền form và validation
1. User nhập dữ liệu vào các fields
2. handleFieldChange được gọi với useCallback
3. dispatch action UPDATE_FIELD cập nhật formData
4. useMemo tính toán lại stepValidity và progressPercentage
5. Validation functions (useCallback) kiểm tra tính hợp lệ

### 5.4 Navigation giữa các tabs
1. User click "Next" button
2. nextStep function (useCallback) được gọi
3. setActiveTab cập nhật active tab
4. Tab mới hiển thị với validation state

### 5.5 Hoàn thành form
1. User click "Finish" trên tab cuối
2. handleFinish (useCallback) được gọi
3. setShowSuccessModal(true) và onHide()
4. ProfileSuccessModal hiển thị
5. useEffect trong ProfileSuccessModal hiển thị toast

### 5.6 Reset form
1. User đóng modal
2. useEffect trong ProfileWizardModal detect show=false
3. dispatch RESET_FORM action
4. Form trở về trạng thái ban đầu

## 6. Tối ưu hóa Performance

### 6.1 useCallback
- Tránh tạo lại functions mỗi lần render
- Đặc biệt quan trọng cho event handlers

### 6.2 useMemo
- Tránh tính toán lại các giá trị phức tạp
- Chỉ tính toán khi dependencies thay đổi

### 6.3 useReducer
- Quản lý state phức tạp hiệu quả hơn useState
- Tập trung logic state management

## 7. Validation Logic

### 7.1 About Tab
- First name: không rỗng
- Last name: không rỗng  
- Email: format hợp lệ

### 7.2 Account Tab
- Username: ít nhất 6 ký tự
- Password: ít nhất 8 ký tự, có chữ hoa, thường, số, ký tự đặc biệt
- Confirm password: khớp với password
- Secret question: đã chọn
- Answer: không rỗng

### 7.3 Address Tab
- Tất cả fields: không rỗng
- Country: đã chọn từ dropdown

## 8. File Structure và Component Hierarchy

```
App.js
├── NavigationBar.js (với "Build your Profile" link)
├── Hero.js
├── StudentsPage.js
├── Footer.js
└── ProfileWizardModal.js
    ├── AboutTab.js
    ├── AccountTab.js
    ├── AddressTab.js
    └── ProfileSuccessModal.js
```

Mỗi component đều sử dụng đúng các React hooks và Bootstrap components theo yêu cầu của đề bài, đảm bảo tính năng hoạt động đúng và performance tối ưu.
