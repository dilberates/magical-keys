import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from './components/main_page';
import TeacherAuthenticationPage from './components/teacher/teacher_authentication_page';
import TeacherMainPage from './components/teacher/teacher_main_page';
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
     
        </Routes>
    
      </div>
    </Router>
  );
}

export default App;
