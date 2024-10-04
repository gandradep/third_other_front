import React from 'react';
import { useLocation } from 'react-router-dom';
import PerformanceForm from '../../components/performance-form/performance-form.component';

const CreatePerformance = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const showId = query.get('show_id'); // Extract show_id from URL

  return (
    <div>
      <h1>Add a performance to this show</h1>
      {/* Pass the show_id as a prop to PerformanceForm */}
      <PerformanceForm showId={showId} />
    </div>
  );
}

export default CreatePerformance;
