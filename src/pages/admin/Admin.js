import './admin.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import adminImg from '../../Images/admin-line.svg'
import Navbar from '../../components/Navbar'
import Level from './Level'

export default function Admin({status, data}) {

    const navigateTo = useNavigate()
    const [levelDetails, setLevelDetails] = useState('100')

    return (
        <div className='admin-Dashboard-page'>
            <Navbar name={'Admin'} image={adminImg}/>
            {/* <div className='admin-nav'>
                <img src={adminImg} />
                <h3>Welcome Admin! </h3>
            </div> */}
            <p>Welcome To the Admin Page! </p>
            <h3>Levels</h3>

            {status === 'fulfilled' ? 
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
            <p>Data is still loading...</p>
        }
        </div>
    )
    // if (status === 'fulfilled') {
    //     console.log(data)

    //     const Levels = data.Levels

    //     return (
    //         <div>
    //             <h1>Admin Page</h1>

    //             <h3>Levels</h3>
    //             {Levels.map(item => (
    //                 <div key={item.id}>
    //                     <p>{item.level} Level</p>
    //                 </div>
    //             ))}
    //         </div>
    //     )

    // }

    // return (
    //     <div>
    //         <h1>Admin Page</h1>

    //         <p>Data is still loading...</p>
    //     </div>
    // )
}