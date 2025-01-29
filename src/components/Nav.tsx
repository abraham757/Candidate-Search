import { Link, useLocation  } from 'react-router-dom';

import './Navtabs.css';




const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages

  const currentPage = useLocation().pathname;
  return (
    <nav className="nav-tabs">
    <div className="nav-container">
      <Link
        to="/"
        
        className={`nav-link ${
          currentPage === '/'
            ? 'text-lapis-500 font-bold'
            : 'text-french-500 hover:text-lapis-500'
        }`}
      >
        Home
      </Link>

      <Link
        to="/SavedCandidates"
        className={`nav-link ${
          currentPage === '/SavedCandidates'
            ? 'text-lapis-500 font-bold'
            : 'text-french-500 hover:text-lapis-500'
        }`}
      >
        Potential Candidate
      </Link>
      </div>
  </nav>
  )
};

export default Nav;
