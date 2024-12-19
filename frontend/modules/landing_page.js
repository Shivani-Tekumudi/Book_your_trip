import config from "../conf/index.js";

async function init() {
  // alert("sdfsdfsef");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
console.log("this is from init")
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
 
}

//Implementation of fetch call
async function fetchCities() {
 
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
const fetchCity= await fetch('http://localhost:8082/cities');
const finalCitydata= await fetchCity.json();
console.log(finalCitydata)
return finalCitydata;

  // init();
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const datadiv= document.getElementById('data');
  let coldata= `<div class="col-lg-3 col-md-6 col-12 mb-4">
                    <div class="card border-radius-12 position-relative">
                        <a href="pages/adventures/?city=${id}" id="${id}">
                            <img class="img-dimen" src="${image}">
                            <div class="card-body position-absolute img-text">
                                <h5>${city}</h5>
                                <p >${description}</p>
                            </div>
                        </a>
                    </div>
                </div>`;
  datadiv.innerHTML= datadiv.innerHTML+coldata;

}

export { init, fetchCities, addCityToDOM };
