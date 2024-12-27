import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMenu = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }
  return (
    <div>
      <h1>Admin Menu</h1>
      <ul>
        <li>
          <button onClick={ () => handleNavigation('/createShow')}>Create Show</button>
        </li>
        <li>
          <button onClick={ () => handleNavigation('/editShow')}>Edit Shows</button>
        </li>
        <li>
          <button onClick={ () => handleNavigation('/createVenue')}>Create Venue</button>
        </li>
        <li>
          <button onClick={ () => handleNavigation('/editVenue')}>Edit Venue</button>
        </li>
        <li>
          <button>Edit Artist</button>
        </li>
      </ul>

    </div>
  );
}

export default AdminMenu;
