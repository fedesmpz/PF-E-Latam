//se recibe por parametro el usuario, el token se lee del localStorage

const validateToken = async (user) =>{
    const tokenString = localStorage.getItem("token");
    const response = await axios.post('http://localhost:8000/users/validateToken', user, 
    {headers: {
        authorization: tokenString,
    }})

    return response.data;
}

export default validateToken