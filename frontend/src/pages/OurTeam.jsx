import Design from "../features/ourTeam/Design";
import JoinTeam from "../features/ourTeam/JoinTeam";
import Lead from "../features/ourTeam/Lead";
import Media from "../features/ourTeam/Media";
import PR from "../features/ourTeam/PR";
import Tech from "../features/ourTeam/Tech";

const OurTeam = () => {
  return (
    <section id="our-team" className="py-24 home-sessions ">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <Lead />
          <Tech />
          <Design />
          <PR />
          <Media />

          <JoinTeam />
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
