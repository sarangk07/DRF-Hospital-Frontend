import React from 'react';
import Header from '../components/Header';

function HomePageDoc() {
  return (
    <div className='container'>
      <Header />
      
      <div className="container ">
        
        <div className="row">
          <div className="col-md-4">
          <h3>Doctors here</h3>
          </div>
          <div className="col-md-4 bg-primary">
          <img src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg?w=826&t=st=1708166060~exp=1708166660~hmac=b7fe7d8be04ea0ecf58cb0a8d1f1f7bf7149a57042f0e65f2bfd300e9bee4a73" alt=""  style={{width:'50vh',height:'35vh',objectFit:"cover"}}/>

            
          </div>
          <div className="col-md-4 bg-warning">
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">Upcoming Appointments</h5>
                {/* Add content for upcoming appointments */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageDoc;
