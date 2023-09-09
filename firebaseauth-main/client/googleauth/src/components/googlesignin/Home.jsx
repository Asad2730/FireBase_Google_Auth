import React from "react";
import { Button, Input } from "reactstrap";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";

const validationSchema = yup.object({
  age: yup.number("enter your age").min(2).required("age is required"),
  email: yup.string("Enter your gender").required("gender is required"),
});
function Home() {
  const formik = useFormik({
    initialValues: {
      age: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
    
      alert(JSON.stringify(values, null, 2));
      console.log(JSON.stringify(values, null, 2));
      try {
        const res = await axios.post(
          "http://localhost:8090/api/user/register",
          {
            ...values,
          }
        );
        console.log(res);
      } catch (err) {
        console.log("failed to register", err);
      }
    },
  });
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  
  const submit = async() =>{
    
    try {
      const email = localStorage.getItem('email')
      console.log('email',email)
      const res = await axios.post(
        "http://localhost:8090/api/user/register",
        {
          age:formik.values.age,gender:formik.values.gender,email:email
        }
      );
      console.log(res);
    } catch (err) {
      console.log("failed to register", err);
    }
  }

  return (
    <div>
      <h1>Welcome to your new journer</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          style={{ marginBottom: 20, width: 500 }}
          id="age"
          name="age"
          placeholder="Age*"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Input
          style={{ marginBottom: 20, width: 500 }}
          id="gender"
          name="gender"
          placeholder="Gender*"
          type="string"
          value={formik.values.gender}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
         <Button color="primary" type="submit" onClick={submit}>Submit</Button>
      </form>
      <Button onClick={logout}>LogOut</Button>
    </div>
  );
}
export default Home;
