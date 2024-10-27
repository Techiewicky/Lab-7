const xhrSearchBtn = document.getElementById("xhrSearch") 
xhrSearchBtn.addEventListener("click", searchUsingXHR)
const fetchSearchBtn = document.getElementById("fetchSearch")
const fetchAsyncAwaitBtn = document.getElementById("fetchAsyncAwaitSearch")


const searchQuery = document.getElementById("queryInput")
const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY= "QJGULTHM76HBFxxvCHh3bkqMErpe8wQlcNGr6z5RbiE";

// search using XMLHTTPRequest
function searchUsingXHR() { 
    let queryTerm = searchQuery.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL + "?query=" + queryTerm)
    xhr.setRequestHeader("Authorization","Client-ID "+ACCESS_KEY)
    xhr.onreadystatechange = ()=>{
    if(xhr.readyState === 4 && xhr.status === 200){
        let responseText=xhr.responseText;
        let responseObj= JSON.parse(responseText);
        createImages(responseObj);
    }
    }



    xhr.send();

}

fetchSearchBtn.addEventListener("click", searchUsingFetch);

function searchUsingFetch() {
    let queryTerm = searchQuery.value.trim();
    fetch(`${API_URL}?query=${queryTerm}`, {
        headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => createImages(data))
    .catch(error => console.error("Error:", error));
}

fetchAsyncAwaitBtn.addEventListener("click", searchUsingFetchAsyncAwait);

async function searchUsingFetchAsyncAwait() {
    let queryTerm = searchQuery.value.trim();
    try {
        const response = await fetch(`${API_URL}?query=${queryTerm}`, {
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`
            }
        });
        const data = await response.json();
        createImages(data);
    } catch (error) {
        console.error("Error:", error);
    }
}


function createImages(data){
    const resultsElem= document.getElementById("results")
    for(let item of data.results){
        let imgElem = document.createElement("img");
        imgElem.src = item.urls.small;
        imgElem.alt = item.alt_description;
        resultsElem.appendChild(imgElem);
    }


}