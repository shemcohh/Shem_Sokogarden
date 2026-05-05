import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MakePaymentComponent = () => {

    const { product } = useLocation().state || {};
    let [phone, setPhone] = useState("")

    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")

    const img_url = "https://shemriley.alwaysdata.net/static/images/"
    console.log(product);

    const handleSubmit = async (e)=> {
        e.preventDefault();

        setError("")
        setSuccess("")
        setLoading("Please wait........")

        try {
           const data = new FormData() 
           data.append("amount", product.product_cost)
           data.append("phone", phone)

           const response = await axios.post("https://shemriley.alwaysdata.net/api/mpesa_payment", data)
           console.log(response)

           if (response.status ===200) {
            setLoading("")
            setSuccess(response.data.message)
           }
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }
    return(
        <div className="row justify-content-center mt-3">
            <div className="col-md-3">
                <img src= {img_url + product.product_image} className="rounded img-thumbnail" alt="" />
                <h2>LIPA NA MPESA</h2>
            </div>
            <div className="col-md-3">
                <h2 className="text-dark">{product.product_name}</h2>
                <h5 className="text-primary">{product.product_category}</h5>
                <p className="text-muted">{product.product_Description}</p>
                <h3 className="text-warning">{product.product_cost}</h3>
                <hr />
                <h6 className="text-warning">{loading}</h6>
                <h6 className="text-danger">{error}</h6>
                <h6 className="text-success">{success}</h6>
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    className="form-control" 
                    readOnly
                    value={product.product_cost}
                    placeholder="Enter Amount"/>

                    <br />

                    <input type="tel" className="form-control"
                    required 
                    placeholder="Enter Mpesa Number 2547xxxxxxxx"
                    onChange={(e)=>{setPhone(e.target.value)}}
                    value={phone}/>
                    <br />

                    <button className="btn btn-dark">Pay Now</button>
                </form>
            </div>
           
        </div>
    );
}

export default MakePaymentComponent