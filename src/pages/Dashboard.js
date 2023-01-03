import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import studentIcon from '../Images/account-box-fill.svg'
import './dashboard.css'

export default function Dashboard({data, status}) {

    const {id} = useParams()

    function getRandom(min, max) {
        const floatRandom = Math.random()
      
        const difference = max - min
      
        // random between 0 and the difference
        const random = Math.round(difference * floatRandom)
      
        const randomWithinRange = random + min
      
        return randomWithinRange
    }

    if (status === 'fulfilled') {

        const currentStudentData = data.Students.filter(item => item.id == id)
        const {name, age, department, courses, level} = currentStudentData[0]

        // const currentStudent = data.
        // console.log(data)
        return (
            <div className="dashboard">
                <Navbar name={name} image={studentIcon}/>
                <h2>Dashboard Page</h2>

                <p><span style={{fontWeight: 'bold'}}>Name: </span> {name}</p>
                <p><span style={{fontWeight: 'bold'}}>Age: </span> {age}</p>
                <p><span style={{fontWeight: 'bold'}}>Department: </span> {department}</p>
                <p><span style={{fontWeight: 'bold'}}>Level: </span> {level}</p>
                <p><span style={{fontWeight: 'bold'}}>Courses Registered: </span> {courses.map(i => <li>{i}</li> )}</p>
                <br></br>
                
                <p><span style={{fontWeight: 'bold'}}>Matric: </span> 2022/{getRandom(8000, 9000)}</p>
                <h2>Generated Time Table: </h2>

                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                        </tr>
                        <tr>
                            <td>9:00 - 11:00Am</td>
                            <td>{courses[0]}</td>
                            <td></td>
                            <td>{courses[0]}</td>
                            <td>{courses[2]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>11:00 - 1:00PM</td>
                            <td></td>
                            <td>{courses[4]}</td>
                            <td></td>
                            <td></td>
                            <td>{courses[1]}</td>
                        </tr>
                        <tr>
                            <td>1:00 - 2:00PM</td>
                            <td>{courses[2]}</td>
                            <td></td>
                            <td>{courses[1]}</td>
                            <td>{courses[0]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2:00 - 4:00pm</td>
                            <td>{courses[1]}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                 </table>
                <br></br>
                <p>Go Back to <Link to='/'> Home Page</Link></p>
            </div>
        )
    }
//    console.log(data)
    console.log('loading')
    return (
        <div className="dashboard">
            <Navbar name={'loading..'} image={studentIcon}/>

            <h2>loading Data...</h2>
        </div>
    )
}

