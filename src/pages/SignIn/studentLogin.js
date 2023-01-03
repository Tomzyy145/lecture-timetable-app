import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './studentLogin.css'

export default function StudentLog({data, status}) {
    
    const [levelId, setLevelId] = useState('')
    const [databasePassword, setDatabasePassword] = useState('')
    const [password, setPassword] = useState('')
    const [selected, setSelected] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    const navigateTo = useNavigate()
    const [studentSelected, setStudentSelected] = useState('')

    console.log(studentSelected)
    if(status === 'fulfilled') {
        const levelData = data.Levels
        const currentLevel = data.Levels.filter(item => item.id == levelId)

        const levelsList = levelData.map(data => (
            <option key={data.id} value={data.id}>{data.level}</option>
        ))
            
        function userSeclected(id) {
            const userSelected = data.Students.filter(item => item.id == id)
            setStudentSelected(userSelected[0])

            const PASSWORD = userSelected[0].password
            setDatabasePassword(PASSWORD)
        }

        function handleLogIn() {
            if (databasePassword === password) {
                navigateTo(`/dashboard/${studentSelected.id}`)
            } else {
                setDisplayError(true)
            }
        }

        return (
            <div className="student-login">
                <h1>Student Login Page</h1>

                <p>Select Your Level and your name </p>
                <div className='login-select-level'>
                        <label className='login-select-level-label'>Select Level:</label>
                        <select value={levelId}  onChange={(e) => setLevelId(e.target.value)}>
                            <option value=''></option>
                            {levelsList}
                        </select>
                </div>

                {
                    levelId && currentLevel[0].Students.length == 0 ? 
                        <p>No Students Registered in this level</p> :
                    <div className="select-student">
                        <p>Students Registered in this level:</p>
                        <ul>
                            {levelId && currentLevel[0].Students.map(item => (
                                <li onClick={() => (userSeclected(item.id), setSelected(true))}>{item.name}</li>
                            ))}
                        </ul>    
                    </div>
                }

                {selected && 
                    <>
                        <p>Input Your Password: </p>
                        <div className="login-password">
                            <label>Password </label>
                            <input type={"password"} placeholder={'Enter password'} value={password} onChange={(e) => (setPassword(e.target.value), setDisplayError(false) )}></input>

                        </div>
                        <button onClick={() => handleLogIn()}>LOG IN</button>
                    </>
                }

                {displayError && <h4 style={{color: 'red'}}>Incorrect Password</h4>}
            </div>
        )            
    }
    return (
        <div className="student-login">
            <h1>Student Logging Page</h1>
            <h3>Loading Data...</h3>
        </div>
    )
}