import React from 'react';
import ShowForm from '../../components/show-form/show-form.component';

const CreateShow = ({shows}) => {

  return (
    <div >
      <h1>Create new Show</h1>
      <ShowForm shows={shows}/>
    </div>
  );
}

export default CreateShow;