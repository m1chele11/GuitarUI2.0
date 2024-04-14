let guitars = [];



async function getAll() {
  let host = configuration.host();
  const headers = { 'Authorization': `Bearer ${configuration.token()}`};
  const token = getTheToken();

  let request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`


      },
    };
    let response = await fetch(host + "/inventory", request);
    console.log(response.body);
    let data = await response.json();
    return data;
  }

  async function searchGuitar() {
    let builder = document.getElementById('builder').value.toLowerCase();
    let model = document.getElementById('model').value.toLowerCase();
    let type = document.getElementById('type').value.toLowerCase();
    let backWood = document.getElementById('backWood').value.toLowerCase();
    let topWood = document.getElementById('topWood').value.toLowerCase();
  
    if (builder === '' && model === '' && type === '' && backWood === '' && topWood === '') {
      // If all input fields are empty, retrieve all guitars from the database
      console.log("CHECKKKK")
      guitars = await getAll();
      console.log(guitars);
      displaySearchResults(guitars);
      return;
    }
  
    if (guitars.length === 0) {
      guitars = await getAll();
    }
  
    let searchResults = guitars.filter(guitar => {
      return (
        (builder === '' || guitar.builder.toLowerCase().includes(builder)) &&
        (model === '' || guitar.model.toLowerCase().includes(model)) &&
        (type === '' || guitar.type.toLowerCase().includes(type)) &&
        (backWood === '' || guitar.backWood.toLowerCase().includes(backWood)) &&
        (topWood === '' || guitar.topWood.toLowerCase().includes(topWood))
      );
    });
  
    displaySearchResults(searchResults);
  }
  

function displaySearchResults(results) {
    tableBody.innerHTML = "";
  
    results.forEach(guitar => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${guitar.serialNumber}</td>
        <td>${guitar.builder}</td>
        <td>${guitar.model}</td>
        <td>${guitar.type}</td>
        <td>${guitar.backWood}</td>
        <td>${guitar.topWood}</td>
        <td>${guitar.price}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function showPopup(message) {
  // Create a pop-up element
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.classList.add("popup");
  // Append the pop-up to the body
  document.body.appendChild(popup);
  // Remove the pop-up after 3 seconds
  setTimeout(() => {
    popup.remove();
  }, 3000);


}
async function logout() {
  removeTheToken();
}