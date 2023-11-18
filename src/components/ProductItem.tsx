import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import Rating from './Rating';
import { CartItem } from '../types/Cart';
import { convertProductToCartItem } from '../utils';
import StoreContext from '../contexts/storeContext';
interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;
  const addToCartHandler = (item: CartItem) => {
    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('Sorry, Product is out of stock');
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default ProductItem;
