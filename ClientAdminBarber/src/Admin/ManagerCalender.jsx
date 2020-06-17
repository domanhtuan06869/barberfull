import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { BallBeat } from 'react-pure-loaders';
import callApi from '../controller/resapi'

function ManagerCalender(props) {
  const [loading, setLoading] = useState(false);
  const [selectStore, setSelectStore] = useState('');
  const [find, setFind] = useState('')
  const [listCalender, setListCalender] = useState([])
  const [number, setNumber] = useState('1')

  const listStore = useSelector(state => state.reducerStore.data);
  const listCalendar = useSelector(state => state.reducerCalendar.data);

  const dispacth = useDispatch();

  useEffect(() => {
    props.setColor()
  }, [])
  async function getStore() {
    const { data } = await axios('/getStore')
    dispacth({
      type: 'FETCH_STORE',
      data: data
    })
  }

  const handleChangeSelect = async text => {
    setLoading(true)
    setSelectStore(text.target.value)
    const name = text.target.value
    const { data } = await axios(`https://api.tradenowvn.com/v1/other/haircut-getall?number=${number}&address=${name}`);
    setListCalender(data.data)
    setLoading(false)
  }

  useEffect(() => {
    getStore()
  }, [])

  useEffect(() => {
    getCalender()
  }, [number])

  const getCalender = async () => {
    setLoading(true)
    const { data } = await axios(`https://api.tradenowvn.com/v1/other/haircut-getall?number=${number}&address=${selectStore}`);
    setListCalender(data.data)
    setLoading(false)
  }

  const confirmUpdate = async (id) => {
    let isCheck = window.confirm("Bạn có muốn lấp lịch cắt")
    if (isCheck) {
      callApi('get', 'https://api.tradenowvn.com/v1/other/haircut-order?id=' + id, {
      }).then(async (res) => {
        getCalender()
      })
    } else {
    }
  }

  return (
    <div>
      <div style={{ marginTop: 20 }} className="row">
        <div class="col-lg-3">
          <label className="mr-sm-2" for="SelectAdrress">Chi Nhánh</label>
          <select value={selectStore} onChange={handleChangeSelect} className="custom-select mr-sm-2" id="SelectAdrress">
            <option selected>Chọn một chi nhánh</option>
            {listStore.map((item) => (
              <option key={item._id} value={item.addressLocation}>{item.addressLocation}</option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 26 }} className="col-lg-1.6">
          <button onClick={() => setNumber('1')} className="btn btn-info mt-20">Hôm nay</button>
        </div>
        <div style={{ marginTop: 26, marginLeft: 5 }} className="col-lg-1.6">
          <button onClick={() => setNumber('2')} className="btn btn-info mt-20">Ngày mai</button>
        </div>
      </div>
      <div className="row">
        {listCalendar.length > 0 ? <div class="col-lg-3">
          <div className="form-group">
            <label>Tìm thợ</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm thợ cắt theo số điện thoại"
              value={find}
              onChange={(e) => setFind(e.target.value)}
            />
          </div>
        </div> : null
        }
      </div>
      <div>
        <div style={{ marginTop: 20 }} className="row">
          {listCalender.map((item) =>
            <div
              style={{ cursor: 'pointer', margin:3,borderWidth:2, borderColor:item.exist ?'#0BA313':'red', borderStyle:'solid'}} onClick={() => confirmUpdate(item.id)} className={`col-lg-1`}>
              {item.time}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
export default ManagerCalender
