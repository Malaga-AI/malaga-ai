const Events = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Previous Events</h1>
        <div className="space-y-8">
          <div className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">AI Workshop 2024</h2>
            <p className="text-gray-600 mb-2">Date: October 15, 2024</p>
            <p>Hands-on session on machine learning basics.</p>
          </div>
          <div className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Ethics in AI Discussion</h2>
            <p className="text-gray-600 mb-2">Date: September 20, 2024</p>
            <p>Debate on ethical implications of AI development.</p>
          </div>
          <div className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Networking Meetup</h2>
            <p className="text-gray-600 mb-2">Date: August 10, 2024</p>
            <p>Connect with fellow AI enthusiasts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;