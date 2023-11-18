import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username'className='bg-slate-100 p-3 rounded-lg '/>
        <input type="email" placeholder='Email' id='email'className='bg-slate-100 p-3 rounded-lg '/>
        <input type="password" placeholder='Password' id='password'className='bg-slate-100 p-3 rounded-lg '/>
        <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>SIGN UP</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
        
      </div>
    </div>
  )
}

export default SignUp
