import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import StoreContext from '../contexts/storeContext';

const ProtectedRouter = () => {
  const { state } = useContext(StoreContext);
  if (state.userInfo) {
    return <Outlet />; // the page that is redered by react-router-dom
  } else {
    return <Navigate to="/signin"></Navigate>;
  }
};

export default ProtectedRouter;
