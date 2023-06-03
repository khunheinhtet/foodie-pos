import Layout from "./Layout";

const MenuCategories = () => {
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/menu_categories");
  };
  fetchData();
  return (
    <Layout title="MenuCategories">
      <div>
        <h2>This is MenuCategories Page</h2>
      </div>
    </Layout>
  );
};

export default MenuCategories;
