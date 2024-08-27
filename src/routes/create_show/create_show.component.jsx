import React from 'react';
import ShowForm from '../../components/show-form/show-form.component';
import NavAdmin from '../../components/nav-admin/nav-admin-component';

const CreateShow = ({shows}) => {

  return (
    <div >
      <NavAdmin />
      <h1>Create new Show</h1>
      <ShowForm shows={shows}/>
    </div>
  );
}

export default CreateShow;