import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react"


export default function Food(props){
    // console.log(props.food.protein);

    const userLoggedData=useContext(AuthContext);
   //  console.log(userLoggedData);

    const [eatenQuantity,setEatenQuantity]=useState(100);
    const [food,setFood]=useState([]);
    const [foodInitial,setFoodInitial]=useState({});

   //  console.log(foodInitial);

    useEffect(()=>{
        setFood(props.food)
        setFoodInitial(props.food)
    },[props.food])


    function calculateMacros(event){
      if(event.target.value.length!==0){
         let quantity=Number(event.target.value)
         setEatenQuantity(quantity);
         // console.log(quantity);


         let deepCopy={...food}
         // console.log(deepCopy.protein);
         // console.log(deepCopy);
         // console.log(food);
         // console.log(foodInitial);
   
         deepCopy.protein=(foodInitial.protein*quantity)/100;
         deepCopy.carbohydrates=(foodInitial.carbohydrates*quantity)/100;
         deepCopy.calories=(foodInitial.calories*quantity)/100;
         deepCopy.fat=(foodInitial.fat*quantity)/100;
         deepCopy.fiber=(foodInitial.fiber*quantity)/100;

         // console.log(deepCopy);
         setFood(deepCopy)
      }
    }

     function trackItems(){
         let trackFood={
            userId:userLoggedData.userLoggedIn.userid,
            foodId:food._id,
            details:{
               protein:food.protein,
               carbohydrates:food.carbohydrates,
               calories:food.calories,
               fat:food.fat,
               fiber:food.fiber
            },
            quantity:eatenQuantity
         }
         // console.log(trackFood);


         fetch("http://localhost:8000/track",{
            method:"POST",
            body:JSON.stringify(trackFood),
            headers:{
               "Authorization":`Bearer ${userLoggedData.userLoggedIn.token}`,
               "Content-Type":"application/json"
            }
         })
         .then((response)=>{
            return response.json()
         })
         .then((data)=>{
            console.log(data);
         })
      } 
    
    return(
        <>
        <div className="food-results">
           <div className="food-img">
            <img className="img" src={food.imageUrl}/>
           </div>

           <h4>{food.name} ({food.calories} Kcal for {eatenQuantity}Gm)</h4>

           <div className="food-nutrient">
              <div className="f-nutri1">
                <div className="nutrient">
                     <p className="n-title">Proteins</p>
                     <p className="n-value">{food.protein}g</p>
                  </div>
       
                  <div className="nutrient">
                     <p className="n-title">Carbohydrates</p>
                     <p className="n-value">{food.carbohydrates}g</p>
                  </div>
              </div>
  
              <div className="f-nutri2">
                <div className="nutrient">
                     <p className="n-title">Fats</p>
                     <p className="n-value">{food.fat}g</p>
                  </div>
       
                  <div className="nutrient">
                     <p className="n-title">Fiber</p>
                     <p className="n-value">{food.fiber}g</p>
                  </div>
              </div>
            </div>

           <div className="food-track">
            <input className="inp-form" type="number" onChange={calculateMacros}
            placeholder="Enter Quantity in Gms"/>
            <button className="btn foodbtn" onClick={trackItems}>Track</button>
           </div>
        </div>
        </>
    )
}