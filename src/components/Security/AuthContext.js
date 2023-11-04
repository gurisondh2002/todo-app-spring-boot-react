import { createContext, useContext, useState} from "react";
import { basicAuthApi } from "../api/TodoApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    // const [number, setNumber] = useState(0);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    function login(username, password){

        const btoken = 'Basic ' + window.btoa(username + ":" + password)

        basicAuthApi(btoken)
        .then(resp =>{
            console.log(resp);
        })
        .catch(err =>{
            console.log(err);
        })

        setIsAuthenticated(false);
        // if(username === "Guri" && password === "password"){
        //     setIsAuthenticated(true)
        //     setUsername(username)
        //     return true;
        // }
        // else{
        //     setIsAuthenticated(false);
        //     setUsername(null);
        //     return false;
        // }
    }

    function logout(){
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
}

// export default AuthProvider;