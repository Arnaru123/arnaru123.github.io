import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const NavBar: FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Start</Link>
          </li>
          <li>
            <Link to={`/favorite`}>Favorite</Link>
          </li>
          <li>
            <Link to={`/charList`}>All chars</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>

  );
};
