import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux';
import { Dropdown, Image} from 'react-bootstrap';
import { logout } from '../../actions/userActions';


export default function Header () {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items:cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = () => {
      dispatch(logout);
      navigate('/')
    }


    return (
    <nav className="navbar row">
        <div className="col-12 col-md-2">
          <div className="navbar-brand">
            <Link to="/">
              <img width="200px" alt='SnapKart Logo' src="/images/SnapKart-logo.png" />
            </Link>
            </div>
        </div>
  
        <div className="col-12 col-md-6 mt-2 mt-md-0">
           <Search/>
        </div>
  
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          { isAuthenticated ? 
            (
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                      <Image width="40px" src={user.avatar ?? './images/default_avatar.png'}  />
                    </figure>
                    <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark' ><i className="fa-solid fa-chart-line"></i>&nbsp;Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'><i className="fa-solid fa-user"></i>&nbsp;Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'><i className="fa-solid fa-cube"></i>&nbsp;My Orders</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger' ><i className="fa-solid fa-right-from-bracket"></i>&nbsp;Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            )
          
          :
            <Link to="/login"  className="btn" id="login_btn">Login</Link>
          }
          <Link to="/cart">
          <span className="btn" id="cart-btn">
          <span id="cart" >Cart</span>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </span>
          </Link>
        </div>
    </nav>
    )
}