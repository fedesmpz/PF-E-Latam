//se recibe por parametro el usuario, el token se lee del localStorage
import axios from 'axios'

const validateToken = async () =>{
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        if (Object.keys(user).length === 0) {
            return false;
        }
        const tokenString = JSON.parse(localStorage.getItem("token"));
        const response = await axios.post('https://pf-elatam.onrender.com/users/validateToken', user,
        {headers: {
            authorization: tokenString,
        }})
        const resp = response.data.validate
        return resp;
    }catch(error){
        console.log(error.message);
    }
}

export default validateToken