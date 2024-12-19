import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const fetchapidata= await fetch('http://localhost:8082/reservations');
  const finalData= await fetchapidata.json();


// console.log(finalData)

  // Place holder for functionality to work in the Stubs
  return finalData;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  console.log(reservations)
  
  const {adventure,adventureName,date,id,name,person,price,time}=reservations;
  const rBanner= document.getElementById('no-reservation-banner');
  const rtable= document.getElementById('reservation-table-parent');
  const tbodyele= document.getElementById('reservation-table');
 
  
if(reservations){
rBanner.classList.add('d-none');
reservations.forEach(element => {
  const trele=document.createElement('tr');
  const d = new Date(element.date);
  const bookdate=new Date(element.time);

  // Format the date to display only day, month, and year
  const day = d.getDate();
const month = d.toLocaleString('default', { month: 'short' }); // Short month name
const year = d.getFullYear();
const day2 = bookdate.getDate();
const month2 = bookdate.toDateString('default', { month: 'long' })
const year2 = bookdate.getFullYear();

// Combine with slashes
const formattedDate = `${day}/${month}/${year}`;


  const tdele=`
  <td>${reservations.id}</td>
    <td>${element.name}</td>
    <td>${element.person}	</td>	
    <td>${element.adventureName} </td>
    <td>${formattedDate}</td>
    <td>${element.price}</td>
    <td>${time}	</td>
      <td><a href="http://localhost:8082/adventures/detail/?adventure=${element.adventure}" class="reservation-visit-button">Visit Adventure</td>`

  trele.innerHTML= tdele;
  tbodyele.innerHTML= tbodyele.innerHTML+ tdele;
});
  
}
else{
  rBanner.classList.add('d-block');
}
 



  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
