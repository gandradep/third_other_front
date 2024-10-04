import React from 'react';

const PerformanceForm = ({ showId }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const performanceData = {
      description: event.target.description.value,
      url_picture_show: event.target.url_picture_show.value,
      show_id: showId, // Use showId prop here
    };

    try {
      const response = await fetch('/api/performances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceData),
      });

      if (response.ok) {
        // Handle success (e.g., redirect to another page)
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="description" placeholder="Performance Description" required />
      <input type="text" name="url_picture_show" placeholder="Performance Picture URL" />
      <button type="submit">Create Performance</button>
    </form>
  );
};

export default PerformanceForm;
