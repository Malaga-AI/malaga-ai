import { FaDiscord, FaTelegram, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="w-1/2">
          <p className="text-lg mb-2">Live Activity Pulse</p>
          <h2 className="text-5xl font-bold mb-4">Malaga-AI</h2>
          <p className="text-xl mb-6">
            Join the most active AI community. A collaborative space where knowledge flows through human neural networks.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              <FaDiscord className="mr-2" /> Discord
            </a>
            <a href="#" className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              <FaTelegram className="mr-2" /> Telegram
            </a>
            <a href="#" className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="w-1/2">
          <img src="https://via.placeholder.com/600x400?text=AI+Visualization" alt="AI Visualization" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;