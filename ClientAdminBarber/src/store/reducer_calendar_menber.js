const data = {
  data: []
}

function reducerCalendar(state = data, action) {
  switch (action.type) {
    case "FETCH_CALENDAR":
      return {
        ...state.data,
        data: action.data || []
      };

    default:
      return state;
  }
}

export default reducerCalendar;