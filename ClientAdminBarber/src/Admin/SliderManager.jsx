import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { BallBeat } from 'react-pure-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'

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

function Service(props) {

    const [listService, setListService] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState('')
    const [nameService, setNameService] = useState('')
    const [detailService, setDetailService] = useState('')
    const [priceService, setPriceService] = useState('')
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getService()
        props.setColor()
    }, [])
    async function getService() {
        setLoading(true)
        const result = await axios('/getService')
        setListService(result.data)
        setLoading(false);
    }

    function openModal(action) {
        if (action === 'Thêm') {
            setAction('Thêm')
            setShowModal(true)
        } else {
            setAction('Sửa')
            setShowModal(true)
        }
    }

    function closeModal() {
        setShowModal(false)
        setTimeout(() => {
            setAction('')
            setShowModal('')
        }, 300)

    }

    const addService = async () => {
        if (!checkValidate()) {
            callApi('post', '/postService', {
                nameService: nameService,
                detailService: detailService,
                priceService: priceService,
            }).then(() => {
                swal()
                closeModal()
                getService()
            })
        }
    }

    const editService = async () => {
        if (!checkValidate()) {
            callApi('post', '/updateService', {
                id: id,
                nameService: nameService,
                detailService: detailService,
                priceService: priceService,
            }).then(() => {
                swal()
                closeModal()
                getService()
            })
        }

    }

    const openModalEdit = (action, id, name, detail, price) => {
        openModal(action)
        setAction(action)
        setId(id)
        setNameService(name)
        setDetailService(detail)
        setPriceService(price)
    }

    const deleteService = async (id) => {
        callApi('delete', '/deleteService', {
            id: id,
        }).then(() => {
            swal()
            setListService(state => state.filter((item) => item._id != id))
        })
    }

    const checkValidate = () => {
        if (nameService === '' || detailService === '' || priceService === '') {
            alert('Vui lòng nhập đủ các trường dữ liệu')
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            <button onClick={() => openModal('Thêm')} style={{}} type="button" className="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Create New</button>
            {loading ? < div className='loading' >
                <BallBeat color={'#123abc'}
                    loading={loading} />
            </div > :
                <div>
                    <Modal
                        closeTimeoutMS={500}
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
                        <h2> {action}</h2>
                        <div>
                            <div>
                                <label>Tên dịch vụ</label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên dịch vụ"
                                        value={nameService}
                                        onChange={(e) => setNameService(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Chi tiết dịch vụ</label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Chi tiết dịch vụ"
                                        value={detailService}
                                        onChange={(e) => setDetailService(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Giá dịch vụ</label>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Giá dịch vụ"
                                        value={priceService}
                                        onChange={(e) => setPriceService(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button onClick={action === 'Thêm' ? addService : editService} className="btn btn-success">{action}</button>
                        </div>
                    </Modal>
                    <table style={{ marginTop: 15 }} className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Stt</th>
                                <th scope="col">Tên kiểu</th>
                                <th scope="col">Chi tiết</th>
                                <th scope="col">Giá</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listService.map((item, index) =>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.nameService}</td>
                                    <td>{item.detailService}</td>
                                    <td>{item.priceService} VNĐ</td>
                                    <td>
                                        <button onClick={() => openModalEdit('Sửa', item._id, item.nameService, item.detailService, item.priceService)} class="btn btn-primary">Sửa</button>
                                        <button onClick={() => deleteService(item._id)} style={{ marginLeft: 10 }} class="btn btn-danger">Xóa</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Service