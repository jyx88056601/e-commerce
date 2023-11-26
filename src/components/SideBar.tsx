import { useContext, useState } from 'react';
import { ListGroup, Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../contexts/storeContext';
import { useGetCategoriesQuery } from '../hooks/productsHooks';
import { ApiError } from '../types/ApiErr';
import { getError } from '../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const SideBar = () => {
  const {
    state: { mode },
  } = useContext(StoreContext);
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  return (
    <>
      <div className="sub-header">
        <div className="d-flex">
          <Link
            to="#"
            className="nav-link header-link p-1"
            onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
          >
            <i className="fas fa-bars"></i> All
          </Link>
          {['Todays Deal', 'Gifts', 'On Sale'].map((x) => (
            <Link
              key={x}
              className="nav-link header-link p-1 px-3"
              to={`/search?tag=${x}`}
            >
              {x}
            </Link>
          ))}
        </div>
      </div>

      {sideBarIsOpen && (
        <div
          onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}

      <div
        className={
          sideBarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Categories</strong>
              <Button
                variant={mode}
                onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSideBarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
    </>
  );
};

export default SideBar;
