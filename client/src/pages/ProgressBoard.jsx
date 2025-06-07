import ProgressTable from "../components/progress/ProgressTable";
import C4CHorizontalGreenLogo from "../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png";

const ProgressBoard = () => {
  return (
    <div>
      <a href="https://www.climbingforchange.ca/" target="_blank">
        <img
          src={C4CHorizontalGreenLogo}
          alt="Climbing for Change Logo"
          height={150}
        />
      </a>
      <ProgressTable />
    </div>
  );
};

export default ProgressBoard;
