import "./Header.sass";

function Header() {
  return (
    <div className="Header position-absolut d-flex top-0 justify-content-start align-items-center">
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
