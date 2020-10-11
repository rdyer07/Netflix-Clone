import axios from 'axios';

// base url to make requests to the movie database

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default instance; 



// this file will do what Postman does - send requests
// we're storing the base url in a variable and we'll use that to fetch the requested data