import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App';
import CartPage from '../pages/CartPage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';

// // import Layout from "../pages/Layout";
// // import Homepage from "../pages/Homepage";
// // import GameDetailPage from "../pages/GameDetailPage";
// // import ErrorPage from "./ErrorPage";

// const router = createBrowserRouter([
//   {
//     path: '/', // location
//     element: <Layout />, // content that could be insert to the position of <Outlet /> component where it is in <Layout /> after <Nav />
//     children: [
//       // contents selector
//       { path: '/', element: <Homepage /> },
//       { path: 'games/:slug', element: <GameDetailPage /> },
//     ],
//     errorElement: <ErrorPage />,
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />}></Route>
      <Route path="product/:slug" element={<ProductPage />}></Route>
      <Route path="cart" element={<CartPage />}></Route>
    </Route>
  )
);

export default router;
