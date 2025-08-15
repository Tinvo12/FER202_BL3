import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import AdvancedForm from "./component/AdvancedForm";

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
    alert("Gửi thành công!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="App">
      <h1 className="text-center my-4"> Ứng dụng React</h1>
      <AdvancedForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
