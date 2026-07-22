import React from 'react'
const HomePage = () => {
  return (
  <div className='flex w-full justify-between items-center h-[90vh] bg-gradient-to-br from-black to-gray-900 px-10'>

  {/* Left Content */}
  <div className='w-[45%] flex flex-col gap-6'>

    <p className='text-yellow-400 font-semibold tracking-wide'>
      📚 READ WITHOUT LIMITS
    </p>

    <h1 className='text-4xl font-bold text-white'>
      Enjoy Free Access to PDFs 
      <span className='text-yellow-400'> No Sign-In Needed</span>
    </h1>

    <p className='text-gray-400 text-[18px]'>
      Explore thousands of PDFs books, study materials, and notes —
      all free to read and download instantly.
    </p>

    <div className='flex gap-5'>
      <button className='bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition'>
        Start Reading
      </button>

      <button className='border border-yellow-400 text-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition'>
        Browse Collections
      </button>
    </div>

  </div>

  {/* Right Image */}
  <div className='w-[45%] flex justify-center'>
    <img
      src="https://bookoe.netlify.app/baner_img.jpg"
      alt=""
      className='rounded-3xl shadow-lg hover:scale-105 transition duration-500'
    />
  </div>

</div>
  )
}

export default HomePage
