import React, {  useEffect, useState } from "react";
import { useLocation, useNavigate,} from "react-router-dom";
import {  checkUserLogin } from "../../api/Auth";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Login() {
  const query = useQuery();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email === "") {
      alert
    } else {
      query.get('page') === '/' ? navigate("/") : navigate(`/${query.get("page")}`);
    }
  }, [email]);

  const checkUserData = async (event) => {
    event.preventDefault();
    const user = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    const data = await checkUserLogin(user)
    setEmail(data.data.access_token)
    
    
    if (data.data.access_token) {
      localStorage.setItem("access",data.data.access_token)
      !query.get('page') ? navigate("/") : navigate(`/${query.get("page")}`);
    } else {
      alert("Siz ro'yxatdan o'tmagansiz");
    }
  };

  function navigateReg() {
    navigate("/register");
  }

  

  return (
      <div className="container">
        <div className="col-11 col-md-12">
          <form
              className="mx-auto"
              style={{ marginTop: "150px" }}
              onSubmit={checkUserData}
              id="user"
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1"
              style={{width:"400px", marginLeft:"32.5%",marginRight:"auto"}}
              >Email address</label>
              <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  style={{width:"400px",marginLeft:"auto",marginRight:"auto"}}/>
              <small id="emailHelp" className="form-text text-muted"style={{marginLeft:"32.5%"}}>
                We will never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1"
              style={{width:"400px", marginLeft:"32.5%",marginTop:"20px"}}
              >Password</label>
              <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  style={{width:"400px",marginLeft:"auto",marginRight:"auto"}}
              />
            </div>
            <button
                type="submit"
                form="user"
                className="btn btn-primary"
                style={{marginLeft:"46.5%",marginBlock:"1%"}}
            >
              Submit
            </button>
          </form>
          <button
              className="btn btn-outline-success"
              onClick={navigateReg}
              style={{marginLeft:"38.5%"}}
          >
            Not registered on TopJobs? Join
          </button>
        </div>
      </div>
  );
}
export default Login;