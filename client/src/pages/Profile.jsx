import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { updateUserStart, updateUserFail, updateUserSuccess, deleteUserStart, deleteUserFail, deleteUserSuccess, signOut } from "../redux/user/userSlice";
import Modal from "react-modal";

const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector(state => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  console.log(imageError);
  console.log(formData);
  console.log(imagePercent);
  console.log(image);
  console.log(error);

  useEffect(() => {
    const auth = getAuth(app); // Add this line

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the currentUser in Redux or local state
      // This might trigger a re-render and fetch the updated profile picture
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if(image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const stroage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(stroage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setImagePercent(Math.round(progress));
        console.log(image.size);
      },
      (error) => {
        setImageError(true);
      },
      ()=> {
        setImageError(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL }));
      }
    );

  };
  const handleUpdate = (e)=> {
    setFormData({...formData, [e.target.id] : e.target.value});
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFail(data));
        return;
      };
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      

    }catch(error){
      dispatch(updateUserFail(error));
    }
  };

   // Function to open the delete confirmation modal
   const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

 const handleDelete = async (e) => {
    e.preventDefault();

    // Open the delete confirmation modal
    openDeleteModal();
  };

  const confirmDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFail(data));
      }
      dispatch(deleteUserSuccess(data));

      // Close the modal after successful deletion
      closeDeleteModal();
    } catch (error) {
      dispatch(deleteUserFail(error));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOut());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
    
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className="flex flex-col gap-4 justify-center cursor-pointer rounded-full" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
        <img src={formData.profilePicture || currentUser.profilePicture} alt="profile" className="h-24 w-24 self-center mb-4 rounded-full" onClick={() => fileRef.current.click()} />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
        defaultValue={currentUser.username} 
        type="text" 
        id="username" 
        placeholder="Username" className="bg-slate-100 rounded-lg p-3"
        onChange={handleUpdate}
        />
      
        <input
        defaultValue={currentUser.email} 
        type="email" 
        id="email" 
        placeholder="Email" className="bg-slate-100 rounded-lg p-3"
        onChange={handleUpdate}
        />

        <input 
        type="password" 
        id="password" 
        placeholder="Password" className="bg-slate-100 rounded-lg p-3"
        onChange={handleUpdate}
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Loading...' : 'Update'}
      </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Delete Confirmation"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content p-4 bg-white rounded">
            <p className="mb-4 text-center">Are you sure you want to delete your account?</p>
            <div className="flex justify-center">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-400">
                Delete
              </button>
              <button onClick={closeDeleteModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
        </div>
        </Modal>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className="text-green-700 mt-5">{updateSuccess && 'User updated sucessfully'}</p>
    </div>
  )
}

export default Profile
