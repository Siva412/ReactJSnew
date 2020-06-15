import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Checkout.module.css';
import axios from '../../axios/axiosConf';
import Loader from '../../UI/Loader/Loader';

const Checkout = props => {
    const [loader, setLoader] = useState(false);
    let element = <div>No items added</div>;
    let purchaseItem = () => {
        setLoader(true);
        let currentDate = new Date();
        let reqData = {
            itemList: [...props.prodList],
            purchaseDate: currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear()
        };
        axios.post('/history.json', reqData).then(response => {
            setLoader(false);
            props.clear();
            alert("successful");
        });
    };
    if (props.prodList && props.prodList.length > 0) {
        let totalPrice = 0;
        let tableEl = props.prodList.map((item, i) => {
            totalPrice = +item.price + totalPrice;
            return (
                <div key={item.id} className={classes.divTableRow}>
                    <div className={classes.divTableCol}>{i + 1}</div>
                    <div className={classes.divTableCol}>{item.name}</div>
                    <div className={classes.divTableCol}>{item.price}</div>
                    <div className={classes.divTableCol}><span className={classes.closeIcon} onClick={() => (props.remove(item.id))}>X</span></div>
                </div>
            );
        });
        element = (
            <React.Fragment>
                <div className={classes.divTable}>
                    <div className={classes.divTableRow + ' ' + classes.divTableHeaderRow}>
                        <div className={classes.divTableCol}>S.no</div>
                        <div className={classes.divTableCol}>Product name</div>
                        <div className={classes.divTableCol}>Price</div>
                        <div className={classes.divTableCol}>Action</div>
                    </div>
                    {tableEl}
                </div>
                <div className={classes.TotalPrice}><b>Total price: {totalPrice}</b></div>
                <div>
                    {loader ? <Loader /> : <button className="btn buyit-btn" onClick={purchaseItem}>Purchase</button>}
                </div>
            </React.Fragment>
        )
    }
    return (
        <div className={classes.Checkout}>
            <div>
                <h3>Your Cart</h3>
            </div>
            {element}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        prodList: state.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        remove: (id) => dispatch({ type: "REMOVE_ITEM", id }),
        clear: () => dispatch({type: "CLEAR_ITEMS"})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);