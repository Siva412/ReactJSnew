export const getCartCount = state => {
    return state.cartItems.length;
}

export const checkIfItemAdded = (state, id) => {
    let tempArr = state.cartItems.filter(item => {
        return item.id == id
    });
    return (tempArr.length > 0);
}

export const totalPrice = (state) => {
    let total = 0;
    state.cartItems.map(item => {
        total = +item.price + total;
    });
    return total;
}