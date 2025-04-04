const Search = ({ searchTerm, onSearchChange }: any) => {
    return (
      <div className="search">
        <h2>Поиск</h2>
        <input
          type="text"
          placeholder="Введите название продукта..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    );
  };

  export default Search;