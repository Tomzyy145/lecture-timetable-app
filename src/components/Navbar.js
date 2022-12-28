import './navbar.css'

export default function Navbar({name, image}) {
    return (
        <div className='nav'>
            <img src={image}/>
            <h3>Welcome {name}! </h3>
        </div>
    )
}

