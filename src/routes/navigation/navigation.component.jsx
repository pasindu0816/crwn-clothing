import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector.js";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles.jsx';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate('/'); // Redirect to home after sign out
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo" />
        </LogoContainer>
        
        <NavLinks>
          <NavLink to='/shop'>
              SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={handleSignOut}>SIGN OUT</NavLink>
          ) : ( 
          <NavLink to='/auth'>
              SIGN IN
          </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}     
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
