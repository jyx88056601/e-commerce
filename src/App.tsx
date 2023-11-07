import './App.css';
import sampleProducts from './data';

function App() {
  return (
    <>
      <header>X Store</header>
      <main>
        <ul>
          {sampleProducts.map((product) => (
            <li key={product.slug}>
              <img
                alt={product.name}
                src={product.image}
                className="product-image"
              ></img>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </main>
      <footer>All right reserved</footer>
    </>
  );
}

export default App;
