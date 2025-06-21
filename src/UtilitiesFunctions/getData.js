import axios from "axios";
 const getAll = async (baseUrl) =>{
    const {data} = await axios.get(baseUrl)
        
    return data;

}
const postData = async (url, postObject) => {

try {
        const { data } = await axios.post(url, postObject);
        return data;
} catch (error) {
   
   return error?.response?.data?.error
}
  };
const exported = {getAll, postData};
export default exported;
