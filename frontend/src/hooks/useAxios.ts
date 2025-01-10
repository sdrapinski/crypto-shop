import axios from "axios";
import { AppContextInterface } from "../interfaces/AppContext.interface";






const useAxios = (appContext:AppContextInterface) =>{
  
    
    
    const {checkAccessToken,user,backendUrl} = appContext!
    const baseURL = backendUrl;
    
   

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