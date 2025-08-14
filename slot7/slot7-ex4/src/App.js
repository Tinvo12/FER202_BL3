import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./components/Welcome";
import UserProfile from "./components/UserProfile";
import NameList from "./components/NameList";
import StudentCard from "./components/StudentCard";

import { Container, Row, Col } from "react-bootstrap";

function App() {
  const userData = { name: "vantin@fe.edu.vn", age: 21 };
  const namesList = ["vantin@fe.edu.vn", "test@fe.edu.vn"];
  const students = [
    { name: "vantin@fe.edu.vn", age: 21, avatar: "/images/student1.jpg" },
    { name: "hoanghuy@fe.edu.vn", age: 21, avatar: "/images/student2.jpg" },
    { name: "vantien@fe.edu.vn", age: 21, avatar: "/images/student3.jpg" },
  ];

  return (
    <>
      <Welcome name="vantin@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />

      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default App;
