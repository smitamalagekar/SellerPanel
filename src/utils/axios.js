import axios from "axios"

const instance = axios.create({
    // baseURL: "https://e-commerce-backend-5oow.onrender.com/api",
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://e-commerce-backend-1-0.onrender.com/api",
    withCredentials: true
})

export default instance 

// import axios from "axios"

// const apiInstance = axios.create({
//     // baseURL: "https://e-commerce-backend-5oow.onrender.com/api",
//     // baseURL: "http://localhost:5000/api",
//     baseURL: "https://e-commerce-backend-1-0.onrender.com/api",
//     withCredentials: true
// })

// export default apiInstance 