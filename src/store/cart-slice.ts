import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
       addToCart(
        state, 
        action: PayloadAction<{id:string, title: string, price: number}>
       ){
        //find the item id
        const itemIndex  = state.items.findIndex(
            (item)=>item.id === action.payload.id
        );
        //if found just increment quantity
        if (itemIndex>=0) {
            state.items[itemIndex].quantity++;
        }else{
            // add the item and initialize quantity to 1
            state.items.push({...action.payload, quantity: 1});
        }
       }, 
       removeFromCart(
            state, 
            action: PayloadAction<string>
       ){
        // find the item id
        const itemIndex = state.items.findIndex(
            (item)=>item.id === action.payload
        );
        //remove the index
        if (state.items[itemIndex].quantity === 1) {
            state.items.splice(itemIndex, 1); //starts with itemIndex, delete only 1 item
        } else {
            state.items[itemIndex].quantity--;
        }
       },
    },
});

const { addToCart, removeFromCart} = cartSlice.actions;//destructure function required before export
export {cartSlice, addToCart, removeFromCart};