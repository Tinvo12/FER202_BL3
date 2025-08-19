import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";


const validateInput = (value) => {
  return value.length >= 5; 
};

function ValidatedInput() {
  const [value, setValue] = useState(""); 
  const [isValid, setIsValid] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(""); 

  
  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput); 
    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!"); 
    } else {
      setErrorMessage(""); 
    }
  }, [value]); 

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Form Validation với useEffect</h2>
          <Form>
            <Form.Group controlId="validatedInput" className="mb-3">
              <Form.Label>Nhập một giá trị</Form.Label>
              <Form.Control
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)} 
                isValid={isValid} 
                isInvalid={!isValid} 
                placeholder="Nhập ít nhất 5 ký tự..."
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage} 
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                Giá trị hợp lệ! 
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!isValid}>
              Gửi
            </Button>
          </Form>
          
          <div className="mt-4">
            <h5>Thông tin về useEffect:</h5>
            <ul>
              <li>useEffect được gọi mỗi khi giá trị <code>value</code> thay đổi</li>
              <li>Validation logic được thực hiện trong useEffect</li>
              <li>State <code>isValid</code> và <code>errorMessage</code> được cập nhật dựa trên kết quả validation</li>
              <li>Button "Gửi" bị disable khi form không hợp lệ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidatedInput;
