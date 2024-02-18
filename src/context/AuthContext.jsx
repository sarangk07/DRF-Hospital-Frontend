import { createContext,useState,useEffect } from "react"; 
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()

export default AuthContext;



export const AuthProvider = ({children}) => {


    let [user,setUser] = useState(localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [authTokens,setauthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    let [loading,setLoading] = useState(true)

    const nav = useNavigate()




    
    let loginUser = async (e) => {
        e.preventDefault()
        try{
            console.log('form submitted!')
            
            let response = await axios.post('http://127.0.0.1:8000/api/login/',{
                username: e.target.username.value,
                password: e.target.password.value,
            })
            
            if(response.status === 200){
                let data = response.data
                setLoading(false);
                console.log("data---------------",data)
                setauthTokens(data)
                

                const user = jwtDecode(data.access)
                setUser(user)
                localStorage.setItem('authTokens', JSON.stringify(data))
                console.log(jwtDecode(data.access))

                if(user.is_admin){
                  alert("Welcome Admin")
                  nav('/admin');
                }else if(user.is_doctor){
                  alert("Welcome Doctor!")
                  nav('/homeDoctor');
                } else{
                  alert("Welcome User!")
                  nav('/');
                } 
            }else{
                alert("somthing went wrong!!")
            }

         
        }catch(error){
            if (error.response.status === 401) {
              console.error('Error fetching data:', error);
              console.error('no user found!')
              alert(error.response.data.detail);
            } else { 
              alert('An error occurred while trying to log in. Please try again later.');
            }
            // alert(error)
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





    // let updateToken = async ()=> {
    //     console.log('tokenUpdate called')
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/refresh/', {
    //           refresh: authTokens?.refresh
    //         });
      
    //         let data = response.data
    //         console.log("servere response................",response);
    //         console.log(data,'token++++dataaaaaaa');
    //         if (response.status === 200) {
    //           setauthTokens(data)
    //           setUser(jwtDecode(data.access))
    //           localStorage.setItem('authTokens', JSON.stringify(data))
    //         }
      
    //         else {
    //           logoutUser()
    //         }
    //         if (loading) {
    //           setLoading(false)
    //         }
    //       }
    //       catch {
    //         console.log('error dddddddd');
    //       }
      
    //     }




    let updateToken = async (e) => {
      console.log('updateToken called');
      const refreshToken = authTokens?.refresh;

      if (!refreshToken) {
        console.log('No refresh token available.');
        return;
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/refresh/', {
          refresh: authTokens?.refresh
        });
    
        console.log('Server Response:', response);
        let data = response.data;
        if (response.status === 200) {
          setauthTokens(data);
          setUser(jwtDecode(data.access));
          localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
          console.error('Token Update Failed:', response.status, response.data);
          logoutUser();
        }
    
        if (loading) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error during token update:', error);
        console.error('Error details:', error.response);
      }
    };



    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens
    }


    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fourMinutes = 1000*60*15
        let intervel = setInterval(()=>{
            if(authTokens){
              console.log('loading,,,,,,,token,,,,,,,');
                updateToken()
            }
        },fourMinutes)
        return ()=> clearInterval(intervel)
    },[authTokens,loading])


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



