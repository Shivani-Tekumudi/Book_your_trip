
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // getCityFromURL("?city=bengaluru") should return bengaluru
  const params =new URLSearchParams(search);
  let res=params.get('city');
  // alert(res)
return res;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
 
  const fetchadv= await fetch(`http://localhost:8082/adventures?city=${city}`);
  const finalData = await fetchadv.json();
  console.log("finaldata", finalData)
  return finalData;
}
catch(errorData){
console.error(errorData)
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  const dataele= document.getElementById('data');
  dataele.innerHTML='';

  adventures.forEach(element => {

let col=`<div class="col-lg-3 col-md-6 col-12 mb-5">
                    <div class="card border-radius-12">
                    <a href="detail/?adventure=${element.id}">
                        <div class="img position-relative">
                           <img src="${element.image}" class="adv-img-dimen">
                           <div class="position-absolute shadow cat-strip">
                           ${element.category}
                           </div>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <p>${element.name}</p>
                                <p>₹${element.costPerHead}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p>Duration</p>
                                <p>${element.duration} Hours</p>
                            </div>
                        </div></a>
                    </div>
                </div>`;

    dataele.innerHTML= dataele.innerHTML+ col;
    
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
let filteredDurationlist= list.filter((adventure)=>{
  if(adventure['duration']>low && adventure['duration']<=high){

    return true;

  }
  else{
    return false;
  }

})
return filteredDurationlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
// If the category filter is present in the filters, extract the category list from it and pass the list of adventures and category list to filterByCategory() which should return the filtered adventures that belong to any of the categories in the category list.

const filteredCategorylist = list.filter(item =>
  categoryList.includes(item.category)
);

console.log(filteredCategorylist);
return filteredCategorylist;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
let filteredlist= [];

console.log("filters from filterfunc", filters)

const {duration, category=[]} = filters;
let isDurationPresent =  duration.length;
let isCategoryPresent =  category.length;



  if(isDurationPresent && isCategoryPresent){

const durationArr= duration.split("-");
const low = durationArr[0];
const high = durationArr[1];
let filteredDurationlist= filterByDuration(list, low, high);

filteredlist= filterByCategory(filteredDurationlist, category);
    
  }

else if(isCategoryPresent){
  filteredlist= filterByCategory(list, filters['category']);
}
else if(isDurationPresent){
  alert("duration present")
  const durationArr= duration.split("-");
const low = durationArr[0];
const high = durationArr[1];
filteredlist= filterByDuration(list, low, high);

}
// else if(Number(filters['duration']) !== ''){

//   //  get value of filter[duration] // abstract low and high value from it i.e befor - value and after - value

//   let durationval= filters['duration'];
//   alert(`durationval ${durationval}`)
//   // alert(typeof(durationval)) //string '2-6'

//   // split string
//   let durationarr = durationval.split("-");
//   console.log(durationarr);
//   console.log(durationarr[0]);
//   console.log(durationarr[1]);
//   console.log(durationarr[2]);



//   filteredlist= filterByDuration();
//   alert('enteredif3')
// }
else{
  filteredlist= list;
}



  // Place holder for functionality to work in the Stubs
  return filteredlist
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
//   window.addEventListener("beforeunload", (event)=>{
// const payload= filters;
// localStorage.setItem('Qtripfilters',JSON.stringify(payload))
//   })
  localStorage.setItem('Qtripfilters',JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
//   let  savedfilters;
// document.addEventListener("DOMContentLoaded", ()=>{
// const getfilters= localStorage.getItem('Qtripfilters')
//  savedfilters =JSON.parse(getfilters);
// //  console.log(savedfilters)
// const {duration, category}=savedfilters;
// }

// )
const getfilters= localStorage.getItem('Qtripfilters');
if(getfilters){
  let savedfilters =JSON.parse(getfilters);
  const {duration, category}=savedfilters;
  return savedfilters;
}

  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

console.log(filters);
// alert(filters.duration='' || filters.category==0)
const filterarea= document.getElementById('category-list');
if(filters.duration='' && filters.category==0){
return false;
}

else{

  
 
  // const pill= document.createElement('div');

  // pill.setAttribute('class', 'pills');
  // pill.textContent=filters['category']
 filters['category'].forEach(element => {
  let pillsUi = `<div class="pills">
  <p> ${element}</p>
</div>`;    
filterarea.innerHTML=  filterarea.innerHTML +pillsUi   ;        
                        });

                        // filterarea.append(pill);
}




}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
