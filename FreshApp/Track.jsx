import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Header from "./Header";
import Food from "./Food";

export default function Track() {

  const userLoggedData=useContext(AuthContext);
  // console.log(userLoggedData);

  const [foodItems,setFoodItems]=useState([]);

  const [food,setFood]=useState(null);

  const [searchQuery,setSearchQuery]=useState("");

  // useEffect(()=>{
  //   console.log(food);
  // })

  function searchFood(event){
    const query=event.target.value;
    setSearchQuery(query);

    if(query.length!==0){
      fetch(`http://localhost:8000/foods/${query}`,{
        method:"GET",
        headers:{
           Authorization:`Bearer ${userLoggedData.userLoggedIn.token}`
        }
       
      })
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        if(data.message===undefined){
          setFoodItems(data)
          // console.log(data);
        }
        else{
          setFoodItems([])
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    }
    else{
      setFoodItems([])
    }
  }

  function handleClick(foodItems){
    setFood(foodItems);
    setFoodItems([]);
    setSearchQuery("");
  }


  return (
    <>
      <section className="section track">
        <Header/>
        <div className="search">
          <input className="inp-form" type="search" value={searchQuery}
           onChange={searchFood}
          placeholder="Enter Food"/>
         
         {
            foodItems.length!==0?(
              <div className="search-display">
  
                {
                  foodItems.map((food)=>{
                    return(
                      <p className="food" onClick={()=>{

                        handleClick(food)
                      }}
                       key={food._id}>{food.name}</p>
                    )
                  })
                }
              </div>
            ):(null)
          }
         
        </div>

        {
          food!==null?( 
          <Food food={food}/>
        ):(
          null
        )
        }

       

        

        {/* <Logout /> */}
      </section>
    </>
  );
}
