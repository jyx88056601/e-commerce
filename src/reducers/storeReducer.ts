import { Cart, CartItem, ShippingAddress } from "../types/Cart";
import { UserInfo } from "../types/UserInfo";

export type State = {
    mode: string;
    cart: Cart;
    userInfo?: UserInfo;
  };
  
 export type Action =
    | { type: 'SWITCH_MODE' }
    | { type: 'CART_ADD_ITEM'; payload: CartItem }
    | { type: 'CART_REMOVE_ITEM'; payload: CartItem }
    | { type: 'CART_CLEAR' }
    | { type: 'USER_SIGNIN'; payload: UserInfo }
    | { type: 'USER_SIGNOUT' }
    | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
    | { type: 'SAVE_PAYMENT_METHOD'; payload: string } 
  
  // state: input: original state and actions -> new state
  function storeReducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SWITCH_MODE': //toggle based on the previous mode
        localStorage.setItem('mode', state.mode === 'dark' ? 'light' : 'dark');
        return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' };
      case 'CART_ADD_ITEM': {
        const newItem = action.payload; // newItem is waiting to be added to the cart
        const existItem = state.cart.cartItems.find(
          (item: CartItem) => item._id === newItem._id // search if this item is already in the cart
        );
  
        const cartItems = existItem
          ? state.cart.cartItems.map((item: CartItem) =>
              item._id === existItem._id ? newItem : item
            ) // if this item  exists already, we replace the old item with new item because newItem contains the quantity of this item
          : [...state.cart.cartItems, newItem]; // add this item to the cart
  
        // set the updated cartItem to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // update the state with new cartItems since it is updated
        return { ...state, cart: { ...state.cart, cartItems } };
      }
  
      case 'CART_REMOVE_ITEM': {
        const cartItems = state.cart.cartItems.filter(
          (item: CartItem) => item._id !== action.payload._id
        );
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
  
      case 'CART_CLEAR':
        return { ...state, cart: { ...state.cart, cartItems: [] } };
  
      case 'SAVE_SHIPPING_ADDRESS':
        return {
          ...state,
          cart: {
            ...state.cart,
            shippingAddress: action.payload,
          },
        };
  
      case 'SAVE_PAYMENT_METHOD':
        return {
          ...state,
          cart: { ...state.cart, paymentMethod: action.payload },
        };

      case 'USER_SIGNIN' : 
        return {
          ...state,
          userInfo: action.payload
        }   

        case 'USER_SIGNOUT' : 
        return {
           mode: window.matchMedia && window.matchMedia("(prefers-colors-scheme: dark)").matches? "dark" : "light",
           cart: {
             cartItems: [],
             paymentMethod: "Paypal",
             shippingAddress: {
                fullName: "",
                address: "", 
                postalCode: "", 
                city:"", 
                country: ""
             },
             itemsPrice: 0,
             shippingPrice: 0,
             taxPrice: 0,
             totalPrice: 0,
           }
        }   
        
      default:
        return state;
    }
  }

  export default storeReducer;