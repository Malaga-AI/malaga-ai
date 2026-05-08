const Community = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">The Community</h2>
          <p className="text-xl">
            Thousands of faces, one passion. Our strength lies in the diversity of our members, from senior researchers to self-taught curious minds.
          </p>
        </div>
        <div className="flex justify-center space-x-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">12k+</div>
            <div className="text-lg">Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">450</div>
            <div className="text-lg">Projects</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="https://via.placeholder.com/400x300?text=Community+Meetup" alt="Community Meetup" className="rounded-lg shadow-lg mb-4" />
            <h4 className="text-xl font-semibold">Meetups Madrid 2024</h4>
            <p>Community Session</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/400x300?text=Podcast+Recording" alt="Podcast Recording" className="rounded-lg shadow-lg mb-4" />
            <p>Podcast Recording</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/400x300?text=Work+Environment" alt="Work Environment" className="rounded-lg shadow-lg mb-4" />
            <p>Work Environment</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/400x300?text=Education" alt="Education" className="rounded-lg shadow-lg mb-4" />
            <p>Education</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;