const Friends = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Friends Communities</h1>
        <p className="text-xl mb-12">Collaborating with like-minded communities around the world.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Barcelona AI Group</h3>
            <p>Focused on AI research and development in Barcelona.</p>
            <a href="#" className="text-blue-600 hover:underline">Visit</a>
          </div>
          <div className="border p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Madrid Tech Hub</h3>
            <p>Tech community in Madrid promoting innovation.</p>
            <a href="#" className="text-blue-600 hover:underline">Visit</a>
          </div>
          <div className="border p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Seville Developers</h3>
            <p>Developers community in Seville.</p>
            <a href="#" className="text-blue-600 hover:underline">Visit</a>
          </div>
          <div className="border p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Global AI Network</h3>
            <p>International network of AI communities.</p>
            <a href="#" className="text-blue-600 hover:underline">Visit</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;