import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import ExportExcel from '../componentsAdmin/ExcelExport';
import PrintOut from '../componentsAdmin/PrintOut';
import { BallBeat } from 'react-pure-loaders';
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'

function Oders(props) {
    const [loading, setLoading] = useState(false);
    const [selected, setSelect] = useState('0');
    const [listOder, setListOder] = useState([])
    const [findOder, setFindOder] = useState('')
    let listFindOder = listOder.filter(item => item._id.includes(findOder));
    const [sum, setSum] = useState([])

    useEffect(() => {
        props.setColor()
    }, [])
    async function getOders() {
        setLoading(true)
        const { data } = await axios('/getOders?status=' + "0");
        setListOder(data)
        setLoading(false)

    }


    const handleChangeSelect = async text => {
        setLoading(true)
        setSelect(text.target.value)
        const value = text.target.value
        const { data } = await axios('/getOders?status=' + value);
        setListOder(data)
        let a = 0;
        data.map((item) => {
            if (item.__v === 2) {
                a += item.amountProduct * item.priceProduct
                setSum(a)
            }
        })
        setLoading(false)
    }

    const updateOder = async (v, id, amount, name) => {
        callApi('post', '/updateOder', {
            id: id,
            v: v,
        }).then(() => {
            if (v === 1) {
                updateAmountProduct(Number(-amount), name)
            }
            swal()
            setListOder(state => state.filter((item) => item._id !== id))
        })
    }

    const updateOderTc = async (v, id, amount, name) => {
        callApi('post', '/updateOder', {
            id: id,
            v: v,
        }).then(() => {
            if (v === 3) {
                updateAmountProduct(Number(amount), name)
            }
            swal()
            setListOder(state => state.filter((item) => item._id !== id))
        })
    }


    const updateAmountProduct = async (amount, name) => {
        callApi('post', '/updateAmountProduct', {
            amount: amount,
            name: name,
        }).then(() => {
        })
    }

    const deleteOder = async (id) => {
        callApi('delete', '/deleteOder', {
            id: id,
        }).then(() => {
            swal()
            setListOder(state => state.filter((item) => item._id !== id))
        })
    }

    useEffect(() => {
        getOders()
    }, [])

    const componentRef = useRef();

    const CheckClick = (props) => {
        if (selected === "0") {
            return (
                <div>
                    <div> <button style={{ fontSize: 11 }} onClick={() => updateOder(1, props.id, props.amount, props.name)} className="btn btn-info">Xác nhận gửi</button></div>
                    <div> <button style={{ fontSize: 11, marginTop: 5 }} onClick={() => updateOder(3, props.id)} className="btn btn-danger"> Hủy</button></div>
                </div>
            )
        } else if (selected === "1") {
            return (
                <div>
                    <button onClick={() => updateOder(2, props.id)} style={{ fontSize: 11 }} className="btn btn-info"> Xác nhận thành công</button>
                    <div> <button style={{ fontSize: 11, marginTop: 5 }} onClick={() => updateOderTc(3, props.id, props.amount, props.name)} className="btn btn-danger"> Hủy</button></div>
                </div>
            )
        } else if (selected === "3") {
            return (
                <button onClick={() => deleteOder(props.id)} style={{ fontSize: 11 }} className="btn btn-danger"> Xóa</button>
            )
        }
        else {
            return null
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-1.9">
                    <ExportExcel dataset={listFindOder}></ExportExcel>
                </div>
                <div className="col-lg-2">
                    <PrintOut refdata={componentRef}></PrintOut>
                </div>
            </div>
            <div style={{ marginTop: 20 }} className="row">
                <div style={{ padding: 0 }} className="col-lg-3">
                    <label className="mr-sm-2" htmlFor="SelectAdrress">Trạng thái đơn hàng</label>
                    <select defaultValue="0" name="Chọn một trạng thái" onChange={handleChangeSelect} className="custom-select mr-sm-2" id="SelectAdrress">
                        <option value="0">Đơn đã nhận</option>
                        <option value="1">Đơn đã gửi</option>
                        <option value="2">Hoàn thành</option>
                        <option value="3">Đã hủy</option>
                    </select>
                </div>
                <div style={{ marginTop: 30 }} className="col-lg-2"><p style={{ fontWeight: 'bold', marginTop: 10 }}>Tổng : {listOder.length}</p></div>
                {selected === '2' ? <div style={{ marginTop: 30 }} className="col-lg-4"><p style={{ fontWeight: 'bold', marginTop: 10 }}>Tổng doanh thu: {sum}</p></div> : null}

            </div>
            <div style={{ paddingLeft: 0, paddingRight: 0 }} className="row">
                <div style={{ paddingLeft: 0, paddingRight: 0 }} className="col-lg-3">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo mã đơn"
                            value={findOder}
                            onChange={(e) => setFindOder(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div>
                {
                    loading ?
                        < div className='loading' >
                            <BallBeat color={'#123abc'}
                                loading={loading} />
                        </div >
                        :
                        <div ref={componentRef}>
                            <table style={{ marginTop: 15 }} className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Mã đơn</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Tên khách hàng</th>
                                        <th scope="col">SĐT</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Thành tiền</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listFindOder.map((item, index) =>
                                        <tr key={item._id}>
                                            <td>  {item._id}</td>
                                            <td>  {item.nameProduct}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.address}</td>
                                            <td>{item.priceProduct} VNĐ</td>
                                            <td>{item.amountProduct}</td>
                                            <td>{item.amountProduct * item.priceProduct} VNĐ</td>
                                            <td>
                                                <CheckClick id={item._id} amount={item.amountProduct} name={item.nameProduct}></CheckClick>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                }

            </div>
        </div>
    )
}
export default Oders
