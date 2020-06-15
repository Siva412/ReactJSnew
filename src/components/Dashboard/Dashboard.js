import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList/ProductList';
import axios from '../../axios/axiosConf';
import Loader from '../../UI/Loader/Loader';
import InfoModal from '../../hoc/InfoModal';

const Dashboard = props => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [showModal, setModal] = useState({flag: false, message: ""});
    const closeModal = () => {
        setModal({flag: false, message: ""});
    }
    let prodList = [];
    useEffect(() => {  
        setLoader(true)      ;
        axios.get('/products.json').then(response => {
            setLoader(false);
            let responseData = response.data;
            for (let key in responseData) {
                setProducts(responseData[key]);
            }
        }).catch(err => {
            setLoader(false);
            setModal({flag: true, message: "Server Error"});
        })
    }, []);
    return (
        <InfoModal showModal={showModal} modalClosed={closeModal}>
        <div className="dash">            
            {/* <Backdrop />
            <Modal /> */}
            {loader?<Loader />:null}
            <div></div>
            <div className="prod-div">
                <ProductList prodList={products}></ProductList>
            </div>
        </div>
        </InfoModal>
    );
}

export default Dashboard;