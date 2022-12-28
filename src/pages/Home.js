import { useNavigate } from 'react-router-dom'
import './home.css'

export default function Home () {

    const navigateTo = useNavigate()

    return (
        <div className="home-page">
            <div>
                <h1>Time Table Management</h1>

                <div className="home-btn-group">
                    <button onClick={() => navigateTo('/signin/student')}>Student</button>
                    <button onClick={() => navigateTo('/signin/admin')} >Admin</button>
                </div>
            </div>
        </div>
    )
}