import HeroSection from "../../components/sections/shop/heroSection";
import MainContainer from "../../components/layout/mainContainer";
import Products from "../../components/sections/shop/products";

const GetProducts = async () => {
  try {
    const response = await fetch(
      `https://depot-project.vercel.app/api/products`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
async function Shop() {

  const products = await GetProducts();

  return (
    <>
      <HeroSection />
      <MainContainer>
        <Products products={products} />
      </MainContainer>
    </>
  );
}

export default Shop;
