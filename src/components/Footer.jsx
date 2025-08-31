// src/components/Footer.jsx
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#c94118] p-5 w-full  flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left">
        <h1 className="font-cursive text-3xl text-black">Movie Station</h1>
        <p className="text-sm mt-2">
          Made by <a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/nahom-zewdie-207176200"  className="text-blue-600">Nahom Zewdie</a>
        </p>
      </div>
      <p className="text-sm mt-4 md:mt-0">&copy; Movie Station 2025</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/nahom-zewdie-207176200" className="text-black hover:text-gray-700 text-lg">
          <FaLinkedin />
        </a>
        <a target='_blank' rel="noreferrer" href="https://github.com/NahomZewdie" className="text-black hover:text-gray-700 text-lg">
          <FaGithub />
        </a>
        <a target='_blank' rel="noreferrer" href="https://x.com/@NahomZewdie3" className="text-black hover:text-gray-700 text-lg">
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
