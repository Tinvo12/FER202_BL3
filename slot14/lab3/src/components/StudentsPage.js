import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { getAllStudents, addNewStudent } from '../data/students';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';
import { FaSearch } from 'react-icons/fa';

const StudentsPage = ({ quickSearchTerm, onStudentAdded }) => {
  // useState hook - Quản lý state cho danh sách sinh viên và các filter
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect hook - Load dữ liệu sinh viên khi component mount
  // Đây là một trong những yêu cầu của đề bài: sử dụng useEffect
  useEffect(() => {
    // Load students data - Tải dữ liệu sinh viên
    const loadStudents = () => {
      const allStudents = getAllStudents();
      setStudents(allStudents);
    };
    
    loadStudents();
  }, []);

  // useCallback hook - Hàm thêm sinh viên mới
  // Đây là một trong những yêu cầu của đề bài: sử dụng useCallback cho các handler
  const handleAddStudent = useCallback((profileData) => {
    // Add new student - Thêm sinh viên mới
    const newStudent = addNewStudent(profileData);
    
    // Update students state - Cập nhật state students
    setStudents(prevStudents => [...prevStudents, newStudent]);
    
    // Notify parent component - Thông báo cho component cha
    if (onStudentAdded) {
      onStudentAdded(newStudent);
    }
    
    return newStudent;
  }, [onStudentAdded]);

  // useMemo hook - Tính toán danh sách sinh viên đã filter và sort
  // Đây là một trong những yêu cầu của đề bài: sử dụng useMemo
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = [...students];

    // Filter by search term - Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.profile && student.profile.username.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by age range - Lọc theo khoảng tuổi
    if (ageRange) {
      switch (ageRange) {
        case '≤20':
          filtered = filtered.filter(student => student.age <= 20);
          break;
        case '21-25':
          filtered = filtered.filter(student => student.age >= 21 && student.age <= 25);
          break;
        case '>25':
          filtered = filtered.filter(student => student.age > 25);
          break;
        default:
          break;
      }
    }

    // Filter by avatar - Lọc theo avatar
    if (hasAvatar) {
      filtered = filtered.filter(student => student.avatar && student.avatar.trim() !== '');
    }

    // Sort students - Sắp xếp sinh viên
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'age-asc':
            return a.age - b.age;
          case 'age-desc':
            return b.age - a.age;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [students, searchTerm, ageRange, hasAvatar, sortBy]);

  // useCallback hook - Xử lý quick search
  const handleQuickSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // useEffect hook - Xử lý quick search từ navbar
  useEffect(() => {
    if (quickSearchTerm) {
      setSearchTerm(quickSearchTerm);
    }
  }, [quickSearchTerm]);

  // useCallback hook - Xử lý xem chi tiết sinh viên
  const handleViewDetails = useCallback((student) => {
    setSelectedStudent(student);
    setShowModal(true);
  }, []);

  // useCallback hook - Xử lý đóng modal
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedStudent(null);
  }, []);

  // useCallback hook - Xử lý xóa filter
  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setAgeRange('');
    setHasAvatar(false);
    setSortBy('');
  }, []);

  // Calculate statistics - Tính toán thống kê
  const stats = useMemo(() => {
    const total = students.length;
    const withAvatar = students.filter(student => student.avatar && student.avatar.trim() !== '').length;
    const avgAge = total > 0 ? Math.round(students.reduce((sum, student) => sum + student.age, 0) / total) : 0;
    
    return { total, withAvatar, avgAge };
  }, [students]);

  return (
    <Container className="py-4">
      {/* Statistics Section - Phần thống kê */}
      <Row className="mb-4">
        <Col>
          <Alert variant="info" className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Total Students:</strong> {stats.total} | 
              <strong>With Avatar:</strong> {stats.withAvatar} | 
              <strong>Average Age:</strong> {stats.avgAge}
            </div>
            <Badge bg="primary" className="ms-2">
              <FaSearch className="me-1" />
              {filteredAndSortedStudents.length} results
            </Badge>
          </Alert>
        </Col>
      </Row>

      {/* Filters and Sort Section - Phần filter và sort */}
      <Row className="mb-4">
        <Col md={8}>
          <Filters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            ageRange={ageRange}
            onAgeRangeChange={setAgeRange}
            hasAvatar={hasAvatar}
            onHasAvatarChange={setHasAvatar}
            onClearFilters={handleClearFilters}
          />
        </Col>
        <Col md={4}>
          <SortDropdown
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </Col>
      </Row>

      {/* Students Grid - Lưới sinh viên */}
      <StudentGrid
        students={filteredAndSortedStudents}
        onViewDetails={handleViewDetails}
      />

      {/* Student Detail Modal - Modal chi tiết sinh viên */}
      <StudentDetailModal
        show={showModal}
        onHide={handleCloseModal}
        student={selectedStudent}
      />

      {/* Expose handleAddStudent function to parent - Expose function cho component cha */}
      {React.useEffect(() => {
        if (window) {
          window.handleAddStudent = handleAddStudent;
        }
      }, [handleAddStudent])}
    </Container>
  );
};

// PropTypes validation - Kiểm tra kiểu dữ liệu props
StudentsPage.propTypes = {
  quickSearchTerm: PropTypes.string,
  onStudentAdded: PropTypes.func
};

export default StudentsPage;
