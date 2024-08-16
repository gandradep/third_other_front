import React from 'react';

const EditShow = ({ shows, setShows }) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("You sure????");

    if(confirmDelete){
      console.log('show Deleted');
      try {
        const response = await fetch(`http://localhost:3001/shows/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          console.log('Show deleted successfully');
          setShows(shows.filter((show) => show.id !== id));
        } else {
          console.error('Failed to delete the show');
        }
      } catch (error){
        console.error('An error ocurred:', error);
      }
    }
  };
  return (
    <div>
      <h1>Edit Shows</h1>
      <ul>
        {shows.map((show, index) => {
          return (
            <li key= {index}>
              <p>{show.title}</p>
              <button>Edit</button>
              <button onClick={() => handleDelete(show.id)}>Delete</button>
            </li>
          )
        })}

      </ul>
    </div>
  );
}

export default EditShow;
