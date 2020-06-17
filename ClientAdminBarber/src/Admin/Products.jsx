import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import Modal from 'react-modal';
import callApi from '../controller/resapi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { swal, swalErr } from '../controller/swal'
import { BallBeat } from 'react-pure-loaders';

const customStyles = {
    content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        height:'80%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        opacity: '80%',
        background: '#ffcc33',
        marginTop: '5%',
        marginBotttom: '7%'
    }
};



function Products(props) {
    const [listProduct, setListProduct] = useState([])
    const [listTypeProduct, setListTypeProduct] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [ratingProduct, setRatingProduct] = useState('')
    const [amountProduct, setAmountProduct] = useState('')
    const [selected, setSelected] = useState('0')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProduct()
        props.setColor()
    }, []);

    async function getProduct() {
        setLoading(true)
        const result = await axios('/getProducts')
        setListProduct(result.data)
        setListTypeProduct(result.data)
        setLoading(false);
    }

    function openModal(action) {
        setAction(action)
        setShowModal(true)
    }

    const openModalEdit = (action, id, price, name, des, type, img, rat, am) => {
        openModal(action)
        setAction(action)
        setImage(img)
        setId(id)
        setDescription(des)
        setPrice(price)
        setType(type)
        setName(name)
        setRatingProduct(rat)
        setAmountProduct(am)
    }
    function closeModal() {
        setShowModal(false)
        setTimeout(() => {
            setImage('')
            setId('')
            setDescription('')
            setPrice('')
            setType('')
            setName('')
            setRatingProduct('')
            setAmountProduct('')
        }, 500)

    }

    const postImage = async (file) => {
        let formData = new FormData();
        formData.append('file', file);
        axios.post(
            '/Uploadfile',
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then(res => {
                setImage(res.data[0])
            }).catch(() => {
            })
    }

    const addProduct = async () => {
        if (!checkValidate()) {
            callApi('post', '/postProduct', {
                imageProduct: image,
                nameProduct: name,
                priceProduct: price,
                typeProduct: type,
                descriptionProduct: description,
                ratingProduct: ratingProduct,
                amountProduct: amountProduct
            }).then(() => {
                swal()
                closeModal()
                getProduct()
            })
        }
    }

    const editProduct = async () => {
        if (!checkValidate()) {
            callApi('post', '/updateProduct', {
                id: id,
                imageProduct: image,
                nameProduct: name,
                priceProduct: price,
                typeProduct: type,
                descriptionProduct: description,
                ratingProduct: ratingProduct,
                amountProduct: amountProduct
            }).then(() => {
                swal()
                closeModal()
                getProduct()
            })
        }

    }

    const deleteProduct = async (id) => {
        callApi('delete', '/deleteProduct', {
            id: id,
        }).then(() => {
            swal()
            setListProduct(state => state.filter((item) => item._id != id))
        })
    }

    const checkValidate = () => {
        if (name === '' || type === '' || image === '' || price === '' || description === '' || ratingProduct === ''|| amountProduct === '') {
            alert('vui lòng nhập đủ các trường dữ liệu')
            return true;
        } else {
            return false;
        }
    }

    let listType = listTypeProduct.map((item) => item.typeProduct)
    let unique = listType.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    })
    const ListType = () => {
        let list = listTypeProduct.map((item) => item.typeProduct)
        let uniqueArray = list.filter(function (item, pos, self) {
            return self.indexOf(item) === pos;
        })

        const handleChangeSelect = async text => {
            const value = text.target.value
            setSelected(value)
            if (value === '0') {
                getProduct()
            } else {
                setLoading(true)
                const result = await axios('/getProducts?type=' + value)
                setListProduct(result.data)
                setLoading(false);
            }
        }
        return (
            <div style={{ marginTop: 20 }} className="row">
                <div className="col-lg-3">
                    <label className="mr-sm-2" htmlFor="SelectAdrress">Chọn theo thể loại</label>
                    <select defaultValue="0" value={selected} onChange={handleChangeSelect} name="Chọn một trạng thái" className="custom-select mr-sm-2" id="SelectAdrress">
                        <option value="0">Tất cả</option>
                        {uniqueArray.map((item) =>
                            <option value={item}>{item}</option>
                        )}

                    </select>
                </div>
            </div>
        )
    }
    return (
        <div>
            <button onClick={() => openModal('Thêm')} style={{}} type="button" className="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Create New</button>
            {loading ? < div className='loading' >
                <BallBeat color={'#123abc'}
                    loading={loading} />
            </div > :
                <div>
                    <ListType></ListType>
                    <div style={{ marginTop: 10 }} className="row">
                        {listProduct.map((item) =>
                            <div style={{ marginTop: 10 }} key={item._id} className="col-lg-3">
                                <div class="card">
                                    <img style={{ height: 250 }} className="card-img-top img-fluid img-thumbnail" src={item.imageProduct} alt="Card image cap" />
                                    <div className="card-body">
                                        <p style={{ fontWeight: 'bold', marginBottom: 0 }} >{item.nameProduct}</p>
                                        <p style={{ color: 'red', fontWeight: "bold", marginTop: 0, marginBottom: 0 }} >{item.priceProduct} đ</p>
                                        <h5>{item.typeProduct}</h5>
                                        <p style={{ marginTop:0, marginBottom: 0 }}> Số lượng {item.amountProduct}</p>
                                        <button onClick={() => openModalEdit('Sửa', item._id, item.priceProduct, item.nameProduct, item.descriptionProduct, item.typeProduct, item.imageProduct, item.ratingProduct, item.amountProduct)} class="btn btn-primary">Sửa</button>
                                        <button onClick={() => deleteProduct(item._id)} style={{ marginLeft: 10 }} class="btn btn-danger">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }

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
                        <label>Tên sản phẩm</label>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên sản phẩm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="form-group">
                            <label>Ảnh sản phẩm</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => postImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Giá</label>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Giá sản phẩm"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Số lượng</label>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Số lượng"
                                value={amountProduct}
                                onChange={(e) => setAmountProduct(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="mr-sm-2" htmlFor="SelectAdrress">Chọn theo thể loại</label>
                        <select defaultValue="0" value={type} onChange={(e => setType(e.target.value))} name="Chọn một trạng thái" className="custom-select mr-sm-2" id="SelectAdrress">
                            <option value="0">Chọn một danh mục sản phẩm</option>
                            {unique.map((item) =>
                                <option value={item}>{item}</option>
                            )}

                        </select>
                    </div>
                    <div>
                        <label>Mô tả</label>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mô tả sản phẩm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Đánh giá sao</label>
                        <div className="form-group">
                            <input
                                type="number"
                                min="0"
                                max="5"
                                className="form-control"
                                placeholder="Đánh giá sao"
                                value={ratingProduct}
                                onChange={(e) => setRatingProduct(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={action === 'Thêm' ? addProduct : editProduct} className="btn btn-success">{action}</button>
                </div>
            </Modal>
        </div>
    )

}
export default Products