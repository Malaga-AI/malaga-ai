import { FaLanguage, FaShare } from 'react-icons/fa';

const Team = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">The Team</h2>
        <p className="text-xl text-center mb-12">
          Architects of the community who drive Malaga-AI's vision every day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <img src="https://via.placeholder.com/200x200?text=Adrian+Tineo" alt="Adrian Tineo" className="rounded-full mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Adrian Tineo</h3>
            <p className="mb-4">Founding Node</p>
            <div className="flex justify-center space-x-4">
              <FaLanguage className="text-2xl cursor-pointer" />
              <FaShare className="text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/200x200?text=Daniel+Avila" alt="Daniel Avila" className="rounded-full mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Daniel Avila</h3>
            <p className="mb-4">Community Manager</p>
            <div className="flex justify-center space-x-4">
              <FaLanguage className="text-2xl cursor-pointer" />
              <FaShare className="text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;