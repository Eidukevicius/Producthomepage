import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { getProductById, uploadProduct, updateProduct } from '../../services/productService';
import { validateProductInput } from '../../helpers/InputValidation';

const ProductAdd = ({ show, handleClose, authToken, productIdToUpdate, requestUpdate}) => {

    const [formProductData, setFormProductData] = useState(
        {
            "title": '',
            "price": '',
            "image": '',
            "description": ''
        }
    )

    const handleChange = (event) =>{
        if (event.target.name === 'image') {
            setFormProductData({
                ...formProductData,
                [event.target.name]: event.target.files[0]
            });
        }
        else{
            let { name, value } = event.target;
            setFormProductData({
            ...formProductData,
            [event.target.name]:value
        })
        }
        
    }

    useEffect(()=>{
        if(productIdToUpdate){
            getProductById(authToken, productIdToUpdate).then(data=>{
                let formData = {
                    "title": data.data.title,
                    "price": data.data.price,
                    "image": data.data.image_url,
                    "description": data.data.description
                }
                setFormProductData(formData)
            })
        }
        else{
            setFormProductData({
                "title": '',
                "price": '',
                "image": '',
                "description": ''
            })
        }
      }, [productIdToUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        if(productIdToUpdate){
            
            updateProduct(authToken, formProductData,productIdToUpdate).then(requestUpdate())
        }
        else{
            console.log("trying to upload with this body:")
            console.log(formProductData)
            uploadProduct(authToken, formProductData).then(requestUpdate())
        }
        
        handleClose()
    };

    useEffect(()=>{

    },[formProductData])

    let [isInputInvalid, invalidFieldKey, invalidInputMessage] = validateProductInput(formProductData)

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <form className='form' onSubmit={submitHandler}>
                <div className="mb-3">
                    <input name="title" id="title" className="form-control" placeholder="Produkto pavadinimas" value={formProductData.title} onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <input name="price" id="price" className="form-control" placeholder="Produkto kaina" value={formProductData.price} onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    {formProductData.image?<img className='center' src={formProductData.image}></img>: <></>}
                    <input type='file' name="image" id="image" className="form-control" placeholder="Įkelkite produkto vaizdą" onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <input name="description" id="description" className="form-control" placeholder="Prekės aprašymas" value={formProductData.description} onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <button className={"btn btn-primary w-100" + (isInputInvalid ? " disabled" : "")} type="submit">{productIdToUpdate? "Atnaujinti" : "Prideti produkta"}</button>
                </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

export default ProductAdd