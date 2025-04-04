import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import Filter from './Filter';
import Search from './Search';
import Catalog from './Catalog';
import Cart from './Cart';


function App() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Container><Typography>Загрузка...</Typography></Container>;
  }

  const categories = Array.from(new Set(products.map((product: any) => product.category)));

  const filteredProducts = products.filter((product: any) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });


  const addToCart = (product: any) => {
    setCartItems((prevItems: any) => {
      const existingItem = prevItems.find((item: any) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item: any) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };


   const removeFromCart = (id: any) => {
     setCartItems(prevItems =>
       prevItems.reduce((accumulator: any, item: any) => {
         if (item.id === id) {
           if (item.quantity > 1) {
             accumulator.push({ ...item, quantity: item.quantity - 1 });
           }
           return accumulator;
         }
         accumulator.push(item);
         return accumulator;
       }, [])
     );
   };

   return (
     <Router>
       <AppBar position="static">
         <Toolbar>
           <Typography variant="h6" style={{ flexGrow:1 }}>
             Мой Магазин
           </Typography>

           <Button color="inherit" component={Link} to="/">Каталог</Button>
           <Button color="inherit" component={Link} to="/cart">Корзина</Button>

         </Toolbar>
       </AppBar>

       <Container style={{ marginTop: '20px' }}>
         <Routes>
           <Route path="/" element={
             <>
               <Filter 
                 categories={categories} 
                 selectedCategory={selectedCategory} 
                 onSelectCategory={setSelectedCategory} 
               />
               <Search 
                 searchTerm={searchTerm} 
                 onSearchChange={setSearchTerm} 
               />
               {!loading && (
                 <Catalog products={filteredProducts} addToCart={addToCart} />
               )}
             </>
           } />
           <Route path="/cart" element={
             <>
               {!loading && (
                 <Cart cartItems={cartItems} onRemoveFromCart={removeFromCart} />
               )}
             </>
           } /> 
         </Routes>
       </Container>
     </Router >
   );
}

export default App;