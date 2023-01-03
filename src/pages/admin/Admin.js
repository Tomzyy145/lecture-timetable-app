import './admin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import {AppContext} from '../../context api/myContext'
import adminImg from '../../Images/admin-line.svg'
import Navbar from '../../components/Navbar'
import Level from './Level'

export default function Admin({status, data}) {

    const navigateTo = useNavigate()
    const [levelDetails, setLevelDetails] = useState('100')

    const {adminLogged} = useContext(AppContext)

    return (
        <div className='admin-Dashboard-page'>
            <Navbar name={'Admin'} image={adminImg}/>
            
            <p>Welcome To the Admin Page! </p>
            <h3>Levels</h3>

            {
                status == 'fulfilled' ? 
                    <>
                        {adminLogged ? 
                            <div>
                                <div className='admin-level-container'>
                                    {data.Levels.map(item => (
                                        <div key={item.id} className='admin-level-item' onClick={() => setLevelDetails(item.id)}>
                                            <p>{item.level} Level</p>
                                        </div>
                                    ))}                     
                                </div>

                                <Level level={levelDetails} status={status} data={data}/>
                            </div>
                            : 
                            <h3>Not Logged in as Admin, Log in <Link to='/signin/admin'>Here</Link></h3>
                        }
                    </>
                : <h3>Data still loading</h3>
            }
        </div>
    )
}