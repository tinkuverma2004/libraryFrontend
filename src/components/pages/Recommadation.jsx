import React from 'react'
const Recommadation = () => {
  return (
  <div className="bg-gradient-to-br from-black via-gray-900 to-black py-20 px-6 flex justify-center">

  <div className="flex flex-col lg:flex-row gap-10">

    {/* Card 1 */}
    <div className="w-[500px] bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/20 shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-2 transition duration-300 flex flex-col justify-between">

      <p className="text-gray-400 italic mb-10">
        "This site is amazing! I can read and download any PDF I need without signing in."
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://bookoe.netlify.app/person_2.png" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-semibold text-white">Amit Verma</h3>
            <p className="text-sm text-gray-500">Student Reader</p>
          </div>
        </div>

        <div className="text-yellow-400 text-xl">
          ★★★★★
        </div>
      </div>

    </div>

    {/* Card 2 */}
    <div className="w-[500px] bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/20 shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-2 transition duration-300 flex flex-col justify-between">

      <p className="text-gray-400 italic mb-10">
        "I found all my college notes and books here. No ads, no logins — just instant access."
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://bookoe.netlify.app/person_2.png" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-semibold text-white">Sneha Patil</h3>
            <p className="text-sm text-gray-500">Book Enthusiast</p>
          </div>
        </div>

        <div className="text-yellow-400 text-xl">
          ★★★★★
        </div>
      </div>

    </div>

  </div>

</div>
  )
}

export default Recommadation
