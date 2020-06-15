import React, { useEffect, useState } from 'react';
import axios from '../../axios/axiosConf';
import Loader from '../../UI/Loader/Loader';
import './History.css';

const History = props => {
    const [history, setHistory] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        axios.get('/history.json').then(response => {
            let historyResponse = response.data;
            let finalArr = [];
            for(let key in historyResponse){
                let modArr = historyResponse[key].itemList.map(obj => {
                    let tempObj = {...obj};
                    tempObj.purchaseDate = historyResponse[key].purchaseDate;
                    return tempObj;
                });
                finalArr = finalArr.concat(modArr);
            }
            setLoader(false);
            setHistory(finalArr);
        }).catch(err => {

        })
    }, []);
    const historyEl = history.map(el => {
        return (
            <div key={el.id} className="his-el">
                <div>Name: {el.name}</div>
                <div>Price: {el.price}</div>
                <div>Purchase date: {el.purchaseDate}</div>
            </div>
        )
    });
    return (
        <div className="dash history">
            <h4 style={{marginBottom: "15px"}}>Purchase History</h4>
            {loader?<Loader />:((history && history.length>0)?(historyEl):<div>No History</div>)}
        </div>
    )
};

export default History;