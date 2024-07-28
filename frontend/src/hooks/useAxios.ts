import axios from "axios";
import { AppContextInterface } from "../interfaces/AppContext.interface";




const baseURL = process.env.REACT_APP_BACKEND_URL!;

const useAxios = (appContext:AppContextInterface) =>{
  
    
    
    const {checkAccessToken,user} = appContext!
    
   

    const axiosInstance = axios.create({
        baseURL,
        headers : {Authorization: `Bearer ${user?.user_access_token}`}
    })

    axiosInstance.interceptors.request.use(async req=>{
     
        
        const isExpiredAccess = await checkAccessToken()
       
        return req
    })
    return axiosInstance
}

export default useAxios