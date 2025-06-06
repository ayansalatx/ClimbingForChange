import C4Clogo from '../assets/Climbing-For-Change-Logo_Green.png'

const Landing = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the C4C Team Two WebApp
      </h1>
      <p className="text-lg">
        This is a temporary page while development is underway.
      </p>

      <a href="https://www.climbingforchange.ca/" target="_blank">
        <img src={C4Clogo} alt="Climbing for Change Logo" height={300} />
      </a>
    </div>
  );
};

export default Landing;
