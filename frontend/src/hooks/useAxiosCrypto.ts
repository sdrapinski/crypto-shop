import axios from "axios";


const baseURL = "https://api.coingecko.com/api/v3";
const apiKey = "CG-vzU3EaiofQxbZ9GoJR1pTxTV";

const useAxiosCrypto = () =>{
    
   

    const axiosInstance = axios.create({
        baseURL,
        headers : {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
    })

    axiosInstance.interceptors.request.use(async req=>{
       
        return req
    })
    return axiosInstance
}

export default useAxiosCrypto