import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import "./Login.css";

function Login() {
   const navi = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [user, setUser] = useState([]);
   const { loading, error, dispatch } = useContext(AuthContext);
   // const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         const response = await UserAPI.getAllData();

         setUser(response);
      };

      fetchData();
   }, []);

   const handleSubmit = async () => {
      try {
         if (!email || !password) {
            alert("email or password not fill!");
         }
         const users = await UserAPI.getAllData();
         console.log("🚀 ~ handleSubmit ~ users:", users);
         if (users.length === 0) {
            alert("can not found user!");
         }
         const user = users.filter((el) => {
            return el.email === email && el.password === password;
         });
         localStorage.setItem("asm03-user", JSON.stringify(user));
         dispatch("LOGIN_SUCCESS");
         return navi("/");
      } catch (error) {
         console.log("🚀 ~ handleSubmit ~ error:", error);
      }
      // if (findUser.password !== password) {
      // 	setErrorPassword(true);
      // 	return;
      // } else {
      // 	setErrorPassword(false);

      // 	localStorage.setItem('id_user', findUser._id);

      // 	localStorage.setItem('name_user', findUser.fullname);

      // 	const action = addSession(localStorage.getItem('id_user'));
      // 	dispatch(action);

      // 	setCheckPush(true);
      // }
   };

   return (
      <div className='page-wrapper'>
         <div className='page-breadcrumb'>
            <div className='row'>
               <div className='login'>
                  <div className='heading'>
                     <h2>Sign in</h2>
                     <form action='#'>
                        <div className='input-group input-group-lg'>
                           <span className='input-group-addon'>
                              <i className='fa fa-user'></i>
                           </span>
                           <input
                              type='text'
                              className='form-control'
                              placeholder='Email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                           />
                        </div>

                        <div className='input-group input-group-lg'>
                           <span className='input-group-addon'>
                              <i className='fa fa-lock'></i>
                           </span>
                           <input
                              type='password'
                              className='form-control'
                              placeholder='Password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>

                        <button type='button' className='float' onClick={handleSubmit}>
                           Login
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
