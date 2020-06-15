const initState = {
    cartItems: []
}

const cartReducer = (state = initState, actions) => {
    switch(actions.type){
        case "ADD_ITEM":
            let tempItems = [...state.cartItems];
            tempItems.push(actions.item);
            return {cartItems: tempItems};
        case "REMOVE_ITEM":
            let tempItemsRemove = state.cartItems.filter(item => {
                return item.id != actions.id;
            });
            return {cartItems: tempItemsRemove};
        case "CLEAR_ITEMS":
            return initState;
        default:
            return state;

    }
}

export default cartReducer;