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




    
    // let loginUser = async (e) => {
    //     e.preventDefault()
    //     try{
    //         console.log('form submitted!')
    //         let response = await axios.post('http://127.0.0.1:8000/api/login/',{
    //             username: e.target.username.value,
    //             password: e.target.password.value,
    //         })
            
            
    //         console.log('response--------------',response)
            
    //         if(response.status === 200){
    //             let data = response.data
    //             console.log("data---------------",data)
    //             setauthTokens(data)
    //             setUser(jwtDecode(data.access))
    //             console.log(jwtDecode(data.access))
    //             localStorage.setItem('authTokens', JSON.stringify(data))

    //             if(!user.is_blocked){
    //               nav('/home');
    //             }else{
    //               alert('user is not active! contact the admin!')
    //             }
    //         }else{
    //             alert("somthing went wrong!!")
    //         }

    //     }catch(error){
    //         if (error.response.status === 401) {
    //           console.error('Error fetching data:', error);
    //           console.error('no user found!')
    //           alert(error.response.data.detail);
    //         } else { 
    //           alert('An error occurred while trying to log in. Please try again later.');
    //         }
    //     }    
    // }






    let loginUser = async (e) => {
      e.preventDefault();
      try {
          console.log('form submitted!');
          let response = await axios.post('http://127.0.0.1:8000/api/login/', {
              username: e.target.username.value,
              password: e.target.password.value,
          });
  
          console.log('response--------------', response);
  
          if (response && response.status === 200) {
              let data = response.data;
              console.log("data---------------", data);
              setauthTokens(data);
              setUser(jwtDecode(data.access));
              console.log(jwtDecode(data.access));
              localStorage.setItem('authTokens', JSON.stringify(data));
  
              if (!user.is_blocked) {
                  nav('/home');
              } else {
                  alert('user is blocked! contact the admin!');
              }
          } else {
              alert("something went wrong!!");
          }
  
      } catch(error) {
          if (error.response && error.response.status === 401) {
              console.error('Error fetching data:', error);
              console.error('no user found!');
              alert(error.response.data.detail);
          } else {
              alert('An error occurred while trying to log in. Please try again later.');
          }
      }
  };
  







    let logoutUser = () => {
        const shouldLogout = window.confirm("Are you sure?");
        if (shouldLogout) {
          setauthTokens(null);
          setUser(null);
          localStorage.removeItem('authTokens');
          nav('/login');
        }
      }





    let updateToken = async ()=> {
        console.log('tokenUpdate called')
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/refresh/', {
              refresh: authTokens?.refresh
            });
      
            let data = response.data
      
      
            if (response.status === 200) {
              setauthTokens(data)
              setUser(jwtDecode(data.access))
              localStorage.setItem('authToken', JSON.stringify(data))
            }
      
            else {
              logoutUser()
            }
            if (loading) {
              setLoading(false)
            }
          }
          catch {
            console.log('error');
          }
      
        }
    








    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser

    }






    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fourMinutes = 1000*60*4
        let intervel = setInterval(()=>{
            if(authTokens){
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



