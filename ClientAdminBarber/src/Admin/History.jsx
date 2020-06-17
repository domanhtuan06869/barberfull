import React, { useRef, useState, useEffect } from 'react'
import { BallBeat } from 'react-pure-loaders';
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'
import axios from 'axios';
import Modal from 'react-modal';
import close from '../assets/image/close.png'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        opacity: '80%',
        background: '#ffcc33',
        marginTop: '2%'
    }
};

function Oders(props) {
    const [listSchedule, setListSchedule] = useState([])
    const [loading, setLoading] = useState(false);
    const [findSchedule, setFindSchedule] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [fileimg, setFile] = useState('')
    const [id, setId] = useState('')

    let listFindHistory = listSchedule.filter(item => item.phoneSchedule.includes(findSchedule));


    useEffect(() => {
        props.setColor()
        getSchedule()
    }, [])

    const getSchedule = async () => {
        setLoading(true)
        const { data } = await axios('/getSchedule')
        setListSchedule(data)
        setLoading(false)
    }

    const openModal = (id) => {
        setId(id)
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
        setTimeout(() => {
            setId('')
        }, 500)

    }
    const updateSchedule = async () => {
        let formData = new FormData();
        formData.append('file', fileimg);

        axios.post(
            '/Uploadfile',
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then(res => {
                callApi('post', '/updateScheduleImage', {
                    id: id,
                    image: res.data[0]
                }).then(() => {
                    swal()
                    closeModal()
                    getSchedule()
                }).catch(() => swalErr())

            }).catch(() => {
            })

    }

    return (
        <div>
            <div style={{ marginTop: 20 }} className="row">
                <div style={{ marginTop: 30 }} className="col-lg-2"><p style={{ fontWeight: 'bold', marginTop: 10 }}></p></div>
            </div>
            <div style={{ paddingLeft: 0, paddingRight: 0 }} className="row">
                <div className="col-lg-3">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo số điện thoại"
                            value={findSchedule}
                            onChange={(e) => setFindSchedule(e.target.value)}
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
                        <div>
                            <Modal
                                closeTimeoutMS={500}
                                isOpen={showModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal">
                                <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
                                <h5>Cập nhập</h5>

                                <div>
                                    <div className="form-group">
                                        <label>Ảnh kiểu tóc</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </div>
                                    <button onClick={updateSchedule} className="btn btn-success">Cập nhập</button>
                                </div>
                            </Modal>
                            <table style={{ marginTop: 15 }} className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Stt</th>
                                        <th scope="col">Cơ sở</th>
                                        <th scope="col">SĐT</th>
                                        <th scope="col">Thời gian</th>
                                        <th scope="col">Thợ</th>
                                        <th scope="col">Ảnh kiểu</th>
                                        <th scope="col">Dịch vụ chọn</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listFindHistory.map((item, index) =>
                                        <tr key={item._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.locationSchedule}</td>
                                            <td>{item.phoneSchedule}</td>
                                            <td>{item.timeSchedule}</td>
                                            <td>{item.stylistSchedule}</td>
                                            {item.imageSchedule === '' ? <td></td> : <img style={{ height: 90, width: 100 }} className=" img-fluid img-responsive" src={item.imageSchedule} alt="Card image cap" />}
                                            <td>{item.serviceSchedule}</td>
                                            <td>
                                                <button onClick={() => openModal(item._id)} className="btn btn-success"> Cập nhập kiểu cho khách</button>

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
