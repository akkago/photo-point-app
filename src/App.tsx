import React, { useEffect, useState } from 'react';

import './App.css';
import Filter from './Filter';
import Search from './Search';

function App() {
  const [products, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const json = await response.json();
        setProduct(json);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  const categories = Array.from(new Set(products.map((product: any) => product.category)));

  const filteredProducts = products.filter((product: any) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="App">
      <div className="sidebar">
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Search
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <div key={product.id} className="product">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>Цена: ${product.price}</p>
              <img src={product.image} alt={product.title} width={236} />
            </div>
          ))
        ) : (
          <p>Продукты не найдены.</p>
        )}
      </div>
    </div>
  );

}

export default App;
