import React from 'react';
import Header from '../components/Header';

function HomePageDoc() {
  return (
    <div>
      <Header />
      
      <div className="container mt-4">
        <h3>Doctors here</h3>
        <div className="row">
          <div className="col-md-8">
            
            {/* Add additional content here if needed */}
          </div>
          <div className="col-md-4">
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
