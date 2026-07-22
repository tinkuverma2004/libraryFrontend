import React from 'react'
const Descpription = () => {
  return (
   <div className="bg-gradient-to-br from-black via-gray-900 to-black py-20 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* Card */}
    <div className="bg-white/5 backdrop-blur-lg border border-yellow-400 rounded-2xl p-6 text-center shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-2 transition duration-300">
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-400/10 p-3 rounded-full">
          <img src="https://bookoe.netlify.app/access.svg" className="h-8 w-8  brightness-200" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">📚 Instant Access</h3>
      <p className="text-gray-400 text-sm">
        Start reading instantly without waiting or downloading.
      </p>
    </div>

    {/* Card */}
    <div className="bg-white/5 backdrop-blur-lg border border-yellow-400 rounded-2xl p-6 text-center shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-2 transition duration-300">
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-400/10 p-3 rounded-full">
          <img src="https://bookoe.netlify.app/person.png" className="h-8 w-8 brightness-200" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">🔒 No Sign-In Needed</h3>
      <p className="text-gray-400 text-sm">
        Access everything without creating an account.
      </p>
    </div>

    {/* Card */}
    <div className="bg-white/5 backdrop-blur-lg border border-yellow-400 rounded-2xl p-6 text-center shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-2 transition duration-300">
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-400/10 p-3 rounded-full">
          <img src="https://bookoe.netlify.app/pdf.svg" className="h-8 w-8  brightness-200" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">💎 High Quality PDFs</h3>
      <p className="text-gray-400 text-sm">
        Clean and well-formatted PDFs for better reading.
      </p>
    </div>

    {/* Card */}
    <div className="bg-white/5 backdrop-blur-lg border border-yellow-400 rounded-2xl p-6 text-center shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-2 transition duration-300">
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-400/10 p-3 rounded-full">
          <img src="https://bookoe.netlify.app/free_book.png" className="h-8 w-8  brightness-200" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">🌐 Completely Free</h3>
      <p className="text-gray-400 text-sm">
        Read and download books anytime for free.
      </p>
    </div>

  </div>
</div>
  )
}

export default Descpription
