import React, { useState, useCallback } from 'react';
import NavigationBar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';
import ProfileWizardModal from './components/ProfileWizardModal';
import './App.css';

function App() {
  // useState hook - Quản lý state cho quick search và profile wizard modal
  const [quickSearchTerm, setQuickSearchTerm] = useState('');
  const [showProfileWizard, setShowProfileWizard] = useState(false);

  // handleQuickSearch: xử lý quick search từ navbar
  const handleQuickSearch = useCallback((term) => {
    setQuickSearchTerm(term);
  }, []);

  // handleShowProfileWizard: xử lý hiển thị profile wizard modal
  // Đây là callback được truyền xuống Navbar component
  const handleShowProfileWizard = useCallback(() => {
    setShowProfileWizard(true);
  }, []);

  // handleHideProfileWizard: xử lý ẩn profile wizard modal
  const handleHideProfileWizard = useCallback(() => {
    setShowProfileWizard(false);
  }, []);

  // handleStudentAdded: xử lý khi có sinh viên mới được thêm
  // Đây là một trong những yêu cầu: lưu thông tin profile vào danh sách sinh viên
  const handleStudentAdded = useCallback((newStudent) => {
    // Có thể thêm logic bổ sung ở đây nếu cần
    console.log('New student added:', newStudent);
  }, []);

  return (
    <div className="App">
      {/* NavigationBar component - Navbar chính của ứng dụng */}
      <NavigationBar 
        onQuickSearch={handleQuickSearch} 
        onShowProfileWizard={handleShowProfileWizard}
      />
      {/* Hero component - Banner chính */}
      <Hero />
      {/* StudentsPage component - Trang hiển thị danh sách sinh viên */}
      <StudentsPage 
        quickSearchTerm={quickSearchTerm} 
        onStudentAdded={handleStudentAdded}
      />
      {/* Footer component - Footer của ứng dụng */}
      <Footer />
      {/* ProfileWizardModal component - Modal wizard tạo profile */}
      {/* Đây là component chính được thêm vào để thực hiện yêu cầu của đề bài */}
      <ProfileWizardModal 
        show={showProfileWizard}
        onHide={handleHideProfileWizard}
        onStudentAdded={handleStudentAdded}
      />
    </div>
  );
}

export default App;