import React from "react";

const Footer = () => {
  return (
   <div className="bg-gradient-to-br from-black via-gray-900 to-black px-10 py-14 text-gray-300">

  <div className="flex flex-col md:flex-row gap-10 justify-around">

    {/* Left Section */}
    <div className="w-[520px] flex flex-col justify-end">

      <div className="flex items-center gap-2">
        <img src="https://bookoe.netlify.app/logo.svg" className="w-8 hover:rotate-12 transition duration-300" alt="" />
        <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
          Library
        </h1>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        FreePDFs is a simple and reliable platform where you can read and download PDFs for free — no sign-in, no ads, and no limits.
      </p>

      <div className="flex gap-8 mt-6">
        <img src="https://bookoe.netlify.app/lucide-Facebook-Outlined.svg" className="hover:scale-110 hover:brightness-150 transition cursor-pointer" />
        <img src="https://bookoe.netlify.app/lucide-Twitter-Outlined.svg" className="hover:scale-110 hover:brightness-150 transition cursor-pointer" />
        <img src="https://bookoe.netlify.app/lucide-Instagram-Outlined.svg" className="hover:scale-110 hover:brightness-150 transition cursor-pointer" />
        <img src="https://bookoe.netlify.app/lucide-Linkedin-Outlined.svg" className="hover:scale-110 hover:brightness-150 transition cursor-pointer" />
        <img src="https://bookoe.netlify.app/lucide-Youtube-Outlined.svg" className="hover:scale-110 hover:brightness-150 transition cursor-pointer" />
      </div>

    </div>

    {/* Categories */}
    <div className="w-[250px]">
      <h2 className="font-bold text-lg mb-4 text-yellow-400">
        📁 Books Categories
      </h2>

      <ul className="space-y-2 text-sm">
        {[
          "Thriller books",
          "Mystery books",
          "Romantic books",
          "Science books",
          "Self-help books",
          "AI & ML books",
          "Web Dev books",
          "Cyber security books"
        ].map((item, i) => (
          <li
            key={i}
            className="cursor-pointer hover:text-yellow-400 hover:translate-x-2 transition duration-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Credits */}
    <div className="w-[350px] flex flex-col justify-center">
      <h2 className="font-bold text-lg mb-4 text-yellow-400">
        ⚙️ Project Credits
      </h2>

      <ul className="space-y-3 text-sm">
        <li className="hover:translate-x-2 hover:text-yellow-400 transition">👨‍💻 Shashikant Giri - Developer</li>
        <li className="hover:translate-x-2 hover:text-yellow-400 transition">🧑‍🎨 Krit Yadav - UI/UX</li>
        <li className="hover:translate-x-2 hover:text-yellow-400 transition">💻 Frontend Development</li>
        <li className="hover:translate-x-2 hover:text-yellow-400 transition">🛠️ Backend Development</li>
        <li className="hover:translate-x-2 hover:text-yellow-400 transition">📚 Content Support</li>
      </ul>
    </div>

  </div>

  {/* Bottom */}
  <div className="border-t border-yellow-400/30 mt-10 pt-4 text-sm text-gray-500 italic">
    © 2024 <span className="text-yellow-400">Library</span>. All rights reserved.
  </div>

</div>
  );
};

export default Footer;
