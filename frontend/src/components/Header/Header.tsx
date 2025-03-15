import { useAuth } from "../../contexts/AuthContext";
import "./Header.sass";
import { FiLogOut } from "react-icons/fi";


function Header() {
  const { logout, userName } = useAuth();

  return (
    <div className="Header position-absolut d-flex top-0 justify-content-start align-items-center">
      <div
        className="position-fixed top-0 end-0 "
        onClick={() => logout()}
      >
        <h6 className="mt-3">{userName} <FiLogOut className="logout" /></h6>
      </div>
      <div className="text text-start">
        <div className="mt-1">
          <h3>
            <img className="m-3 logo" role="logo" src="logo.png" /> {"Url Shortner"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
