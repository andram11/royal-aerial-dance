import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllTransactions } from "../api/api";
import { GetTransactionsResponse } from "../types/types";
import { useAuth } from "./authContext";


interface TransactionsContextType {
    transactions: GetTransactionsResponse | null,
    loadingTransactions: boolean,
    errorTransactions: string | null;
    fetchTransactions: (limit: number, skip: number)=> Promise<void>
}

const TransactionsContext= createContext<TransactionsContextType | undefined>(undefined)

//custom hook
export const useTransactions= () => {
    const context= useContext(TransactionsContext)
    if (!context){
        throw new Error("useTransactions must be used within a TransactionsProvider")
    }
    return context;
}

//Transactions Provider to be used within App and make the transactions available to components using them

export const TransactionsProvider: React.FC<{children: React.ReactNode}>= ({children})=> {
    const [transactions, setTransactions]= useState<GetTransactionsResponse | null>(null)
    const [loadingTransactions, setLoadingTransactions]= useState<boolean>(true)
    const [errorTransactions, setErrorTransactions]= useState<string |null>(null)
    const {loggedIn}= useAuth()

    const fetchTransactions = async (limit: number, skip: number) => {
      if (loggedIn) {
        setLoadingTransactions(true);
        try {
          const response = await getAllTransactions(limit, skip);
          setTransactions(response);
          setLoadingTransactions(false);
        } catch (err) {
          setErrorTransactions("Failed to fetch transactions");
          setLoadingTransactions(false);
        }
      }
       
      };
    
      useEffect(() => {
        if(loggedIn){
          fetchTransactions(10,0);
        }
       
      }, [loggedIn]);

      return (
        <TransactionsContext.Provider value={{transactions, loadingTransactions, errorTransactions, fetchTransactions}}>
            {children}
        </TransactionsContext.Provider>
      )
}