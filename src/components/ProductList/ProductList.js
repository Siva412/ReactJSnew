import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

const ProductList = props => {
    return (
        props.prodList.map(obj => (<ProductItem {...obj} key={obj.id} />))
    )
};

export default ProductList;