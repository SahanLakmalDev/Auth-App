import React from 'react'

const About = () => {
  return (
    <div className='px-4 py-14 max-w-3xl mx-auto'>
    <h1 className='text-4xl text-center font-bold mb-4 text-slate-800'>
      About
    </h1>
    <div className='mt-10 bg-slate-100 p-8 rounded shadow-md'>
      <p className='mb-4 bg-white p-8 rounded shadow-md text-slate-700 animate__animated animate__fadeIn border-l-4 border-r-4 border-x-indigo-500'>
        This is a MERN (MongoDB, Express, React, Node.js) stack application with
        authentication. It allows users to sign up, log in, and log out, and
        provides access to protected routes only for authenticated users.
      </p>
      <p className='mb-4 bg-white p-8 rounded shadow-md text-slate-700 animate__animated animate__fadeIn border-l-4 border-r-4 border-x-indigo-500'>
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
      <p className='mb-4 bg-white p-8 rounded shadow-md text-slate-700 animate__animated animate__fadeIn border-l-4 border-r-4 border-x-indigo-500'>
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>
     
    </div>
  </div>
  )
}

export default About
