import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllUsers } from "../api/api";
import { GetUsersResponse } from "../types/types";
import { useAuth } from "./authContext";


interface UsersContextType {
    users: GetUsersResponse | null,
    loadingUsers: boolean,
    errorUsers: string | null;
    fetchUsers: (limit: number, skip: number)=> Promise<void>
}

const UserContext= createContext<UsersContextType | undefined>(undefined)

//custom hook
export const useUsers= () => {
    const context= useContext(UserContext)
    if (!context){
        throw new Error("useUsers must be used within a UsersProvider")
    }
    return context;
}


export const UsersProvider: React.FC<{children: React.ReactNode}>= ({children})=> {
    const [users, setUsers]= useState<GetUsersResponse | null>(null)
    const [loadingUsers, setLoadingUsers]= useState<boolean>(true)
    const [errorUsers, setErrorUsers]= useState<string |null>(null)
    const {loggedIn}= useAuth()


    const fetchUsers = async (limit: number, skip: number) => {
      if (loggedIn) {
        setLoadingUsers(true);
        try {
          const response = await getAllUsers(limit, skip);
          setUsers(response);
          setLoadingUsers(false);
        } catch (err) {
          setErrorUsers("Failed to fetch users");
          setLoadingUsers(false);
        }
      }

      };
    
      useEffect(() => {
        fetchUsers(10,0);
      }, [loggedIn]);

      return (
        <UserContext.Provider value={{users, loadingUsers, errorUsers, fetchUsers}}>
            {children}
        </UserContext.Provider>
      )
}