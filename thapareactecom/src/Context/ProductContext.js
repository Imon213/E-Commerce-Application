import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useReducer } from 'react';
import reducer from '../reducer/ProductReducer';

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
}

const  AppProvider=({children})=> {
    const [state, dispatch] = useReducer(reducer, initialState);
    const GetProducts = async (url) => {

        dispatch({ type: "SET_LOADING" });

        try {
            const res = await axios.get(url);
            const products = await res.data;
            
            dispatch({ type: "SET_API_DATA", data: products });
        } catch (error) {
            dispatch({ type: "SETERROR" });
        }
    }
    const getSingleProduct = async (url) => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
          const res = await axios.get(url);
          const singleProduct = await res.data;
          dispatch({ type: "SET_SINGLE_PRODUCT", data: singleProduct });
        } catch (error) {
          dispatch({ type: "SET_SINGLE_ERROR" });
        }
      };
    useEffect(()=>{
        GetProducts(API);
    },[]);

    return (
        <AppContext.Provider value={{...state, getSingleProduct}}>
            {children}
        </AppContext.Provider>
    )
}
const useProductContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider, AppContext, useProductContext };
