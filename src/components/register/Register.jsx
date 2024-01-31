import { useState } from "react";
import { registerUser } from "../../services/userService";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = ()=>{
    const [regData, setRegData] = useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    })

    const [errorMessages, setErrorMessages] = useState()
    const {setAuthToken, authToken} = useContext(AppContext);

    const handleChange = (event) =>{
        const { value } = event.target;
        setRegData({
            ...regData,
            [event.target.name]:value
        })
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      registerUser(regData).then(data=>data.status?setAuthToken(data.data.access_token):setErrorMessages(data.errors))
    }

    const navigate = useNavigate();
    useEffect(()=>{
      if(authToken) navigate('/products/1')
    },[authToken])

    return (
<div>
    <div className="row">
        <div className="col-md-4 offset-md-4">
        <form onSubmit={submitHandler}>
          <div className="card-header">
            <h2 className="m-3 mb-5 text-center">Registruokis</h2>
          </div>
          <div className="card-body">
          <input onChange={handleChange} type="text" id="name" name="name" className="form-control input-sm chat-input" placeholder="Vartotojo vardas" />
            <br />
            <input onChange={handleChange} type="text" id="email" name="email" className="form-control input-sm chat-input" placeholder="El.paštas" />
            <br />
            <input onChange={handleChange} type="password" id="password" name="password" className="form-control input-sm chat-input" placeholder="Slaptažodis" />
            <br />
            <input onChange={handleChange} type="password" id="password_confirmation" name="password_confirmation" className="form-control input-sm chat-input" placeholder="Patvirtinti slaptažodį" />
          </div>
          <div className="card-footer text-muted">
            <button type="submit" className="btn btn-primary w-100 mt-3 mb-3">Registruotis</button>
            <div><p>Turite paskyrą ?<Link to="/login" className="text-decoration-none"> Prisijunkite</Link></p></div>
          </div>
        </form>
        
    </div>
    </div>
</div>
    )
}


export default Register