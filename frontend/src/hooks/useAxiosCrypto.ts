import axios from "axios";


const baseURL = process.env.REACT_APP_COIN_GECKO_URL!;
const apiKey = process.env.REACT_APP_COIN_GECKO_API_KEY!;

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