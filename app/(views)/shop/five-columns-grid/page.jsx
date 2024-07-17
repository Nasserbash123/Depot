
import MainContainer from "../../../components/layout/mainContainer";
import ProductCard from "../../../components/widgets/productCard";
import HeroSection from "../../../components/sections/shop/heroSection";


const GetProducts = async () => {
  try {
    const response = await fetch(`https://depot-project.vercel.app/api/products`,{ 
      next: {
        revalidate: 60
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
async function FourColumnsGrid() {

  const products = await GetProducts()
  return (
    <MainContainer>
        <HeroSection/>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 p-5 gap-5  ">
        {
           products.map((product)=>{
               return(
                <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                mainImage={product.mainImage}
                description={product.description}
                galleryimages={product.galleryimages}
                />
               )
            })
          }
        </div>

    </MainContainer>
    
  )
}

export default FourColumnsGrid
