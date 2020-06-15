import React, { useEffect, useState } from 'react';
import axios from '../../axios/axiosConf';
import { withRouter } from 'react-router-dom';
import Loader from '../../UI/Loader/Loader';
import { connect } from 'react-redux';
import * as utilityFunc from '../../store/utility/utility';
import Toast from '../../UI/Toast/Toast';

const ProductView = props => {
    const [prodData, setprodData] = useState({});
    const [loader, setLoader] = useState(false);
    const [img, setImage] = useState(null);
    const [disableAdd, setDisableAdd] = useState(false);
    const [toast, showToast] = useState('');
    useEffect(() => {
        const prodId = props.history.location.hash.replace('#', '');
        setLoader(true);
        axios.get('/productData.json').then(response => {
            setLoader(false);
            let prodData = response.data;
            for (let i = 0; i < prodData.length; i++) {
                if (prodData[i].id == prodId) {
                    import(`../../assets/images/${prodData[i].img}.jpg`).then(data => {
                        setImage(data.default);
                    });
                    setprodData(prodData[i]);
                }
            }
        }).catch(err => {
            setLoader(false);
        });
    }, []);
    useEffect(() => {
        if(utilityFunc.checkIfItemAdded(props.currentState, prodData.id)){
            setDisableAdd(true);
        }
        else{
            setDisableAdd(false);
        }
        return () => {
            showToast('');
        }
    },[props.currentState, prodData]);
    const clickAdd = () => {
        showToast('Item Added');
        let itemObj = {
            id: prodData.id,
            name: prodData.name,
            price: prodData.price 
        }
        props.addToCart(itemObj);
    };
    const clickRemove = () => {
        props.removeFromCart(prodData.id);
        showToast('Item Removed');
    }
    return (
        <div className="dash">
            {loader ? <Loader /> : (
                <div>
                    <Toast show={toast} />
                    <div><img src={img} /></div>
                    <div>Name: {prodData.name}</div>
                    <div>Price: ${prodData.price}</div>
                    <div>Rating: {prodData.rating}</div>
                    <div>Description: {prodData.description}</div>
                    <div className="checkout-btn">
                        <button className="btn buyit-btn" disabled={disableAdd?'disabled':''} onClick={clickAdd}>Add to cart</button>
                        <button className="btn btn-secondary" disabled={!disableAdd?'disabled':''} onClick={clickRemove}>Remove Item</button>
                    </div>
                </div>
            )}

        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item) => dispatch({type: "ADD_ITEM", item}),
        removeFromCart: (id) => dispatch({type: "REMOVE_ITEM", id})
    }
}
const mapStateToProps = state => {
    return {
        currentState: state
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductView));