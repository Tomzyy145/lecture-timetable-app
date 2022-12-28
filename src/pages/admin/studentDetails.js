import { useParams } from "react-router-dom";

export default function StudentDetails({status, data}) {

    const {id} = useParams()

    if (status === 'fulfilled') {

//        const currentStudent = 
        const currentStudent = data.Students.filter(item => item.id == id)

        const {name, age, email, level, department, courses} = currentStudent[0]

        return (
            <div className="student-details-page">
                <h2>{name}</h2>
                <p>Age: {age}</p>
                <p>department: {department}</p>
            </div>
        )
    } else {
        return (
            <h1>Loading Data</h1>
        )
    }
}