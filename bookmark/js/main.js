//Get HTML Elements
var websiteName = document.getElementById('website-name')
var websiteUrl = document.getElementById('website-url')
var tableBody = document.getElementById('table-body')
var validationAlert = document.getElementById('validation')
var websites = []

//Get the data from local storage when refresh the page 
if(localStorage.getItem("websites") != null){
    websites = JSON.parse(localStorage.getItem("websites"))
    displayData()
}

//Add the items when click 
function addWebsite(){
    var website = {
        name: websiteName.value,
        url: websiteUrl.value
    }
    // check if the input values are valid
    if(isValidUrl(website.url) && website.name.length > 3){
        
        for(var i = 0; i < websites.length; i++){
            if(website.name == websites[i].name){
                websites.splice(i,1)
            }
        }
    
        websites.push(website)
        localStorage.setItem("websites" , JSON.stringify(websites))
    
        clearValues()
        displayData()
    }else {
        validationAlert.style.display = "block"
    }
}

//Display the data on the DOM
function displayData(){
    var container = ``
    for(var i = 0; i < websites.length; i++){
        container+=
        `
        <tr>
            <td>${i+1}</td>
            <td>${websites[i].name}</td>
            <td>
                <button class="visit">
                    <a href="${websites[i].url}" target = "_blank"><i class="fa-solid fa-eye"></i>Visit</a>
                </button>
            </td>
            <td>
                <button onclick="deleteItem(${i})" class="delete">
                    <i class="fa-sharp fa-solid fa-trash"></i>Delete
                </button>
            </td>
        </tr>
        `
    }
    tableBody.innerHTML = container
}

//Delete btn
function deleteItem(index){
    websites.splice(index,1)
    localStorage.setItem("websites",JSON.stringify(websites))
    displayData()
}

//Remove the values from the input fields
function clearValues(){
    websiteName.value = ""
    websiteUrl.value = ""
}

//Url validation
var isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

//Close the validation alert
function closeAlert() {
    validationAlert.style.display = "none"
}
