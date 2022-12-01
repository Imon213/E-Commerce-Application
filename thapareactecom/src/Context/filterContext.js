import { createContext, useEffect } from "react";
import { useReducer } from "react"
import { useContext } from "react"
import { useProductContext } from "./ProductContext";
import reducer from "../reducer/fllterReducer";
const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    list_view: false,
    sort_data: "lowest",
    filters:{
      text: "",
    }
}
export const FilterContextProvider = ({children}) => {
    const {products} = useProductContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView = () => {
        return dispatch({ type: "SET_GRID_VIEW" });
      };
      const setListView = () => {
        return dispatch({ type: "SET_LIST_VIEW" });
      };
      const sorting = () => {
        return dispatch({ type: "SET_SORT_DATA" });
      };
      const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
    
        return dispatch({ type: "UPDATE_FILTERS_VALUE", data: { name, value } });
      };
     
      
      useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", data: products });
      }, [products]);
      useEffect(()=>{
        dispatch({ type: "SORTING_PRODUCTS", data:state.filter_products});
      },[state.sort_data])
    
      return (
        <FilterContext.Provider
          value={{ ...state, setGridView, setListView, sorting, updateFilterValue }}>
          {children}
        </FilterContext.Provider>
      );
    };
    
    export const useFilterContext = () => {
      return useContext(FilterContext);
    };
