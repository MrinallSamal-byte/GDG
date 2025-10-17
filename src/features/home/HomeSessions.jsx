function HomeSessions() {
  return (
    <div className="home-sessions py-20 md:py-24">
      <div className="container mx-auto px-12 md:px-20 lg:px-32 xl:px-40">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="">Active Members</div>
            </div>
            <div className="">
              <div className="text-4xl font-bold text-green-800 mb-2">50+</div>
              <div className="">Events Hosted</div>
            </div>
            <div className="">
              <div className="text-4xl font-bold text-yellow-400 mb-2">20+</div>
              <div className="">Workshops</div>
            </div>
            <div className="">
              <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
              <div className="">Years Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSessions
