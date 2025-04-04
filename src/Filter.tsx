const Filter = ({ categories, selectedCategory, onSelectCategory }: any) => {
    return (
      <div className="filter">
        <h2>Фильтр по категории</h2>
        <select value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
          <option value="">Все</option>
          {categories.map((category: any) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export default Filter;