import Layout from "../../layout/layout";
import { useState } from "react";
import searchicon from "../../assets/search.png";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import VacancyModal from "../../components/VacancyModal/VacancyModal";

async function fetchPosts() {
  const { data } = await axios.get(
    "http://158.220.119.186:8050/appsapps/vacancy-list/"
  );
 
  return data;
}

const Vacancy = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: fetchPosts,
  });
  const [search, setSearch] = useState("");
  const [Modalvisible, setModalvisible] = useState(false);
  const email = localStorage.getItem("access");
  const navigate = useNavigate();
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
    queryClient.refetchQueries(["data"])
  }

  return (
    <div>
      <Layout>
        <div className="container my-3">
          <div className="row">
            <div
              className="MainTop col-12 col-md-12 bgImage bg-image align-items-center text-center"
              style={{ height: "700px" }}
            >
              <h2>
                Unlock Your Potential with HireMe Exciting Career Opportunities
              </h2>
              <h3 className="col-md-10 offset-1 ">Find your dream job</h3>
              <div className="row">
                <div className="col-md-5 text-center searchbar d-flex">
                  <input
                    type="text"
                    placeholder="Find Job?"
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <img src={searchicon} width={"15px"} height={"15px"} alt="" />
                </div>
              </div>
            </div>
            <button
              className=" btn btn-dark"
              style={{ width: "12%", marginLeft: "20px" }}
              onClick={toggle}
            >
              Create Vacancy
            </button>
            <div className="cardbox">
              {data &&
                data
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.job.toLowerCase().includes(search);
                  })
                  .map((item) => (
                    <div className="box" key={item.id}>
                      <Link to={`/vacancydetails/${item.id}`}>
                        <span className="lineLeft"></span>
                        <h4>{item.job}</h4>
                        <p>{item.company}$</p>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </Layout>
      <VacancyModal isOpen={Modalvisible} toggle={toggle} />
    </div>
  );
};

export default Vacancy;
