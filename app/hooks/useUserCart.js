import axios from "axios";


function useUserCart() {
          const getUserCart = async(token)=>{
        
        
        await axios.get('http://localhost:3000/api/cart/',{
                headers: {
                    'Content-Type': 'application/json',
                
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                   
                }
            
            })
            .catch((error) => {
            
                console.error('Error posting cart data:', error);
            
            });
        }
        const addUserCart = async(product,token)=>{
        const products =[product]
            const data ={ products:products}
        
        await axios.post('http://localhost:3000/api/cart/',data,{
                headers: {
                    'Content-Type': 'application/json',
                
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.error('Added item to cart sucssesfully');
                }
            
            })
            .catch((error) => {
            
                console.error('Error posting cart data:', error);
            
            });
        }
        const UpdateUserCart = async(product,token)=>{
        
        
        await axios.put('http://localhost:3000/api/cart/',product,{
             headers: {
                 'Content-Type': 'application/json',
                
                 Authorization: `Bearer ${token}`,
               },
         })
         .then((response) => {
             if (response.status === 200) {
                 console.error(' item Updated sucssesfully');
               }
          
         })
         .catch((error) => {
          
             console.error('Error posting cart data:', error);
           
         });
         }
        const DeleteUserCart = async(product,token)=>{
                const id = {productId : product.id}

            await axios.delete('http://localhost:3000/api/cart/',id,{
                headers: {
                    'Content-Type': 'application/json',
                    
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.error(' item Deleted sucssesfully');
                }
            
            })
            .catch((error) => {
            
                console.error('Error posting cart data:', error);
            
            });
        }
    return [getUserCart,addUserCart,UpdateUserCart,DeleteUserCart]
}

export default useUserCart