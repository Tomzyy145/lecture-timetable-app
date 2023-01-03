// import { useParams } from "react-router-dom"
import { useNavigate, Link } from "react-router-dom"

export default function Level({data, status, level}){

    const navigateTo = useNavigate()

    if (status === 'fulfilled') {
        const currentLevel = data.Levels.filter(item => item.id == level)

        console.log(currentLevel[0].Students.length)

        return (
            <div className="level-details">
                <h2>Details on {level} Level</h2>

                <h4>Students Currently Registered </h4>
                {
                    currentLevel[0].Students.length == 0 ? 
                        <p style={{color: 'red'}}>No Students currently registered</p> :
                    <ul>
                        {currentLevel[0].Students.map(item => (
                            <li onClick={() => navigateTo(`/admin/${item.id}`)}>{item.name}</li>
                        ))}
                    </ul>
                }

                <h3>All Courses Available: </h3>
                <ul>
                {
                    currentLevel[0].available_course.map(course =>(
                        <li>
                            {course}
                        </li>
                    ))
                }
                </ul>

                <br></br>
                <p>Go Back to <Link to='/'>Home Page</Link></p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Loading Data</h1>
                <br></br>
                <p>Go Back to <Link to='/'>Home Page</Link></p>
            </div>
        )
    }
}