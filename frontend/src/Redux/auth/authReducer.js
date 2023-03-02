import { LOGIN_FAILURE, LOGIN_LOADING, LOGIN_SUCCESS, SIGNOUT } from "./authActionTypes";

const token = localStorage.getItem("token") || "";
const role = localStorage.getItem("role") || "";
const userName = localStorage.getItem("userName") || "";

const initialState = {
    isAuth : false,
    isLoading : false,
    isError : false,
    token : token,
    role : role,
    userName : userName,
    name : ""
}

const authReducer = (state= initialState , {type , payload}) => {
switch(type){
    case LOGIN_LOADING :
        return {
            ...state,
            isError : false,
            isLoading : true
        };
        
        case LOGIN_SUCCESS :
            localStorage.setItem("token" , payload.token);
            localStorage.setItem("role" , payload.role);
            return {
                ...state,
                isError : false,
                isLoading : false,
                isAuth : true,
                token : payload.token,
                role : payload.role,
                name : payload.name
            }
            case LOGIN_FAILURE :
                return {
                    ...state,
                    isError : true,
                    isLoading : false
                }
                case SIGNOUT :
                    localStorage.removeItem("token");
                    localStorage.removeItem("role")
                    return {
                        ...state,
                        isAuth : false,
                        token : "",
                        role : "",
                        name : ""
                    }
                    default : return state
}
}