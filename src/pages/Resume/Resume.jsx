import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { objectToFormData } from '../../ForFormdataResume/formdata';
import { postResume } from '../../api/Resume';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Select from "react-select";

const Resume = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        mode: "onBlur",
      });

      const options = [
        { value: "Html", label: "html", id: 1 },
        { value: "Css", label: "Css", id: 2 },
        { value: "JavaScript", label: "JavaScript", id: 3 },
        { value: "React", label: "React", id: 4 },
        { value: "Vue", label: "Vue", id: 5 },
        { value: "Angular", label: "Angular", id: 6 },
        { value: "Php", label: "Php", id: 7 },
        { value: "laravel", label: "laravel", id: 8 },
        { value: "yii", label: "yii", id: 9 },
        { value: "Phyton", label: "Phyton", id: 10 },
        { value: "Django", label: "Django", id: 11 },
        { value: "Spring", label: "Spring", id: 12 },
        { value: "NodeJS", label: "NodeJS", id: 13 },
        { value: "Mongo Db", label: "Mongo Db", id: 14 },
        { value: "Express JS", label: "Express JS", id: 15 },
        { value: "Jquery", label: "Jquery", id: 16 },
        { value: "C++", label: "C++", id: 17 },
        { value: "C#", label: "C#", id: 18 },
        { value: "TypeScript", label: "TypeScript", id: 19 },
        { value: "AWS", label: "AWS", id: 20 },
      ];
    
      const [valueSelected, setSelectedvalue] = useState([]);
      const currentdate = moment().format("dddd Do MMMM  YYYY, h:mm:ss a");
      const navigate = useNavigate();
    
      const onsubmit = (data) => {
        const imagesurl = data.image[0]
   
        const fullData = {
          ...data,
          image:imagesurl,
          skills: valueSelected.map((c) => c.label),
          created_at: currentdate,
        };
        const datas = objectToFormData(fullData)
        postResume(datas)
        reset()
        navigate("/resumepage");
      };
      const SelectedSkills = (selectedoption) => setSelectedvalue(selectedoption);


  return (
    <div>
        <div className="container">
      <div className="col-md-4 mx-auto my-5">
        <form
          className="form-group resume-box"
          onSubmit={handleSubmit(onsubmit)}
          id={"resume"}
        >
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className={"form-control"}
            {...register("username", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 4,
                message: "Kamida 4 harf",
              },
            })}
            placeholder="Name"
          />
          <div style={{ height: "25px", color: "#FF0000" }}>
            {errors?.username && (
              <p style={{ color: "red" }}>
                {errors?.username?.message || "Error"}
              </p>
            )}
          </div>
          <label htmlFor="exampleInputSurname">Surname</label>
          <input
            type="text"
            className={"form-control"}
            {...register("last_name", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 4,
                message: "Kamida 4 harf",
              },
            })}
            placeholder={"Surname"}
          />
          <div style={{ height: "25px", color: "#FF0000" }}>
            {errors?.last_name && (
              <p style={{ color: "red" }}>
                {errors?.last_name?.message || "Error"}
              </p>
            )}
          </div>
          <label htmlFor="exampleInputAddress">Address</label>
          <input
            type="text"
            className={"form-control"}
            {...register("address", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 4,
                message: "Kamida 4 harf",
              },
            })}
            placeholder={"Address"}
          />
          <div style={{ height: "25px", color: "#FF0000" }}>
            {errors?.address && (
              <p style={{ color: "red" }}>
                {errors?.address?.message || "Error"}
              </p>
            )}
          </div>
          <label htmlFor="exampleInputPhone">Phone</label>
          <input
            type="text"
            className={"form-control"}
            {...register("phone_number", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 4,
                message: "Kamida 7 raqam",
              },
            })}
            maxLength={14}
            defaultValue={"+998"}
          />
          <div style={{ height: "25px", color: "#FF0000" }}>
            {errors?.phone_number && (
              <p style={{ color: "red" }}>
                {errors?.phone_number?.message || "Error"}
              </p>
            )}
          </div>
          <div className="box-date-birth col-md-4">
            <label htmlFor="exampleInputdateofbirths">Date of Births</label>
            <input
              type={"date"}
              className={"date-births"}
              {...register("date_of_birth", {
                // required: "Inputni to'ldir",
                minLength: {
                  value: 6,
                  message: "To'liq to'ldirilishi shart",
                },
              })}
            />
            <div style={{ height: "25px", color: "#FF0000" }}>
              {errors?.date_of_birth && (
                <p style={{ color: "red" }}>
                  {errors?.date_of_birth?.message || "Error"}
                </p>
              )}
            </div>
          </div>
          <label htmlFor="exampleInputJob">Job Name</label>
          <input
            type="text"
            className="form-control w-100"
            {...register("job", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 4,
                message: "Kamida 15 harf",
              },
            })}
            placeholder="Job Name"
          />
          <div style={{ height: "25px", color: "#FF0000" }}>
            {errors?.job && (
              <p style={{ color: "red" }}>{errors?.job?.message || "Error"}</p>
            )}
          </div>
          <select
            className="form-select"
            {...register("level", {
              // required: "bittasini tanlash kerak",
              minLength: {
                value: 1,
                message: "Kamida 1 option",
              },
            })}
            defaultValue={"default"}
          >
            <option>Select Your Level</option>
            <option value="intern">Intern</option>
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="senior">Senior</option>
            <option value="team lead">Team lead</option>
          </select>
          <input
            type="text"
            placeholder="Your Github Account Url"
            className="form-control mt-5"
            {...register("github", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 4,
                message: "Kamida 7 raqam",
              },
            })}
          />
          <select
            className="form-select mt-5"
            {...register("working_time", {
              // required: "bittasini tanlash kerak",
              minLength: {
                value: 1,
                message: "Kamida 1 option",
              },
            })}
            defaultValue={"default"}
          >
            <option>Select Working Time</option>
            <option value="part time">Part time</option>
            <option value="full time">Full Time</option>
            <option value="remote working time">Remote working time</option>
          </select>
          <label htmlFor="exampleInputSalart" className="mt-5">
            Salary
          </label>
          <input
            type="text"
            placeholder="Salary"
            className="form-control"
            {...register("salary", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
          />

          <div style={{ height: "25px", color: "#FF0000" }}>
            {errors?.salary && (
              <p style={{ color: "red" }}>
                {errors?.salary?.message || "Error"}
              </p>
            )}
          </div>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            About me
          </label>
          <textarea
            className="form-control mb-5"
            id="exampleFormControlTextarea1"
            rows="3"
            {...register("about_me", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
            placeholder="About me"
          ></textarea>
          <label htmlFor="exampleSelectSkills" className="form-label">
            Select your skills
          </label>
          <Select
            options={options}
            value={valueSelected.value}
            isMulti={true}
            onChange={SelectedSkills}
          />
          <label htmlFor="exampleInputEducation" className="mt-5">
            Education
          </label>
          <input
            type="text"
            placeholder="Education"
            className="form-control"
            {...register("education", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
          />
          <label htmlFor="exampleInputEducationdirection" className="mt-5">
            Education direction
          </label>
          <input
            type="text"
            placeholder="Educationdirection"
            className="form-control"
            {...register("education_direction", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
          />
          <label htmlFor="exampleInputeducationdate" className="mt-5">
            Education date
          </label>
          <input
            type="text"
            placeholder="Education date"
            className="form-control"
            {...register("education_date", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
          />
          <label htmlFor="exampleInputcompanyname" className="mt-5">
            Company name
          </label>
          <input
            type="text"
            placeholder="Company name"
            className="form-control"
            {...register("company_name", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
          />
          <label htmlFor="exampleInputworkexperiencedirection" className="mt-5">
            Work Experience Direction
          </label>
          <input
            type="text"
            placeholder="Work Experience Direction"
            className="form-control"
            {...register("work_experience_direction", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
          />
          <label htmlFor="exampleInputworkexperiencedate" className="mt-5">
            Work Experience Date
          </label>
          <input
            type="text"
            placeholder="Work Experience Date"
            className="form-control"
            {...register("work_experience_date", {
              // required: "Inputni to'ldir",
              minLength: {
                value: 6,
              },
            })}
          />
          <p className="my-4 mb-0">Please Upload your image</p>
          <label
            htmlFor="upload-user-image"
            className="btn btn-outline-primary w-100 mt-0"
          >
            Upload your Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="upload-user-image"
            className="btngetimage"
            {...register("image", {
              // required: "Rasmingizni jo'nating",
              minLength: {
                value: 1,
              },
            })}
          />
          <button
            className={"btn btn-outline-success mt-4"}
            type={"submit"}
            form={"resume"}
          >
            Save
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Resume