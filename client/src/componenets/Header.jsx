import { Link } from "react-router-dom"
import Home from "../pages/Home"

const Header = () => {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
            <Link to={'/'}>
                <h1 className='font-bold text-2xl'>Auth App</h1>
            </Link>
          
            <ul className='flex gap-4 text-base'>
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                <Link to={'/about'}>
                    <li>About</li>
                </Link>
                <Link to={'/sign-in'}>
                    <li>Sign In</li>
                </Link>
                
            </ul>
        </div>
    </div>
  )
}

export default Header
