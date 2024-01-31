import { useState } from "react";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProducts, deleteProduct } from "../../services/productService";
import Pagination from "../pagination/Pagination";
import ProductAdd from "../productadd/Productadd";

function UserProducts() {

const [userProducts, setUserProducts] = useState()
const [productIdToUpdate, setProductIdToUpdate] = useState('')
const [updateRequest, setUpdateRequest] = useState('')

const {authToken} = useContext(AppContext);
const navigate = useNavigate();
const [showDisplayForm, setShowDisplayForm] = useState(false);
let {id} = useParams()

useEffect(()=>{
  if(!authToken){
    navigate('/login')
  }
}, [authToken])

useEffect(()=>{
  if(authToken){
     getUserProducts(authToken, id).then(data=>setUserProducts(data))
    
  }
}, [id, updateRequest])

  const handleCreateProduct = () =>{
    setProductIdToUpdate('')
    setShowDisplayForm(true);
  }

  const handleUpdateProduct = (productId) =>{
    setProductIdToUpdate(productId)
    setShowDisplayForm(true);

  }

  const requestUpdate = () =>{
    console.log("request happened")
    setUpdateRequest(!updateRequest)
  }

  const handleDeleteProduct = (productId) =>{
    deleteProduct(authToken, productId).then(getUserProducts(authToken, id).then(data=>setUserProducts(data)))
    requestUpdate()
  }

  const handleCloseDisplayForm = () => {
      setShowDisplayForm(false);
  };

return (
  <div className="container-fluid">
    <ProductAdd show={showDisplayForm} handleClose={handleCloseDisplayForm} authToken={authToken} productIdToUpdate={productIdToUpdate} requestUpdate ={requestUpdate}/>
  <div className="mt-3 ml-3 container">
    <button type="button" className="btn btn-primary" onClick={handleCreateProduct}>Pridėti produkta</button>
  </div>
  <div className="overflow-x-auto container">
  <table className="table mt-3">
    <thead className="thead-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Vardas</th>
        <th scope="col">Aprašymas</th>
        <th scope="col">Kaina</th>
      </tr>
    </thead>
    <tbody>
      {userProducts? 
        userProducts.data.data.map((productData)=>
        <tr key={productData.id}>
          <td>{productData.id}</td>
          <td>{productData.title}</td>
          <td>{(productData.description, 10)}</td>
          <td>{productData.price} &euro;</td>
          <td><button className="btn btn-primary w-100" onClick={() => {handleDeleteProduct(productData.id)}}>Pašalinti</button></td>
          <td><button className="btn btn-primary w-100" onClick={() => {handleUpdateProduct(productData.id)}}>Atnaujinti</button></td>
        </tr>)
        :
        <tr><td><div></div></td></tr>
      }
    </tbody>
  </table>
  </div>
  {userProducts? 
    <Pagination pageAmount = {userProducts.data.last_page} currentPage = {id} linkWord = {'userproducts'}/>
    :
    <div></div>
  }
  </div>
  
);
}

export default UserProducts;
