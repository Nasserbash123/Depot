import MainContainer from "../components/layout/mainContainer";
import HeroSection from "../components/sections/home/heroSection";
import ProductCard from "../components/widgets/productCard";
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

export default async function Home() {
 
 
  const products = await GetProducts();
 
  return (
    <>
      <HeroSection />
      <MainContainer>
        <main>
          <div className="sm:grid lg:grid-cols-4 mt-10  md:grid-cols-3  sm:grid-cols-2  gap-8">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  mainImage={product.mainImage}
                  description={product.description}
                  galleryimages={product.galleryimages}
                />
              );
            })}
          </div>
        </main>
      </MainContainer>
    </>
  );
}
