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
    const id = nanoid()

    const [department, setDepartment] = useState('')
    const [disabledState, setDisabledState] = useState(false)
    const [courseEnrolled, setCourseEnrolled] = useState([])

    const navigateTo = useNavigate()
    const [addStudents] = useAddStudentsMutation()

    useMemo(() => courseEnrolled.length >= 5 ? setDisabledState(true) : setDisabledState(false), [courseEnrolled] )
    
    // courseEnrolled.length >= 5 ? setDisabledState(true) : setDisabledState(false)
    
    if (status === 'fulfilled') {
        const levelData = data.Levels
        const currentLevel = data.Levels.filter(item => item.id == levelId)

//        console.log(currentLevel.length)
        
        function handleSubmit() {
            // setDisplayError(false)
            console.log(name)
            console.log(age)
            console.log(email)
            console.log(password)
            console.log(levelId)
            console.log(courseEnrolled)

            try {
                // setAddRequestStatus('pending')
                addStudents({id: id, name: name, email: email, age: Number(age), level: Number(levelId), courses: courseEnrolled, password: password, department: department }).unwrap()
                    .then(fulfilled => navigateTo(`/dashboard/${id}`))
                    .catch(rejected => console.error(rejected)) 

                // setBookTitle('')
                // setBookSummary('')
                // setBookPrice('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                // setAddRequestStatus('idle')
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

//        console.log('run')
    
        function handleRegistration({value, name}) {
            
            // console.log(courseEnrolled)
    //        console.log(value)
            if (value == true ) {
                setCourseEnrolled(prevState => [...prevState, name])
            } else {
                    setCourseEnrolled(prevState => {
                    const newState = prevState.filter(item => item !== name)
    //                    console.log(newState)
                    return newState
                })
            } 
            console.log(courseEnrolled)
        }            
            // if (value == true ) {
            //     if (courseEnrolled.includes(name)) {
            //         setCourseEnrolled(prevState => {
            //             const newState = prevState.filter(item => item !== value)
    
            //             return newState
            //         })
            //     } else {
            //         setCourseEnrolled(prevState => [...prevState, name])
            //     }
            // } 
        
            const canAdd = [name, age, email, levelId, department, password, courseEnrolled.length == 5].every(Boolean) 
        // const canAdd = [bookTitle, bookSummary, bookPrice, authorId].every(Boolean) && addRequestStatus == 'idle'

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
                        <input type={"number"} placeholder={'Enter password'} value={age} onChange={(e) => (setAge(e.target.value), setDisplayError(false))}></input>
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
    
                <button disabled={!canAdd} onClick={() => handleSubmit()}>Sign Up</button>
                <br></br>
                <br></br>
                <p><Link to='/'>Go Back</Link></p>
    
                {/* {displayError && <h2 style={{color: 'red'}}>Incorrect password or name</h2>} */}
            </div>
        )
    } else {

    }
}