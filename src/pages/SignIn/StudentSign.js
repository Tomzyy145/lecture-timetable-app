// export default function StudentSign() {
//     return (
//         <h1>The Student Sign in page</h1>
//     )
// }

import './studentSign.css'
import {nanoid} from 'nanoid'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAddStudentsMutation } from '../../context api/myContext';

export default function StudentSign({data, status}) {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [levelId, setLevelId] = useState('')
    const [displayError, setDisplayError] = useState(false)

    const [department, setDepartment] = useState('')
    const [disabledState, setDisabledState] = useState(false)
    const [courseEnrolled, setCourseEnrolled] = useState([])
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [displayPending, setDisplayPending] = useState(false)
    const navigateTo = useNavigate()
    const [addStudents] = useAddStudentsMutation()

    useMemo(() => courseEnrolled.length >= 5 ? setDisabledState(true) : setDisabledState(false), [courseEnrolled] )
    
    const id = nanoid()
        
    if (status === 'fulfilled') {
        const levelData = data.Levels
        const currentLevel = data.Levels.filter(item => item.id == levelId)
        
        function handleSubmit() {
            // setDisplayError(false)
            setDisplayPending(true)

            if (addRequestStatus == 'idle') {
                try {
                    setAddRequestStatus('pending')
                    addStudents({id: id, name: name, email: email, age: Number(age), level: Number(levelId), courses: courseEnrolled, password: password, department: department }).unwrap()
                        .then(fulfilled => navigateTo(`/dashboard/${id}`))
                        .catch(rejected => console.error(rejected)) 
    
                    } catch (err) {
                    console.error('Failed to save the post', err)
                } finally {
                    setDisplayPending(false)                    
                    setAddRequestStatus('idle')
                }
            }

        }   
    
        const levelsList = levelData.map(data => (
            <option key={data.id} value={data.id}>{data.level}</option>
        ))
            
        const availableCourseList = currentLevel.length !== 0 ? currentLevel[0].available_course.map((level, id) => (
            <div className='course-checkbox' key={id}>
                <label>{level.toUpperCase()}</label>
                <input disabled={disabledState} type="checkbox" value={level} onChange={(e) => handleRegistration({value: (e.target.checked), name: level})} />
            </div>
        )) : <p>Select Level Above..</p>
    
        function handleRegistration({value, name}) {
            if (value == true ) {
                setCourseEnrolled(prevState => [...prevState, name])
            } else {
                    setCourseEnrolled(prevState => {
                    const newState = prevState.filter(item => item !== name)
                    return newState
                })
            } 
            // console.log(courseEnrolled)
        }            
        
        const canAdd = [name, age, email, levelId, department, password, courseEnrolled.length == 5].every(Boolean) 

        return (
            <div className="student-sign-page">
                <h1>Sign up as a Student</h1>
    
                <form>
                    <div>
                        <label>Name </label>
                        <input type={'text'} placeholder={'Enter Name'} value={name} onChange={(e) => (setName(e.target.value), setDisplayError(false))}></input>
                    </div>
                    <div>
                        <label>Age </label>
                        <input type={"number"} placeholder={'Enter Age'} value={age} onChange={(e) => (setAge(e.target.value), setDisplayError(false))}></input>
                    </div>
                    <div>
                        <label>Email </label>
                        <input type={'email'} placeholder={'Enter your email'} value={email} onChange={(e) => (setEmail(e.target.value), setDisplayError(false))}></input>
                    </div>
                    <div>
                        <label>Department </label>
                        <input type={'department'} placeholder={'Enter your Department'} value={department} onChange={(e) => (setDepartment(e.target.value), setDisplayError(false))}></input>
                    </div>
                    <div>
                        <label>Password </label>
                        <input type={"password"} placeholder={'Enter password'} value={password} onChange={(e) => (setPassword(e.target.value), setDisplayError(false))}></input>
                    </div>
                    <div className='select-level'>
                        <label className='select-level-label'>Select Level:</label>
                        <select value={levelId} onChange={(e) => setLevelId(e.target.value)}>
                            <option value=''></option>
                            {levelsList}
                        </select>
                    </div>
    
                    <div className='signin-course-section'>
                        <h3>Available Courses: (select five)</h3>
                        <div className='course-container' >
                            {availableCourseList}
                        </div>
                    </div>
                    
    
                </form>

                {displayPending && <p style={{color: 'blue'}}>please wait sending request...</p>}
                <button disabled={!canAdd} onClick={() => handleSubmit()}>Sign Up</button>
                <br></br>
                <p>Already Signed In? Go to Login page <Link to='/login'>Here</Link></p>
                <br></br>
                <p><Link to='/'>Go Back</Link></p>
                <br></br>
            </div>
        )
    } else {
        <div className="student-sign-page">
            <h1>Sign up as a Student</h1>
            <p>Loading Data</p>
        </div>    
    }
}   