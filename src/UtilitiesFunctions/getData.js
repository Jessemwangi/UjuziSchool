import axios from "axios";
// const jwt ='86ece9d6543317153f14c0c6e090592195ccb740a9e1462ef8a23634681fbe8d4eb05fdb0dcddad3027a51b3c6c465b7e618450bbfeb09a2ac788689d5e3f7419c6edfd15475757f1e85ab7ec1404aee8087c4f6cca04f1b49cd1effbbf36399b69e0a28945eec59302fd5dd6309af7aa934eee7b0544bb95baabfbfc773309b'

 const getAll = async (baseUrl) =>{
    const {data} = await axios.get(baseUrl)
        // console.log(data)
    return data;

}
const postData = async (url, postObject) => {

try {
        console.log(postObject)
        const { data } = await axios.post(url, postObject);
        console.log('our data after loging',data)
        return data;
} catch (error) {
    console.log(error.response.data.error)
   return error?.response?.data?.error
}
  };
const exported = {getAll, postData};
export default exported;
