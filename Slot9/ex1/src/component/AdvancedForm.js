import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const AdvancedForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "", // ➕ Giới tính
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^.{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;
    const age = parseInt(formData.age, 10);

    if (!formData.name || !nameRegex.test(formData.name))
      newErrors.name = "Tên phải có từ 3 đến 50 ký tự.";
    if (!formData.age || isNaN(age) || age < 18 || age > 100)
      newErrors.age = "Tuổi phải từ 18 đến 100.";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ.";
    if (!formData.phone || !phoneRegex.test(formData.phone))
      newErrors.phone = "Số điện thoại phải có từ 10 đến 15 chữ số.";
    if (!formData.gender)
      newErrors.gender = "Vui lòng chọn giới tính."; // ➕ Kiểm tra giới tính
    if (!formData.agree)
      newErrors.agree = "Bạn phải đồng ý với điều khoản.";

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Container>
      <h3>Đăng Ký Người Dùng</h3>
      {showAlert && <Alert variant="danger">Lỗi: Vui lòng kiểm tra các trường hợp lỗi.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Tên</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>

        {/* ➕ Giới tính */}
        <Form.Group>
          <Form.Label>Giới tính</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            isInvalid={!!errors.gender}
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Check
            name="agree"
            type="checkbox"
            label="Tôi đồng ý với điều khoản"
            checked={formData.agree}
            onChange={handleChange}
            isInvalid={!!errors.agree}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit">Gửi</Button>
      </Form>
    </Container>
  );
};

AdvancedForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AdvancedForm;
