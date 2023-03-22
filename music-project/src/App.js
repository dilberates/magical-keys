import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/signup_component";
import SignIn from "./components/login_component";
import TeacherPage from "./components/teacher_page";
import MainPage from './components/main_page';
import TeacherAuthenticationPage from './components/teacher/teacher_authentication_page';
function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <TeacherPage /> : <MainPage/>}
          />
          
           <Route path="/index" element={<MainPage/>} />
           <Route path="/authenticationPage" element={<TeacherAuthenticationPage/>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<TeacherPage />} />
        </Routes>
    
      </div>
    </Router>
  );
}

export default App;
