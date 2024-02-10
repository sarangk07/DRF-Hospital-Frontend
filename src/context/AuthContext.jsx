import { createContext,useState,useEffect } from "react"; 
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()


export default AuthContext;



export const AuthProvider = ({children}) => {

    

    let [user,setUser] = useState(localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [authTokens,setauthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)


    const nav = useNavigate()


    let loginUser = async (e) => {
        e.preventDefault()
        try{
            console.log('form submitted!')
            // let response = fetch('http://127.0.0.1:8000/api/login/',{
            //     method:'POST',
            //     headers:{
            //         'Content-Type':'application/json'
            //     },
            //     body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
            // })
            let response = await axios.post('http://127.0.0.1:8000/api/login/',{
                username: e.target.username.value,
                password: e.target.password.value,
            })
            
            
            console.log('response--------------',response)
            
            if(response.status === 200){
                let data = response.data
                console.log("data---------------",data)
                setauthTokens(data)
                setUser(jwtDecode(data.access))
                console.log(jwtDecode(data.access))

                localStorage.setItem('authTokens', JSON.stringify(data))

                nav('/home');

            }else{
                alert("somthing went wrong!!")
            }

        }catch(error){
            console.error('Error fetching data:', error);
        }
        
    }





    let logoutUser = () => {
        const shouldLogout = window.confirm("Are you sure?");
        if (shouldLogout) {
          setauthTokens(null);
          setUser(null);
          localStorage.removeItem('authTokens');
          nav('/login');
        }
      }







    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser

    }


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



