import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/signup.css'
import '../components/addproduct.css'



const AddProduct=()=>{
    let navigate = useNavigate();
    const [name,setName] = useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [company,setCompany]=useState("")
    const [error,setError] = useState(false)
    const [myerror , setMyerror] = useState(false)

    let userId2 = localStorage.getItem('user')
    userId2 = JSON.parse(userId2)
  let userId =userId2.data._id
    console.log(userId2.data._id)
 
    const handleSubmit =async()=>{
           
      if(!name || !price || !company || !category || !userId){
        setError(true);
        return false
      }else{
        setMyerror(true)
      }
         console.log(name,price,category,userId,company)
         let token = JSON.parse(localStorage.getItem('user'))
          let result = await fetch("http://localhost:5000/addproducts",{
            method : 'post',
            body: JSON.stringify({name,price,category,userId,company}),
            headers:{
               'Content-Type':'application/json',
               authorization : token.auth
            }
            
        });
        result = await result.json();
      //  alert("successflully added")
      navigate("/")
        console.log(result)
        

    }
      return (
        <div className='register'>
            <h1>Add Product</h1>
            <input type="text" placeholder="enter product name"    value={name}    onChange={(e)=> setName(e.target.value)}></input>
            { error && !name && <span className='name'> Enter Valid name </span>}
            <input type="text" placeholder="enter Product price"   value={price}   onChange={(e)=> setPrice(e.target.value)}></input>
            { error && !price && <span className='name'> Enter Valid setPrice </span>}
            <input type="text" placeholder="enter Product category"value={category}onChange={(e)=> setCategory(e.target.value)}></input>
            { error && !category && <span className='name'> Enter Valid Category </span>}
            <input type="text" placeholder="enter Product comapney"value={company} onChange={(e)=> setCompany(e.target.value)}></input>
            { error && !company && <span className='name'> Enter Valid Company </span>}
            { myerror && <span className='name'> data saved successflully </span>}
            <button type="submit" className='appButton' onClick={handleSubmit}>Add Product</button>
        </div>
      )
 }

 export default AddProduct
