import { useNavigate, useParams } from "react-router-dom";
import like from "../../assets/heart.png";
import liked from "../../assets/heartliked.png";
import commentss from "../../assets/comment.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import userface from "../../assets/man.png";
import Layout from "./../../layout/layout";
import { AddComment, Comment, Like } from "../../api/Post";
import "./index.css";

export async function fetchPostsDetails(id) {
 
  const { data } = await axios.get(
    `http://158.220.119.186:8050/appsapps/article/view_id/${id}/`
  );
  return data;
}

const PostDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: () => fetchPostsDetails(id),
  });
  const [likes, setLikes] = useState(0);
  const [commentsView, setCommentsview] = useState(false);
  const [comments, setComments] = useState([]);
  const email = localStorage.getItem("access")
  const navigate = useNavigate()

  const { register, handleSubmit, reset} = useForm({
    mode: "onBlur",
  });
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error recieve data</h1>;
  }

  const TapClaps = async () => {
    if (likes === 0) {
      const data = await Like(+id);
      setLikes(1);
    } else {
      const data = await Like(+id);
      setLikes(0);
    }
  };
  const ViewComments = async () => {
    if(!email){
      navigate("/register")
    }else{
      setCommentsview((p) => !p);
      const data = await Comment(id);
      setComments(data)
    }
   
  };

    const onsubmit = async(datas) => {
      const text = datas.comment
       await AddComment({text,article:id})
       const data = await Comment(id);
       setComments(data)  
      
      reset();
    };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          
            <div
              className="col-7 col-md-7 mx-auto posts"
              style={{ marginTop: "9%" }}
              key={data.id}
            >
              <h3 className="postdetailsh3">{data.title}</h3>
             
              <hr className="col-12" />
              <div className="d-flex">
                {likes === 0 ? (
                  <input
                    type="image"
                    src={like}
                    onClick={TapClaps}
                    width={"24px"}
                    height={"24px"}
                    className="claps"
                    alt=""
                  />
                ) : (
                  <input
                    type="image"
                    src={liked}
                    onClick={TapClaps}
                    width={"24px"}
                    height={"24px"}
                    className="claps"
                  />
                )}

                <div className="mx-2">
                  <img
                    onClick={ViewComments}
                    width={"25px"}
                    height={"25px"}
                    src={commentss}
                  />
                </div>
              </div>
              <hr className="col-12" />
              <img width={"630px"} height={"387px"} src={data.image} alt="" />
              <p className="postdetailsp" style={{ width: "620px" }}>
                {data.description}
              </p>
            </div>
        

          {commentsView && (
            <div
              onClick={() => setCommentsview(false)}
              className="overlay"
            ></div>
          )}

          {commentsView === false
            ? ""
            : <div className="commentbox"> 
              <div className="boxcomment">
              <div className="d-flex align-items-center text-center">
                <img src={userface} width={"25px"} height={"25px"} />
                <h5 className="mt-2 mx-2 text-black username">
                  {data.username}
                </h5>
              </div>
              <form onSubmit={handleSubmit(onsubmit)} id="addcomment">
                <textarea
                  className="writecomment"
                  placeholder="Write your Comment..."
                  cols="30"
                  rows="4"
                  {...register("comment", {
                    required: "Inputni to'ldir",
                  })}
                ></textarea>
              </form>
              <button
                type="submit"
                form="addcomment"
                className="btn btn-success my-3 float-end"
              >
                Respond
              </button>
            </div>
            <div className="commentsbox"> 
            {
              comments?.map((item)=><div className="mt-4 mx-2" key={item.id}>
              <div className="d-flex">
                <img
                  src={userface}
                  width={"30px"}
                  height={"30px"}
                  alt=""
                />
                <h5 className="mt-2 mx-2 text-black">
                  {item.username}
                </h5>
              </div>
              <p>{item.text}</p>
            </div>)
            }
            </div>
            </div>
              }
        </div>
      </div>
    </Layout>
  );
};

export default PostDetails;
