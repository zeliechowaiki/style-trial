import { React, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Signup({ onLogin }) {
  let history = useHistory();
  const [errors, setErrors] = useState([]);
  const [accountInfo, setAccountInfo] = useState({
    avatar: null,
    name: "",
    email: "",
    username: "",
    bio: "",
    password: "",
    passwordConfirmation: "",
  });
  console.log(accountInfo)

  useEffect(() => {
    fetch('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    .then(response => response.blob())
    .then(blob => {
      const blankAvatar = new File([blob], 'blank-avatar');
      setAccountInfo({
        avatar: blankAvatar,
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
      });
    })
  },[]);

  function handleAccountChange(e) {
    const accountInfoCopy = { ...accountInfo };
    if (e.target.name === "avatar" && e.target.files[0]) {
      accountInfoCopy.avatar = e.target.files[0];
      setAccountInfo(accountInfoCopy);
    }
    else {
      accountInfoCopy[e.target.name] = e.target.value;
      setAccountInfo(accountInfoCopy);
    }
  }

  function handleAccountSubmit(e) {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData();
    formData.append('avatar', accountInfo.avatar);
    formData.append('name', accountInfo.name);
    formData.append('email', accountInfo.email);
    formData.append('username', accountInfo.username);
    formData.append('password', accountInfo.password);
    formData.append('password_confirmation', accountInfo.passwordConfirmation);
    fetch("/users", {
      method: "POST",
      body: formData,
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          history.push("/setup")
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="form-page">
      <form onSubmit={handleAccountSubmit}>
        <div>
          <label htmlFor="avatar">Add Profile Picture</label>
          <br></br>
          <div className="avatar-button">
            <input type="file" name="avatar" title="" onChange={handleAccountChange}
            className="avatar-input"> 
            </input>
            <img className="sample-avatar" src={accountInfo.avatar ? URL.createObjectURL(accountInfo.avatar) : "/blank-profile-pic.png"} alt="profile"></img>
          </div>
        </div>
        <br></br>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input type="text"
            placeholder="Enter Name"
            name="name"
            onChange={handleAccountChange}
            value={accountInfo.name}
          ></input>
        </div>
        <br></br>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input type="text"
            placeholder="Enter Email Address"
            name="email"
            onChange={handleAccountChange}
            value={accountInfo.email}
          ></input>
        </div>
        <br></br>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input type="text"
            placeholder="Enter Username"
            name="username"
            onChange={handleAccountChange}
            value={accountInfo.username}
          ></input>
        </div>
        <br></br>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleAccountChange}
            value={accountInfo.password}
          ></input>
        </div>
        <br></br>
        <div className="form-row">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input type="password"
            placeholder="Enter Confirmation"
            name="passwordConfirmation"
            onChange={handleAccountChange}
            value={accountInfo.passwordConfirmation}
          ></input>
        </div>
        <br></br>
        <div className="form-row">
          <label htmlFor="bio">Bio</label>
          <textarea type="text"
            placeholder="Enter Bio"
            name="bio"
            onChange={handleAccountChange}
            value={accountInfo.bio}
          ></textarea>
        </div>
        <br></br>
        <button type="submit">Create Account</button>
      </form>
      {
        errors && errors.length > 0 ? 
        errors.map((error) => <p key={uuid()}>{error}</p>)
        : 
        null
      }
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  )
}

export default Signup;