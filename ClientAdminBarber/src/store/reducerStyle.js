const data = {
  data: []
}
function reducerNews(state = data, action) {
  switch (action.type) {
    case "FETCH_STYLE":
      return {
        ...state,
        data: action.data.reverse()
      };

    case "DELETE_STYLE":
      return {
        ...state,
        data: state.data.filter((item) => item._id != action.data)
      }
    default:
      return state;
  }
}

export default reducerNews;