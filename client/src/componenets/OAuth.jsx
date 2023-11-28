import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch ('/api/auth/google', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : result.user.displayName,
          email : result.user.email,
          photoUrl : result.user.photoURL,
        })
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    }catch (error){
      console.log('Could not login with google', error);
    }
  }
  return (
    <div className='max-w-xl'>
    {/* Custom "Sign in with Google" button */}
    <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-white border rounded-lg p-3 hover:opacity-95 disabled:opacity-80 w-full flex items-center justify-center"
        style={{ padding: '12px 10px 12px 12px' }} 
      >
        <img
          className="mr-2"
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          width="20"
          height="20"
        />
        <span style={{ fontFamily: 'Roboto Medium', fontSize: '16px', color: '#1F1F1F' }}>
          Continue with Google
        </span>
      </button>
    </div>
  )
}

export default OAuth
