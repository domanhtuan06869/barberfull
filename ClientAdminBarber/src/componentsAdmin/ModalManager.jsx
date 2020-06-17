import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import callApi from '../controller/resapi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";

export const GetStore = (data) => {
    const dispacth = useDispatch()
    return (
        <div style={{ marginTop: 10 }} className="">
            {data.data.map((item) =>
                <div style={{ marginTop: 5 }} class="card card-body">
                    <div key={item._id} className="row">
                        <div className="col-lg-11">{item.addressLocation} - {item.districtDetailLocation} - {item.cityLocation}</div>
                        <div className="col-lg-1"><DeleteIcon onClick={() => callApi('delete', '/deleteStore', { id: item._id }).then((res) => dispacth({ type: 'DELETE_STORE', data: item._id }))}></DeleteIcon></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const GetMenber = (data) => {
    return (
        <div style={{ marginTop: 10 }} className="">
            {data.data.map((item) =>
                <div style={{ marginTop: 5 }} class="card card-body">
                    <div key={item._id} className="row">
                        <div className="col-lg-11">Họ tên: {item.nameStylist}. Số sao:{item.ratingStylist}. Cơ sở :{item.locationStylist}</div>
                        <div className="col-lg-1"><DeleteIcon onClick={() => callApi('delete', '/deleteMenber', { id: item._id }).then(() => { data.getNew() })}></DeleteIcon></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const AddMenberCut = (data) => {
    const [find, setFind] = useState('')
    let res = data.data.filter(item => item.name.includes(find));
    return (
        <div style={{ marginTop: 10 }} className="">
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Tìm kiếm"
                    value={find}
                    onChange={(e) => setFind(e.target.value)}

                />
            </div>
            {res.map((item) =>
                <div style={{ marginTop: 5 }} class="card card-body">
                    <div key={item._id} className="row">
                        <div className="col-lg-11">Họ tên: {item.name}. SĐT:{item.phone}. Địa chỉ: {item.address}</div>
                        <div className="col-lg-1"><FontAwesomeIcon onClick={() => {
                            data.setMenber(state => [...state, item])
                            data.deleteMenber(state => state.filter((itemf) => itemf._id != item._id))
                        }
                        } icon={faPlus} /></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const AddAddressCut = (data) => {
    const [find, setFind] = useState('')
    let res = data.data.filter(item => item.province.includes(find));
    return (
        <div style={{ marginTop: 10 }} className="">
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Tìm kiếm"
                    value={find}
                    onChange={(e) => setFind(e.target.value)}

                />
            </div>
            {res.map((item) =>
                <div style={{ marginTop: 5 }} class="card card-body">
                    <div key={item._id} className="row">
                        <div className="col-lg-10">Tỉnh Thành: {item.province}. Quận Huyện:{item.district}. Địa chỉ: {item.address}</div>
                        <div className="col-lg-2"><FontAwesomeIcon onClick={() => {
                            data.setAddress(state => [...state, item])
                        }
                        } icon={faPlus} /></div>
                    </div>
                </div>
            )}
        </div>
    )
}