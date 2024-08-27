import React from 'react';
import { Link } from 'react-router-dom';

const NavAdmin = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin">admin Menu</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavAdmin;
