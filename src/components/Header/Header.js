import React, { useContext } from 'react';
import './Header.css';
import icon from '../../assets/images/cart.png';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import context from '../../context/context';

const Header = props => {
    const contextData = useContext(context);
    const goToHome = () => {
        props.history.push('/dashboard');
    }
    const goToCheckout = () => {
        props.history.push('/checkout');
    }
    const logout = () => {
        props.clear();
        contextData.setIsLoggedOut();
    }
    return (
        <div className="app-header">
            <div className="row">
                <div className="col-md-1"><span onClick={goToHome} style={{
                    background: `url(${icon})`,
                    display: 'inline-block',
                    height: '30px',
                    width: '30px',
                    backgroundSize: '200%',
                    backgroundPosition: 'center',
                    cursor: 'pointer'
                }}></span></div>
                <div className="col-md-8"><h4>Buy It...</h4></div>
                <div className="col-md-3">
                    {contextData.isLoggedIn ? (
                        <div>
                            <span className="cart-item" onClick={goToCheckout}>Items in cart: {props.cartItems.length}</span>
                            <span className="cart-item" onClick={() => { props.history.push('/history') }}>History</span>
                            <span className="logoutbtn" onClick={logout}>Logout</span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
const matchStatetoProps = state => {
    return {
        cartItems: state.cartItems
    }
}
const matchDispatchToProps = dispatch => {
    return {
        clear: () => dispatch({ type: "CLEAR_ITEMS" })
    }
}
export default connect(matchStatetoProps, matchDispatchToProps)(withRouter(Header));