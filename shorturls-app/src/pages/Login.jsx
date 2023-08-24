import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [create, setCreate] = useState({
    name: "",
    password: "",
  });
  const [pass, setPass] = useState(false);

  const togglePass = () => {
    setPass((prevState) => !prevState);
  };
  const emailHeandler = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value,
    });
    
  };

  const passwordHeandler = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value,
    });
    if (e.target.value.length < 8) {
      setError("Oops! That email/ password combination is not valid");
    } else {
      setError();
    }
  };
  const saveUser = () => {
    fetch(`http://localhost:7268/Login?name=${create.name}&password=${create.password}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Content-Type": "application/json",
      },
    }) 
    .then((res) => res.json())
    .then((json) => {
       localStorage.setItem("bearer",json);
        if (json) {
          navigate("/home");
        } else {
          setError("Oops! That email/ password combination is not valid");
        }
    })
     
      .catch((err) => console.log("error"));
  };

  function handleSubmit(e) {
    e.preventDefault();

    saveUser();
  }
  return (
    <div className="containe logup__wrapper is-flex is-flex-direction-column">
      <h1 className="content has-text-centered logup__title is-3 ">Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Enter name"
              value={create.email}
              onChange={(e) => emailHeandler(e)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              value={create.password}
              name="password"
              type={pass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => passwordHeandler(e)}
            />
          </div>
        </div>
        <div className="logup__fild field control">
    

          <span onClick={togglePass} className="logup__text">
            Show password
          </span>
        </div>
        <button type="submit" className="button is-danger title is-5  btn">
          Login
        </button>
      </form>
      
    </div>
  );
};
export default Login;