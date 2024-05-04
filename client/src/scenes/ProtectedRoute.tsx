import { useIsLoggedInQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

type IProtectedRouteProps = {
    user: boolean
}

const ProtectedRoute = ({
    user
  }: IProtectedRouteProps) => {
    const { data: loggedData, isLoading } = useIsLoggedInQuery();
    let [redirectPath, setRedirectPath] = useState('/');

    useEffect(() => {
        if(!isLoading) {
            if(loggedData){ 
                setRedirectPath('/');
            } else {
                setRedirectPath('/login');
            }
        }
    },[isLoading]);

    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
};

export default ProtectedRoute;