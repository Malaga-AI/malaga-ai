const Sponsors = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Our Sponsors</h1>
        <p className="text-xl mb-12">We are grateful to our sponsors for supporting the Malaga-AI community.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center border p-6 rounded-lg">
            <img src="https://via.placeholder.com/200x100?text=Sponsor+1" alt="Sponsor 1" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">TechCorp</h3>
            <p>Supporting AI innovation.</p>
          </div>
          <div className="text-center border p-6 rounded-lg">
            <img src="https://via.placeholder.com/200x100?text=Sponsor+2" alt="Sponsor 2" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">AI Solutions</h3>
            <p>Partner in AI education.</p>
          </div>
          <div className="text-center border p-6 rounded-lg">
            <img src="https://via.placeholder.com/200x100?text=Sponsor+3" alt="Sponsor 3" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Innovate Labs</h3>
            <p>Fueling community growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;