import fetch from 'node-fetch';



async function getData() {
return fetch("http://localhost:8000/api/v1/")
console.log("data")
}

getData()