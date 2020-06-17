const data={
    data:[]
  }
  
  function reducerStore(state=data, action) {
      switch (action.type) {
        case "FETCH_STORE":
          return {
            ...state,
            data:action.data||[]
          };
          case "DELETE_STORE":
            return {
              ...state,
              data: state.data.filter((item) => item._id != action.data)
            }
        default:
          return  state;
      }
    }
    
    export default reducerStore