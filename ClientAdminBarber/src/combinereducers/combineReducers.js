import { combineReducers } from "redux";
import reducerCalendar from '../store/reducer_calendar_menber'
import reducerStyle from '../store/reducerStyle'
import reducerStore from '../store/reducerStore';
const combine = combineReducers({
  reducerCalendar: reducerCalendar,
  reducerStyle: reducerStyle,
  reducerStore: reducerStore
})

export default combine;