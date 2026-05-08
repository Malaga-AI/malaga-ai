import { FaUsers, FaCalendarAlt, FaBrain, FaStar } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">About</h2>
        <p className="text-xl text-center mb-12">
          We are a dynamic ecosystem designed for AI enthusiasts, developers, and visionaries. We are not just a group; we are the central node where innovation meets practical application.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <FaUsers className="text-6xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Real Collaboration</h3>
            <p>Joint projects that are born from curiosity and grow with mutual support.</p>
          </div>
          <div className="text-center">
            <FaCalendarAlt className="text-6xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Monthly Events</h3>
            <p>Practical sessions on model training and advanced prompting techniques.</p>
          </div>
          <div className="text-center">
            <FaBrain className="text-6xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Critical Minds</h3>
            <p>Deep debates on ethics, future, and the socio-economic impact of AI.</p>
          </div>
          <div className="text-center">
            <FaStar className="text-6xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Elite Networking</h3>
            <p>Connect with the leaders shaping the technological future in the Spanish-speaking world.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;