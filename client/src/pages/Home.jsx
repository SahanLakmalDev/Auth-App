import React from 'react';
import 'animate.css';


const Home = () => {
  return (
    <div className='px-4 py-14 max-w-4xl mx-auto'>
    <h1 className='text-4xl text-center font-bold mb-4 text-slate-800'>
      Welcome to My Auth App!
    </h1>
    <div className='mt-10 bg-slate-100 p-8 rounded shadow-md'>
      <p className='mb-4 bg-white p-8 rounded shadow-md text-slate-700 animate__animated animate__fadeIn border-l-4 border-r-4 border-x-indigo-500'>
        Explore the capabilities of this robust full-stack web application crafted with the powerful MERN (MongoDB, Express, React, Node.js) stack. Seamlessly integrating front-end and back-end technologies, this app showcases comprehensive authentication features for a secure and user-friendly experience.
      </p>
      <p className='mb-4 bg-white p-8 rounded shadow-md text-slate-700 animate__animated animate__fadeIn border-l-4 border-r-4 border-x-indigo-500'>
        The front-end, developed with React, employs React Router for smooth client-side routing, ensuring a seamless and responsive user interface. On the server side, Node.js and Express handle the back-end operations, while MongoDB serves as the efficient and scalable database solution.
      </p>
      <p className='mb-4 bg-white p-8 rounded shadow-md text-slate-700 animate__animated animate__fadeIn border-l-4 border-r-4 border-x-indigo-500'>
        Leveraging the power of JSON Web Tokens (JWT), our authentication implementation ensures a high level of security. Users can easily sign up, log in, and log out, with access restricted to protected routes exclusively for authenticated users.
      </p>
      <p className='mb-4 bg-white p-8 rounded shadow-md text-slate-700 animate__animated animate__fadeIn border-l-4 border-r-4 border-x-indigo-500'>
        Whether you are a seasoned developer or just starting your journey, this application stands as an insightful template for building your own full-stack web projects. Take advantage of its structure and features to expedite your development process and create robust, scalable, and secure applications.
      </p>
    </div>
  </div>
  )
}

export default Home
