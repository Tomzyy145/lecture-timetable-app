import './adminSign.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AdminSign() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [displayError, setDisplayError] = useState(false)

    const navigateTo = useNavigate()

    // const adminDetails = {username: 'user5294', password: 'pa$$w0rd'}

    function handleSubmit(){
        setDisplayError(false)
        if (userName === 'user1234' && password === 'pa$$w0rd') {
            navigateTo('/admin')
        } else {
            setDisplayError(true)
        }
    }   
//    console.log('run')
    return (
        <div className="admin-page">
            <h1>Log In as Admin</h1>

            <form>
                <div>
                    <label>Username </label>
                    <input type={'text'} placeholder={'Enter Username'} value={userName} onChange={(e) => (setUserName(e.target.value), setDisplayError(false) )}></input>
                </div>
                <div>
                    <label>Password </label>
                    <input type={"password"} placeholder={'Enter password'} value={password} onChange={(e) => (setPassword(e.target.value), setDisplayError(false))}></input>
                </div>
            </form>

            <button onClick={() => handleSubmit()}>Log In</button>
            <p>Not an Admin ? <Link to='/'>Go Back</Link></p>

            {displayError && <h2 style={{color: 'red'}}>Incorrect password or userName</h2>}
        </div>
    )
}