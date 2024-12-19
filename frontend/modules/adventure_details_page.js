import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params= new URLSearchParams(search);
 
const res= params.get('adventure');

  // Place holder for functionality to work in the Stubs
  return res;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
const fetchurl = await fetch(`http://localhost:8082/adventures/detail/?adventure=${adventureId}`);
const finalData= await fetchurl.json(); console.log("finaldata", finalData)

return finalData;
  }
  catch(errorData){
    console.error(errorData)
  }


  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  console.log(adventure)
  const nameele= document.getElementById('adventure-name');
  const subtitlele= document.getElementById('adventure-subtitle');
   const galele= document.getElementById('photo-gallery');
   const conele= document.getElementById('adventure-content')
  
    
   const {available,content,costPerHead,images,name,reserved,subtitle}= adventure;
   nameele.textContent= name;
   subtitlele.textContent = subtitle;
   conele.textContent = content;
   images.forEach(element => {

  const container= document.createElement('div');
  container.setAttribute("class", "col-12 col-md-12");
   container.innerHTML= `<img src="${element}" alt="img" class="activity-card-image"/>`;

  galele.append(container);
});

// galele.innerHTML= addBootstrapPhotoGallery(images) 



}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const galele= document.getElementById('photo-gallery');

 
  galele.innerHTML= `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
  

  const carouseInnerele= document.getElementById('carousel-inner');

  images.forEach((element,idx) => {

    const containerEle= document.createElement('div');
    // containerEle.setAttribute("class", `"col-12 col-md-6 col-sm-3 ${idx ==0 ?' active': ''}"`);
    containerEle.className=`col-12 col-md-6 col-sm-3 carousel-item ${idx ===0 ?"active":''}`;
    containerEle.innerHTML= `<img src="${element}" alt="img" class="activity-card-image"/>`;
  
     carouseInnerele.append(containerEle);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
 const {available,costPerHead}= adventure;
 const rsoldoutele= document.getElementById('reservation-panel-sold-out');
 const rformele= document.getElementById('reservation-panel-available');
 const rcostele= document.getElementById('reservation-person-cost');


  if(available){
    rsoldoutele.setAttribute('class','d-none');
    rformele.setAttribute('class','d-block');
    rcostele.textContent=costPerHead;

  }
  else{
    rformele.setAttribute('class','d-none');
    rsoldoutele.setAttribute('class','block');
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const {costPerHead}=adventure;
  //costPerHead* persons
  const rcostele= document.getElementById('reservation-cost');
  rcostele.textContent= costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const formele= document.getElementById('myForm');
 const adventureId= adventure.id
formele.addEventListener("submit", (event)=>{
  event.preventDefault();
  const form= event.target;
  const name= form.elements['name'].value;
  const date= form.elements['date'].value;
  const person=form.elements['person'].value;

  const formdetails={
    name,
    date,
    person,
    adventure:adventureId

  }
  console.log(formdetails);

// send form values to backend using fetch
const backendurl='http://localhost:8082/reservations'
  try{
    fetch("http://localhost:8082/reservations/new", {
  method: 'POST',
  headers: {
'Content-Type': 'application/json'
  },
  body: JSON.stringify(formdetails)

})
 alert("success");
// location.reload();
}
catch(errorData){
  alert("failed");
console.error(errorData);
  
}

})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const isavailable =adventure.available;
  const bannerele= document.getElementById('reserved-banner')
  if(isavailable){
    // bannerele.classList.add('d-block')
  }

  else{
    // bannerele.setAttribute('class','d-block');
    bannerele.classList.add('d-block')
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
