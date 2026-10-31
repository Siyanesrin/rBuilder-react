import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Info from './pages/Info'
import Saved from './pages/Saved'
import Download from './pages/Download'
import View from './pages/View'
import Pnf from './pages/Pnf'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';



function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/resume' element={<Resume/>} />
        <Route path='/resume-details' element={<Info/>} />
        <Route path='/all-resumes' element={<Saved/>} />
        <Route path='/resume/:id' element={<View/>} />
        <Route path='/downloads' element={<Download/>} />
        <Route path='/*' element={<Pnf/>} />
      </Routes>
      <Footer />
       <ToastContainer position="top-center" autoClose={5000} theme="colored" />
    </>
  )
}

export default App
