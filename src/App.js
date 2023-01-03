import { useContext } from 'react'
import {AppContext} from './context api/myContext'
import { useGetDataQuery } from "./context api/myContext"
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import AdminSign from './pages/SignIn/AdminSign'
import StudentSign from './pages/SignIn/StudentSign'
import Admin from './pages/admin/Admin'
// import Level from './pages/admin/Level'
import StudentDetails from './pages/admin/studentDetails'
import StudentLog from './pages/SignIn/studentLogin'
import './App.css';

function App() {

  const theContext = useContext(AppContext)

  const {data, status, error} = useGetDataQuery()
  // status == 'fulfilled' ? console.log(data) : console.log('loading')

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin'>
            <Route path='admin' element={<AdminSign />} />
            <Route path='student' element={<StudentSign data={data} status={status} />} />
          </Route>
          <Route path='/admin' element={<Admin data={data} status={status} />}/>
          <Route path='/login' element={<StudentLog data={data} status={status}/>}></Route>
          <Route path='/admin/:id' element={<StudentDetails data={data} status={status} />}/>
          <Route path='/dashboard/:id' element={<Dashboard data={data} status={status} />}></Route>
        </Routes>
    </div>
  );
}

export default App;
