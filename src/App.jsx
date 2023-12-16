import { Navigate, Route, Routes ,} from "react-router-dom";
import Home from "./pages/home/home";
import Vacancy from "./pages/Vacancy/vacancy";
import PostDetails from "./pages/PostDetails/postDetails";
import Register from "./pages/Register/register";
import { Context } from "./Context/Context";
import Login from "./pages/Login/login";
import Vacancydetails from "./pages/Vacancydetails/Vacancydetails";
import Resumepage from "./pages/Resume/Resumepage";
import Resume from "./pages/Resume/Resume";
import ResumeDetails from "./pages/Resume/ResumeDetails";
import Books from "./pages/Books/Books";
import Bookdetails from "./pages/Books/Bookdetails";
import VideoCourses from "./pages/VideoCourses/VideoCourses";
import VideoCoursesdetails from "./pages/VideoCourses/VideoCoursesdetails";
import Profile from "./pages/Profil/Profile";
import MyArticles from "./pages/MyArticles/MyArticles";
import MyVacancy from './pages/MyVacancy/MyVacancy';

function App() {
  return (
    <Context>
      <div>
        
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/*"} Component={<Navigate to={"http://localhost:3000/"}/>} /> 
          <Route path="/vacancy" element={<Vacancy/>} />
          <Route path="/register" Component={Register} />
          <Route path={"/login"} Component={Login} />
          <Route path={"/resume"} element={<Resume/>}/>
          <Route path={"/resumepage"} element={<Resumepage/>}/>
          <Route path={"/books"} element={<Books/>}/>
          <Route path={"/videocourses"} element={<VideoCourses/>}/>
          <Route path={"/profile"} element={<Profile/>}/>
          <Route path={"/myarticle"} element={<MyArticles/>}/>
          <Route path={"/myvacancy"} element={<MyVacancy/>}/>
          <Route path={"/videocoursesdetails/:namecategory"} element={<VideoCoursesdetails/>}/>
          <Route path={"/bookdetails/:id"} element={<Bookdetails/>}/>
          <Route path={"/resumedetails/:id"} element={<ResumeDetails/>}/>
          <Route path={"/:id"} element={<PostDetails />} />
          <Route path={"vacancydetails/:id"} element={<Vacancydetails />} />
          
        </Routes>
      </div>
    </Context>
  );
}

export default App;
