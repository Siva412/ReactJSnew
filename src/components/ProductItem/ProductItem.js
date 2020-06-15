import React, { useState } from 'react';
import { withRouter } from 'react-router-dom' ;

const ProductItem = props => {
    const [img, setImg] = useState(null)
    let navigateToView = () => {
        props.history.push({
            pathname: '/view',
            hash: props.id+''
        });
    }
    import(`../../assets/images/${props.img}.jpg`).then(data => {
        setImg(data.default);
    });
    return (
        <div className="prod-item" onClick={navigateToView}>
            <div>
                <img style={{width: "100%",maxHeight:"214px"}} alt="prod-img" src={img} />
            </div>
            <div>
                <span className="title">{props.name}</span>
            </div>
            <div>Price: ${props.price}</div>
            <div>Rating: {props.rating}/5</div>
        </div>
    )
};

export default withRouter(ProductItem);