const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: action.data,
        all_products: action.data,
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
        list_view: false,
      };
    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
        list_view: true,
      };
    case "SET_SORT_DATA":
      let sort = document.getElementById('sort');

      return {
        ...state,
        sort_data: sort.value,
      };
    case "SORTING_PRODUCTS":
      let newSortData;
      let old_data = state.filter_products;
      const sortItem = (a, b) => {
        if (state.sort_data == 'lowest') {
          return a.price - b.price;
        }
        else if (state.sort_data == 'highest') {
          return b.price - a.price;
        }
        else if(state.sort_data =='a-z')
        {
          return a.name.localeCompare(b.name);
        }
        else if(state.sort_data =='z-a')
        {
          return b.name.localeCompare(a.name);
        }
      }
      newSortData = old_data.sort(sortItem)


      return {
        ...state,
        filter_products: newSortData,
      };
      case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.data;

      return {
        ...state,
        filters: {
          ...state.filters,
          text: value,
        },
      };


    default:
      return state;
  }
};

export default filterReducer;