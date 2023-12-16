import { useQuery, useQueryClient } from "@tanstack/react-query";
import Layout from "../../layout/layout";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import userface from "../../assets/man.png";
import { useNavigate } from "react-router-dom";
import PostModal from "./../../components/PostModal/postModal";

async function fetchPosts() {
  const  {data}  = await axios.get(
    "http://158.220.119.186:8050/appsapps/article-list/"
  );
  return data;
}


const Home = () => {

  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: fetchPosts,
  });
  const [Modalvisible, setModalvisible] = useState(false);
  const email = localStorage.getItem("access");
  const queryClient = useQueryClient()
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error recieve data</h1>;
  }
  if (!data) {
    return <h1>data not found</h1>;
  }

  function toggle() {
    if (!email) {
      navigate("/register");
    } else {
      setModalvisible((p) => !p);
    }
  }
  function refetchData(){
    queryClient.refetchQueries(["data"])
  }

  return (
    <div className="Main">
      <Layout>
        {
          refetchData()
        }
        <div className="container">
          <div className="row main-info">
            <div className="col-10 col-md-10 ms-2 my-3">
              <div className="col-12 d-flex">
                <h3 className="my-3">Posts</h3>
                <button
                  className="btn btn-danger btn-article h-100 my-3"
                  onClick={toggle}
                >
                  Create Article
                </button>
              </div>
              <hr className="mt-0 mb-4" />
              <div className="row">
                <div className="col-md-8 col-8">
                  { data?.filter((element) => element.is_activ)
                    .map((item) => (
                      <div key={item.id} className="row d-flex">
                        {" "}
                        <div className="col-md-8">
                          {" "}
                          <div className="topinfo d-flex align-items-center">
                            <img
                              src={item.img ? item.userImg : userface}
                              width={"27px"}
                              height={"27px"}
                              alt=""
                            />
                            <Link to={`/${item.id}`}>
                              <h4 className="topinfotext w-100">
                                {item.username === ""
                                  ? item.username
                                  : "Leana Graham"}{" "}
                                in Better Programming{" "}
                                <span className="ms-3 topinfotext">
                                  {new Date(item.created_at).toDateString() }
                                </span>
                              </h4>
                            </Link>
                          </div>
                          <div className="cardbody d-flex">
                            <div>
                              <Link to={`/${item.id}`}>
                                <h2 className="mt-2 w-75">{item.title}</h2>
                                <p>{item.body}</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 ms-5">
                          <Link to={`/${item.id}`}>
                            <img
                              style={{
                                marginLeft: "25px",
                                marginTop: "30px",
                                marginBottom: "20px",
                              }}
                              src={item.image}
                              width={"112px"}
                              height={"112px"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <hr />
                      </div>
                    ))}
                </div>
                <div className="col-md-4 col-4">
                  <h4>Staff Picks</h4>
                  <span className="line"></span>
                  {data
                    .filter((element) => element.is_activ)
                    .slice(2, 6).reverse()
                    .map((item) => (
                      <div key={item.id} className="col-md-12">
                        <div className="topinfo d-flex align-items-center">
                          <img
                            src={item.userImg ? item.userImg : userface}
                            width={"28px"}
                            height={"28px"}
                            alt=""
                          />
                          <Link to={`/${item.id}`}>
                            <h4 className="topinfotext w-100">
                              {item.username}
                            </h4>
                          </Link>
                        </div>
                        <p className="text-dark">{item.title}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <PostModal isOpen={Modalvisible} toggle={toggle} />
    </div>
  );
};

export default Home;
