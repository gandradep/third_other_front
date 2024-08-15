import React from 'react';

const EditShow = ({ shows }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("You sure????");

    if(confirmDelete){
      console.log('show Deleted');
      console.log(id);
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
