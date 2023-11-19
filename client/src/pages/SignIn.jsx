import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInStart, signInSuccess, signInFail } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from '../componenets/OAuth'


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // Reset error state when component mounts
    dispatch(signInFail(null));
  }, []);


  const handleCreateUser = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
    // console.log(formData);
  }
  const handleSubmit = async (e) => {
    try {
      dispatch(signInStart());
      
      e.preventDefault();
      const response = await fetch('/api/auth/signin',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      console.log(data);
      if(data.success === false){
        dispatch(signInFail(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }catch (error){
      dispatch(signInFail(error));
    }
  };

  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form action="" className='flex flex-col gap-4'
      onSubmit={handleSubmit}
      >
        <input 
        type="email" 
        placeholder='Email' 
        id='email'
        className='bg-slate-100 p-3 rounded-lg '
        onChange={handleCreateUser}
        />
        <input 
        type="password" 
        placeholder='Password' 
        id='password'
        className='bg-slate-100 p-3 rounded-lg '
        onChange={handleCreateUser}
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading' : 'SIGN IN'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t Have an Account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-500'>
            Sign up
          </span>
        </Link>
      </div>
      <p className="text-red-700 my-2">{error ? error.message || 'Something went wrong' : ""}</p>
    </div>
  )
}

export default SignIn
