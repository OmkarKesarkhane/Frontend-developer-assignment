import { SEARCH, TOTAL_ORDERS, LOADER } from "./ActionTypes";

export default (state, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        query: action.payload.query,
        selected: action.payload.selected,
      };

    case TOTAL_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    default:
      return state;
  }
};
