import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [openBasic, setOpenBasic] = useState(false);
  let nav = useNavigate()

  console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrheader',user)
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>CLE-Hospital</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
              
              {user && user.is_admin ? <Link to='/admin'>Home</Link> : (user && user.is_doctor ? <Link to='/homeDoctor'>Home</Link> : <Link to='/'> Home </Link>)}


              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBNavbarNav className='justify-content-end' style={{ width: '100%' }}>
            <MDBNavbarItem>
            <MDBNavbarLink  tabIndex={-1} aria-disabled='true'>
              
            {(() => {
              if (user && user.is_doctor) {
                return <Link to='/userPage'>Profile</Link>;
              }
              else if(user && !user.is_doctor){
                return <Link to='/userPage'>Profile</Link>;
              }
              else if(!user){
                return <p>Gust</p>;
              }
              else {
                return ;
              }
            })()}

              
            </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tabIndex={-1} aria-disabled='false'>
                {user ? <a onClick={logoutUser}>Logout</a> : <Link to='/login'>Login</Link>}
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
