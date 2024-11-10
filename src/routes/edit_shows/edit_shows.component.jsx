import React, { useState } from 'react';
import NavAdmin from '../../components/nav-admin/nav-admin-component';
import moment from 'moment-timezone';

const EditShow = ({ shows, setShows, refreshShows }) => {
  const [editingShow, setEditingShow] = useState(null);

  const handleEdit = (show) => {
    setEditingShow({ ...show });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingShow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/shows/${editingShow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ show: editingShow }),
      });
      if (response.ok) {
        await refreshShows();
        setEditingShow(null);
      } else {
        console.error('Failed to update the show');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCancel = () => {
    setEditingShow(null);
  };

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
      <NavAdmin />
      <h1>Edit Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {editingShow && editingShow.id === show.id ? (
              <form onSubmit={handleSave}>
                <input
                  type="text"
                  name="title"
                  value={editingShow.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
                <br />
                <input
                  type="text"
                  name="description"
                  value={editingShow.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <br />
                <input
                  type="text"
                  name="url_flyer"
                  value={editingShow.url_flyer}
                  onChange={handleChange}
                  placeholder="Flyer URL"
                />
                <br />
                <input
                  type="text"
                  name="show_recording_link"
                  value={editingShow.show_recording_link}
                  onChange={handleChange}
                  placeholder="Recording Link"
                />
                <br />
                <input
                  type="datetime-local"
                  name="event_date"
                  value={new Date(editingShow.event_date).toISOString().slice(0, -1)}
                  onChange={handleChange}
                />
                <br />
                <select
                  id="time_zone"
                  name="time_zone"
                  value={editingShow.time_zone}
                  onChange={handleChange}
                >
                  {moment.tz.names().map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
              </form>
            ) : (
              <>
                <h2>{show.title}</h2>
                <p><strong>Description:</strong> {show.description}</p>
                <p><strong>Flyer URL:</strong> {show.url_flyer}</p>
                <p><strong>Recording Link:</strong> {show.show_recording_link}</p>
                <p><strong>Event Date:</strong> {new Date(show.event_date).toLocaleString('en-US', { timeZone: show.time_zone })}</p>
                <p><strong>Time Zone:</strong> {show.time_zone}</p>
                <p><strong>Venue:</strong> {show.venue ? show.venue.name : 'Unknown Venue'}</p>
                <button onClick={() => handleEdit(show)}>Edit</button>
                <button onClick={() => handleDelete(show.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditShow;
