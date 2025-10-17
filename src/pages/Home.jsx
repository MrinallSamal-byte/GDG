import HomeAbout from "../features/home/HomeAbout";
import HomeFirstPage from "../features/home/HomeFirstPage";
import HomeInfoPage from "../features/home/HomeInfoPage";
import HomeLbc from "../features/home/HomeLbc";
import HomeOurWork from "../features/home/HomeOurWork";
import HomeSessions from "../features/home/HomeSessions";

const HomeSection = () => {
  return (
    <section className="home-sessions">
      <div className="relative">
        <HomeFirstPage />
        <HomeLbc />
      </div>
      <HomeInfoPage />
      {/* About Us Section */}
      <div className="py-16  container mx-auto px-12 md:px-20 lg:px-32 xl:px-40 ">
        <div>
          <HomeAbout />
          <HomeOurWork />
        </div>
      </div>
      {/* Stats Section */}
      <HomeSessions />
    </section>
  );
};

export default HomeSection;
