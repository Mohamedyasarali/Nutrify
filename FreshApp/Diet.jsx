import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
export default function Diet(){
    const userLoggedData=useContext(AuthContext);
    // console.log(userLoggedData);

    const [dietItems,setDietItems]=useState([]);

    useEffect(()=>{
        fetch(`http://localhost:8000/track/${userLoggedData.userLoggedIn.userid}/8-6-2024`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${userLoggedData.userLoggedIn.token}`
        }
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            // console.log(data);
            setDietItems(data)
        })
        .catch((err)=>{
            console.error(err);
        })
    })
    return(
        <>
        <section className="section diet">
            
            {
                dietItems.map((item)=>{
                    return(
                        <div className="item" key={item._id}>
                            <h3>{item.foodId.name}</h3>
                            
                        </div>
                    )
                })
            }
        </section>
        </>
    )
}