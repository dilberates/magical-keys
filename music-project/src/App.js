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
import GetLevelsPage from './components/admin/LevelOperations/get_levels_page';
import AddLevelsPage from './components/admin/LevelOperations/add_levels_page';
import EditLevelPage from './components/admin/LevelOperations/edit_level_page';
import AddContentPage from './components/admin/ContentOperations/add_content_page';
import GetContentsPage from './components/admin/ContentOperations/get_contents_page';
import AddContentTypePage from './components/admin/ContentTypeOperations/add_contentType_page';
import GetTypesPage from './components/admin/ContentTypeOperations/get_types_page';
import StudentLessonsPage from './components/student/student_lessons_page';
import StudentContentPage from './components/student/student_contents_page';
import GetSongsPage from './components/admin/SongOperations/get_songs_page';
import AddSongsPage from './components/admin/SongOperations/add_song_page';
import GetSubContentsPage from './components/admin/SubContentOperations/get_sub_contents_page';
import AddSubContentPage from './components/admin/SubContentOperations/add_new_subcontent_page';
import StudentSubContentPage from './components/student/student_subcontents_page';


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
           <Route path="/addNewTypes" element={<AddContentTypePage/>} />
           <Route path="/edit-level/:id" element={<EditLevelPage/>} />
           <Route path="/addNewContent" element={<AddContentPage/>} />
           <Route path="/addNewSubContent" element={<AddSubContentPage/>} />
           <Route path="/getContentsPage" element={<GetContentsPage/>} />
           <Route path="/getSubContentsPage" element={<GetSubContentsPage/>} />
           <Route path="/addNewContent" element={<AddContentPage/>} />
           <Route path="/getTypesPage" element={<GetTypesPage/>} />
           <Route path="/getStudentLessons" element={<StudentLessonsPage></StudentLessonsPage>} />
           <Route path="/getSongPage" element={<GetSongsPage></GetSongsPage>} />
           <Route path="/addNewSong" element={<AddSongsPage></AddSongsPage>} />
           <Route path="/level-courses/:id" element={<StudentContentPage></StudentContentPage>} />
           <Route path="/content-subcontents/:id" element={<StudentSubContentPage/>} />
     
        </Routes>
    
      </div>
    </Router>
  );
}

export default App;
