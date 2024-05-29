import React from 'react';

const Home = ({shows}) => {

  return (
    <div >
      <h1>List of Shows</h1>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>
            {show.title} - {show.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
