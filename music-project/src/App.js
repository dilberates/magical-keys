import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from './components/main_page';
import TeacherAuthenticationPage from './components/teacher/teacher_authentication_page';
import TeacherMainPage from './components/teacher/teacher_main_page';
import ForgotMyPassword from './components/forgot_my_password';
import StudentAuthenticationPage from './components/student/student_authentication_page';
import StudentMainPage from './components/student/student_main_page';
import AdminAuthenticationPage from './components/admin/admin_authentication_page';
import AdminMainPage from './components/admin/admin_main_page';
import TeacherForgotMyPassword from './components/teacher/teacher_forgot_mypassword';
import StudentForgotMyPassword from './components/student/student_forgot_mypassword';
import GetLevelsPage from './components/admin/get_levels_page';
import AddLevelsPage from './components/admin/add_levels_page';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <MainPage /> : <MainPage/>}
          />
          
           <Route path="/index" element={<MainPage/>} />
           <Route path="/teacherMainPage" element={<TeacherMainPage/>} />
           <Route path="/authenticationPage" element={<TeacherAuthenticationPage/>} />
           <Route path="/studentMainPage" element={<StudentMainPage/>} />
           <Route path="/authenticationPageStudent" element={<StudentAuthenticationPage/>} />
           <Route path="/forgotMyPassword" element={<ForgotMyPassword/>} />
           <Route path="/admin-login" element={<AdminAuthenticationPage/>} />
           <Route path="/adminMainPage" element={<AdminMainPage/>} />
           <Route path="/teacherForgotMyPassword" element={<TeacherForgotMyPassword/>} />
           <Route path="/studentForgotMyPassword" element={<StudentForgotMyPassword/>} />
           <Route path="/getLevelsPage" element={<GetLevelsPage/>} />
           <Route path="/addNewLevel" element={<AddLevelsPage/>} />
     
        </Routes>
    
      </div>
    </Router>
  );
}

export default App;
