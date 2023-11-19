import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateUser = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
    // console.log(formData);
  }
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      setError(false); 
      e.preventDefault();
      const response = await fetch('/api/auth/signin',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);
      console.log(data);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/');
    }catch (error){
      setError(true);
      setLoading(false);
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
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t Have an Account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-500'>
            Sign up
          </span>
        </Link>
      </div>
      <p className="text-red-700 my-2">{error && 'Something went wrong'}</p>
    </div>
  )
}

export default SignIn
