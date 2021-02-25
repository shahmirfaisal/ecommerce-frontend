let history;

const setHistory = (historyObj) => (history = historyObj);

const filterProducts = (products, filter) => {
  if (filter == "All") return products;
  return products.filter((product) => product.category.name == filter);
};

export { history, setHistory, filterProducts };
