import { useState } from "react";
import { loginUser } from "../../services/userService";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = ()=>{
    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })

    const [setErrorMessages] = useState()
    const {setAuthToken, authToken} = useContext(AppContext);

    const handleChange = (event) =>{
        const { value } = event.target;
        setCredentials({
            ...credentials,
            [event.target.name]:value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        loginUser(credentials).then(data=>data.status?setAuthToken(data.data.access_token):setErrorMessages({"message": data.message , "errors": data.errors}))
    }
    
    const navigate = useNavigate();
    useEffect(()=>{
      if(authToken) navigate('/products/1')
    },[authToken])

    return (
<div>
    <div>
        <div className="col-md-4 offset-md-4">
        <form onSubmit={submitHandler}>
          <div className="form container mt-4">
            <h2 className="m-3 mb-5 text-center">Prisijungti</h2>
          </div>
          <div>
            <input onChange={handleChange} type="text" id="email" name="email" className="form-control input-sm chat-input" placeholder="El.paštas" />
            <br />
            <input onChange={handleChange} type="password" id="password" name="password" className="form-control input-sm chat-input" placeholder="Slaptažodis" />
          </div>
          <div className="card-footer text-muted">
            <button type="submit" className="btn btn-primary w-100 mt-3 mb-3">Prisijungti</button>
            <div><p>Neturite paskyros ?<Link to="/register" className="text-decoration-none"> Registruokis</Link></p></div>
          </div>
        </form>
    </div>
    </div>
</div>
    )
}


export default Login