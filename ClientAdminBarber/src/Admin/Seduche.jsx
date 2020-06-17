import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { BallBeat } from 'react-pure-loaders'
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'
import { useDispatch, useSelector } from "react-redux"

function Schedule(props) {

    const [listSchedule, setListSchedule] = useState([])
    const [loading, setLoading] = useState(false);
    const [selectStore, setSelectStore] = useState('');


    const listStore = useSelector(state => state.reducerStore.data);
    const dispacth = useDispatch();

    useEffect(() => {
        getStore()
        props.setColor()
    }, [])

    async function getStore() {
        const { data } = await axios('/getStore')
        dispacth({
            type: 'FETCH_STORE',
            data: data
        })
    }

    async function getSchedule(address) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let today = `${day}/${month + 1}/${(year)}`
        setLoading(true)
        const result = await axios(`/getSchedules?dateBook=${today}&address=${address === undefined ? selectStore : address}`)
        setListSchedule(result.data)
        setLoading(false);
    }

    async function getScheduleLast() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let todaylast = `${day + 1}/${month + 1}/${(year)}`
        setLoading(true)
        const result = await axios(`/getSchedules?dateBook=${todaylast}&address=${selectStore}`)
        setListSchedule(result.data)
        setLoading(false);
    }
    const todatDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let today = `${day}/${month + 1}/${(year)}`
        return today
    }

    const updateSchedule = async (id) => {
        callApi('post', '/updateSchedule', {
            id: id,
        }).then(() => {
            swal()
            getSchedule()
        }).catch(() => swalErr())
    }

    const updateScheduleLast = async (id) => {
        callApi('post', '/updateSchedule', {
            id: id,
        }).then(() => {
            swal()
            getScheduleLast()
        }).catch(() => swalErr())
    }


    const handleChangeSelect = async text => {
        setLoading(true)
        setSelectStore(text.target.value)
        const name = text.target.value
        getSchedule(name)
        setLoading(false)
    }


    return (
        <div>
            {loading ? < div className='loading' >
                <BallBeat color={'#123abc'}
                    loading={loading} />
            </div > :
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
                            <button onClick={() => getSchedule()} className="btn btn-info mt-20">Hôm nay</button>
                        </div>
                        <div style={{ marginTop: 26, marginLeft: 5 }} className="col-lg-1.6">
                            <button onClick={() => getScheduleLast()} className="btn btn-info mt-20">Ngày mai</button>
                        </div>
                    </div>
                    <table style={{ marginTop: 15 }} className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Cơ sở</th>
                                <th scope="col">Thời gian</th>
                                <th scope="col">SĐT khách hàng</th>
                                <th scope="col">Thợ</th>
                                <th scope="col">Dịch vụ chọn</th>
                                <th scope="col">Trạng thái cắt</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSchedule.map((item, index) =>
                                <tr key={item._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.locationSchedule}</td>
                                    <td>{item.timeSchedule}</td>
                                    <td>{item.phoneSchedule}</td>
                                    <td>{item.stylistSchedule}</td>
                                    <td>{item.serviceSchedule}</td>
                                    <td>{item.statusSchedule ===true ? 'Đã cắt' : 'Chưa căt'}</td>
                                    {item.statusSchedule ? null : <button onClick={() => todatDate() === item.dateSchedule ? updateSchedule(item._id) : updateScheduleLast(item._id)} className="btn btn-info mt-20">Xác nhận cắt</button>}

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Schedule