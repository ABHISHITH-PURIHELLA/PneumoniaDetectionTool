import React, { useState,useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './authPages.css';



const LoginForm = (props) => {

  const location = useLocation();
  const fromSignUp = location.state?.fromSignUp || false;
  const [showSuccessMessage, setShowSuccessMessage] = useState(fromSignUp);
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [userID,setUserID] = useState('');
  const [loading, setLoading] = useState(false);
  const { onSignUpClick } = props;

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); 
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showSuccessMessage]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const user = {userName,userPwd,userID};
        setLoading(true);
        try{
          let usr = fetch(`http://localhost:8080/users/${user.userName}`,{
                  method:'GET',
              }).then( response => {
                if (response.status === 200) {
                  return response.json();
                } else {
                  throw new Error('Invalid credentials, Try Again !');
                }
            }).then( data => {
                  if (data.userPwd !== user.userPwd) {
                    throw new Error('Invalid credentials, Try Again !');
                  }
                  localStorage.setItem('isLoggedIn', true);
                  localStorage.setItem('userName', data.userName);
                  localStorage.setItem('userEmail', user.userName);
                  localStorage.setItem('userID',data.userID);
                  localStorage.setItem(data.userID, JSON.stringify({ isLoggedIn: true }));
                  if(user.userName === "adminFood4All@yopmail.com"){
                    window.location.href = '/AdminHome';
                  } else{
                    window.history.replaceState(null, null, '/home');
                    window.location.href = '/home';
                  }      
                 
            })
            .catch(error => {
              console.log(error.stack);
              alert(error.message);
              setLoading(false);
            });
        } catch(error) {
          console.log(error.stack);
          alert('Failed to login');
          setLoading(false);
        }
      };
  
    const LoadingComponent = () => {
        return <p>Loading...</p>;
      }
      {loading && <LoadingComponent />}
  return (
    <div className='homePageBody'>
      <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder='Enter your Email' required  value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Enter your Password' required value={userPwd} onChange={(e) => setUserPwd(e.target.value)}/>
          <FaLock className='icon' />
        </div>


        <div className='buttons-container'>
        <button type="submit"className='login-button'>Login</button>
        <button type="button" className='close-button' onClick={props.onClose}>Close</button>
        </div>
        <div className='register-link'>
        <p>Don't have an account? <span onClick={onSignUpClick} style={{cursor: 'pointer', color: 'blue'}}>Register</span></p>
        </div>

        {showSuccessMessage && (
        <div className='success-message'>Signed Up Successfully !!</div>
      )}
      
      </form>
    </div>
    </div>
  );
}

const SignUpForm = (props) => {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      const user = {userName, userEmail,userPwd, userCity, userPhone};
      
      fetch('http://localhost:8080/users/addUser',{
          method:'POST',
          headers: { "Content-Type":"application/json"},
          body: JSON.stringify(user)
      }).then( response => {
          if (response.status === 201) {
              navigate("/login", { state: { fromSignUp: true } });
          } else {
              throw new Error('Failed to sign up');
          }
      })
      .catch(error => {
          alert(error.message);
      });
  }

  return ( 
<div className='signUpPageBody'>
  <div className='wrapper'>
    <form onSubmit={handleSubmit}>
      <h1>SignUp</h1>
      <div className="input-box">
        <input 
        type="text" 
        placeholder='Enter your Name' 
        value={userName}
        onChange={ (e) => setUserName(e.target.value)}
        required />  
      </div>

      <div className="input-box">
        <input 
        type="text" 
        placeholder='Enter your email' 
        value={userEmail}
        onChange={ (e) => setUserEmail(e.target.value)}
        required />
        
      </div>
      <div className="input-box">
        <input 
        type="password" 
        placeholder='Password' 
        value={userPwd}
        onChange={ (e) => setUserPwd(e.target.value)}
        required />
        
      </div>
      
      <div className="input-box">
        <input 
        type="text" 
        placeholder='City' 
        value={userCity}
        onChange={ (e) => setUserCity(e.target.value)}
        required />
        
      </div>

      <div className="input-box">
        <input 
        type="text" 
        placeholder='Phone' 
        value={userPhone}
        onChange={ (e) => setUserPhone(e.target.value)}
        required />
      </div>
      <div className='buttons-container'>
      <button type="submit" className='login-button' >SignUp</button>  
      <button type="button" className='close-button' onClick={props.onClose}>Close</button>
      </div>
    </form>
  </div>
</div>
  );
}


export {LoginForm, SignUpForm};

























/*import React, { useState } from 'react';

// LoginModal Component
export const LoginModal = ({ onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    onSuccess(); // Simulate successful login
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

// SignupModal Component
export const SignupModal = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement signup logic here
    onSuccess(); // Simulate successful signup
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <button type="submit">Sign up</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};
*/