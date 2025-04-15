import axios from "axios";

const axiosAPI=axios.create({
    withCredentials:true,
    baseURL:"http://localhost:8080/api"
});

axiosAPI.interceptors.request.use(
    config=>{
        const token=localStorage.getItem("accessToken");
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>Promise.reject(error)
);

axiosAPI.interceptors.response.use(
    config=>config,

    async error=>{
        const originalRequest=error.config;
        if(error.response.data.status===403 && !originalRequest._retry){
            originalRequest._retry=true;
            try {
                const {data}=await axiosAPI.get("/auth/refresh");
                localStorage.setItem("accessToken",data.accessToken);
                originalRequest.headers['Authorization']=`Bearer ${data.accessToken}`;
                return axiosAPI.request(originalRequest);
            } catch (error) {
                console.log(error);
                localStorage.removeItem("accessToken");
                window.location.href="/auth"
            }
        }
    }
);
export default axiosAPI;