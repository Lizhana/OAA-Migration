import { GET_NEWS } from "../../types/loader";

const initialState = {
    news: [],
};


export default function rootReducer (state= initialState, action) {
    switch (action.type) {
        //NEWS
        case GET_NEWS:
            return{
                ...state,
                news: action.payload
            };            
        default:
            return state;
    };
};
        // case 'GET_NAME_PRODUCTS':
        //         return {
        //             ...state,
        //             products: action.payload
        //         };
        // case 'POST_PRODUCT':
        //         return {
        //             ...state,
        //             products: [...state.products, action.payload],
        //             allProducts: [...state.allProducts, action.payload]
        //         };
        // case 'PUT_PRODUCT': {
        //         return {
        //             ...state,
        //         };
        //     }
        // case 'DELETE_PRODUCT': 
        //     return {
        //         ...state,
        //     };