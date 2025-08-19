// Initial students data - Dữ liệu sinh viên ban đầu
export let students = [
  {
    id: 1,
    name: "Nguyen An",
    email: "an.nguyen@gmail.com",
    age: 19,
    avatar: "/images/students/student1.jpg ",
    // Profile information - Thông tin profile
    profile: {
      firstName: "Nguyen",
      lastName: "An",
      username: "an.nguyen",
      secretQuestion: "What is your first pet's name?",
      answer: "Buddy",
      street: "123 Nguyen Trai",
      city: "Ho Chi Minh",
      state: "Ho Chi Minh",
      zipCode: "70000",
      country: "Viet Nam"
    }
  },
  {
    id: 2,
    name: "Tran Binh",
    email: "binh.tran@fpt.edu.vn",
    age: 22,
    avatar: "/images/students/student2.jpg ",
    profile: {
      firstName: "Tran",
      lastName: "Binh",
      username: "binh.tran",
      secretQuestion: "In which city were you born?",
      answer: "Hanoi",
      street: "456 Le Loi",
      city: "Hanoi",
      state: "Hanoi",
      zipCode: "10000",
      country: "Viet Nam"
    }
  },
  {
    id: 3,
    name: "Le Chi",
    email: "chi.le@fpt.edu.vn",
    age: 26,
    avatar: " /images/students/student3.jpg  ",
    profile: {
      firstName: "Le",
      lastName: "Chi",
      username: "chi.le",
      secretQuestion: "What is your mother's maiden name?",
      answer: "Nguyen",
      street: "789 Tran Phu",
      city: "Da Nang",
      state: "Da Nang",
      zipCode: "55000",
      country: "Viet Nam"
    }
  },
  {
    id: 4,
    name: "Pham Duc",
    email: "duc.pham@fpt.edu.vn",
    age: 20,
    avatar: "/images/students/student3.jpg",
    profile: {
      firstName: "Pham",
      lastName: "Duc",
      username: "duc.pham",
      secretQuestion: "Who was your favorite teacher?",
      answer: "Ms. Lan",
      street: "321 Hai Ba Trung",
      city: "Hue",
      state: "Thua Thien Hue",
      zipCode: "53000",
      country: "Viet Nam"
    }
  },
  {
    id: 5,
    name: "Hoang Em",
    email: "em.hoang@gmail.com",
    age: 24,
    avatar: "/images/students/student3.jpg",
    profile: {
      firstName: "Hoang",
      lastName: "Em",
      username: "em.hoang",
      secretQuestion: "What is your first pet's name?",
      answer: "Lucky",
      street: "654 Vo Van Tan",
      city: "Can Tho",
      state: "Can Tho",
      zipCode: "90000",
      country: "Viet Nam"
    }
  },
  {
    id: 6,
    name: "Vu Phuong",
    email: "phuong.vu@fpt.edu.vn",
    age: 21,
    avatar: "/images/students/student3.jpg",
    profile: {
      firstName: "Vu",
      lastName: "Phuong",
      username: "phuong.vu",
      secretQuestion: "In which city were you born?",
      answer: "Hai Phong",
      street: "987 Nguyen Van Linh",
      city: "Hai Phong",
      state: "Hai Phong",
      zipCode: "31000",
      country: "Viet Nam"
    }
  },
  {
    id: 7,
    name: "Dang Quang",
    email: "quang.dang@gmail.com",
    age: 23,
    avatar: "/images/students/student3.jpg",
    profile: {
      firstName: "Dang",
      lastName: "Quang",
      username: "quang.dang",
      secretQuestion: "What is your mother's maiden name?",
      answer: "Tran",
      street: "147 Ly Thuong Kiet",
      city: "Nha Trang",
      state: "Khanh Hoa",
      zipCode: "65000",
      country: "Viet Nam"
    }
  },
  {
    id: 8,
    name: "Nguyen Son",
    email: "son.nguyen@fpt.edu.vn",
    age: 25,
    avatar: "/images/students/student3.jpg",
    profile: {
      firstName: "Nguyen",
      lastName: "Son",
      username: "son.nguyen",
      secretQuestion: "Who was your favorite teacher?",
      answer: "Mr. Minh",
      street: "258 Tran Cao Van",
      city: "Vung Tau",
      state: "Ba Ria - Vung Tau",
      zipCode: "78000",
      country: "Viet Nam"
    }
  },
  {
    id: 9,
    name: "Tran Thuy",
    email: "thuy.tran@gmail.com",
    age: 18,
    avatar: "/images/students/student3.jpg",
    profile: {
      firstName: "Tran",
      lastName: "Thuy",
      username: "thuy.tran",
      secretQuestion: "What is your first pet's name?",
      answer: "Snow",
      street: "369 Le Hong Phong",
      city: "Bien Hoa",
      state: "Dong Nai",
      zipCode: "81000",
      country: "Viet Nam"
    }
  },
  {
    id: 10,
    name: "Le Van",
    email: "van.le@fpt.edu.vn",
    age: 27,
    avatar: "",
    profile: {
      firstName: "Le",
      lastName: "Van",
      username: "van.le",
      secretQuestion: "In which city were you born?",
      answer: "Long Xuyen",
      street: "741 Nguyen Thi Minh Khai",
      city: "Long Xuyen",
      state: "An Giang",
      zipCode: "88000",
      country: "Viet Nam"
    }
  }
];

// Function to add new student with profile - Hàm thêm sinh viên mới với profile
// Đây là một trong những yêu cầu: lưu thông tin profile vào danh sách sinh viên
export const addNewStudent = (profileData) => {
  // Generate new ID - Tạo ID mới
  const newId = Math.max(...students.map(student => student.id)) + 1;
  
  // Create new student object - Tạo object sinh viên mới
  const newStudent = {
    id: newId,
    name: `${profileData.firstName} ${profileData.lastName}`,
    email: profileData.email,
    age: Math.floor(Math.random() * 10) + 18, // Random age between 18-27
    avatar: profileData.avatar ? URL.createObjectURL(profileData.avatar) : "",
    // Profile information - Thông tin profile
    profile: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      username: profileData.username,
      secretQuestion: profileData.secretQuestion,
      answer: profileData.answer,
      street: profileData.street,
      city: profileData.city,
      state: profileData.state,
      zipCode: profileData.zipCode,
      country: profileData.country
    }
  };
  
  // Add to students array - Thêm vào mảng students
  students = [...students, newStudent];
  
  return newStudent;
};

// Function to get all students - Hàm lấy tất cả sinh viên
export const getAllStudents = () => {
  return students;
};
