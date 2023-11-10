import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductItem from '../components/ProductItem';
import useGetProductsQuery from '../hooks/productsHooks';
import { ApiError } from '../types/ApiErr';
import { getError } from '../utils';

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(products);
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>Store Homepage</title>
      </Helmet>

      {products?.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
          <ProductItem product={product}></ProductItem>
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
