let productDiv = document.querySelector("#product-div");
let cartsDiv = document.querySelector(".carts-table");
let showDiv = document.querySelector("#show-div");


// render product
async function dataFetch() {
    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();


    

   data.map((d)=>{
       
       productDiv.innerHTML += ` 
       <div class="col  ">
          <div class="card h-100 rounded-0 shadow-lg mx-3 ">
          <img src="${d.image}" style="width:40%; height: 195px;" class="mx-auto my-2 mx-2" alt="...">
          <div class="card-body">
              <h5 class="card-title">${d.title}</h5>
             
              <span class="fw-medium fs-4"> $ ${d.price}</span><br>
              <div class="card-footer mt-2 d-flex justify-content-between">
              <a href="#" class="btn btn-dark rounded-0 mt-2" onclick="addToCarts(${d.id})">Add to Cart</a>
                <p class="card-text"><i class="fa-solid fa-star text-warning mt-4 mr-2"></i>${d.rating.rate}</p>
              </div>
          </div>
          </div>
          </div>`;
   
   });
   
}


dataFetch();


// cart array
let carts = JSON.parse(localStorage.getItem('productCarts')) || [] ;

// add to cart array
async function addToCarts (id){

    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();

    if(carts.some((c)=>  c.id === id)){
      
    changeQuantity("plus",id);

    } else{
     
      let cart = data.find((d)=>{ return d.id === id; });
      carts.push({
      ...cart, quantity:1,
      });
      // console.log(cart)
      // console.log(carts)
    }
updateCarts();
}

// render products carts
function renderProductsCart() {
  // showDiv.innerText ="";
  cartsDiv.innerHTML ="";

  carts.forEach((c)=>{
   
    cartsDiv.innerHTML +=`
    <tr>
    <th class="py-1"><img src="${c.image}" style="width: 80px; height: 80px;" class="" alt="..." title="${c.title}"></th>
    <td class="py-4">$ ${c.price}</td>
    <td class="py-4">
    <i class="fa-solid fa-circle-minus" onclick="changeQuantity('minus',${c.id})" ></i> 
    ${c.quantity} 
    <i class="fa-solid fa-circle-plus" onclick="changeQuantity('plus',${c.id})"></i>
    </td>
    <td class="py-4"> <i class="fa-solid fa-trash text-danger fa-lg" onclick="removeCarts(${c.id})" ></i></td>
  </tr>`;
  });
  
  // showHide();
}

const changeQuantity =(condition,id) =>{
        carts = carts.map(c=>{
          let quantity = c.quantity;

          if(c.id === id){
            if(condition == "plus"){
             quantity++;
            }else if(condition == "minus" && quantity > 1){
               quantity--;
            }
          
          }
          return{
              ...c, quantity,
          }
        });
        updateCarts();
}

// total price and cart count
const renderNumber= ()=>{
  let totalPrice=0,totalCount =0;
  let totalprice = 0;
  carts.map((c)=>{

    totalPrice += c.price * c.quantity;

    totalprice = totalPrice.toFixed(2);
    totalCount += c.quantity;
  
  });

  document.querySelector('#totalPrice').innerText =`$ ${totalprice}`;
  document.querySelector('#totalCount').innerText =`${totalCount}`;
}

// remove carts
const removeCarts =(id)=>{


 carts = carts.filter(c => c.id !== id );


 updateCarts();

}
// to show when no cart
// const showHide =()=>{

//   if(cartsDiv.innerHTML !=1){
//     showDiv.innerHTML=`<p class="text-center fs-6"> No item in the cart</p>`;
//   }

// }

// update for everything
function updateCarts() {

  renderProductsCart();
  renderNumber();
  localStorage.setItem('productCarts',JSON.stringify(carts));

}

updateCarts();