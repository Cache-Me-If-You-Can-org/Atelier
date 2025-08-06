import Overview from './Overview.jsx'

export default function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get('/products')
         .then(res => setProducts(res.data))
         .catch(err => console.log('failed to get products', err));
  }, []);

  return (
    <div className="app">
      Our App!!
      <Overview product={products[0]}/>
    </div>
  )
};