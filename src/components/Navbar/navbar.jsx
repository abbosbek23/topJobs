import './navbar.css';
import {Link} from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import logo from "../../assets/topjobs.svg"

const Navbar = () => {

 
  const email = localStorage.getItem("access")


  function Logout(){
    localStorage.clear()
  }


  return (
    <div>
        <header className='navbar-dark bg-dark'>
          <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><img src={logo} width={"80px"} height={"30px"} alt="title" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse offset-5" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" aria-current="page" to={"/"} >Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/vacancy"}>Vacancy</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/resumepage"}>Resume</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/books"}>Books</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/videocourses"}>VideoCourses</Link>
        </li>
      </ul>
    </div>
    {
     email ?<DropdownButton id="dropdown-basic-button" title="My Profile">
     <Dropdown.Item href="/profile">Profil</Dropdown.Item>
     <Dropdown.Item href="/myarticle">My Articles</Dropdown.Item>
     <Dropdown.Item href="/myvacancy">My Vacancies</Dropdown.Item>
     <Dropdown.Item href="#/action-3" onClick={Logout}>Log out</Dropdown.Item>
   </DropdownButton>: <Link to={`/login?page=${location.pathname.slice(1).length ?location.pathname.slice(1):'/' }`}><div className="loginbtn">Login</div></Link>
    }
  </div>
</nav>
        </div>
        </header>
    </div>
  )
}

export default Navbar