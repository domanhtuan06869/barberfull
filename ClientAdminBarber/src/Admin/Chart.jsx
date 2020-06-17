import React, { useEffect, useState } from 'react';
import close from '../assets/image/close.png'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import DeleteIcon from '@material-ui/icons/Delete';
import customStyles from '../controller/custom_modal'
import callApi from '../controller/resapi'
import { useDispatch, useSelector } from "react-redux";
import { swal, swalErr } from '../controller/swal'

export default function StyleImage(props) {
  const [showModal, setShowModal] = useState(false);
  const [arrayImage, setArrayImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkpost, setCheckpost] = useState('')

  const listStyle = useSelector(state => state.reducerStyle.data);
  const dispatch = useDispatch();

  const getStyle = async () => {
    setLoading(true)
    const { data } = await axios('/getStyle');
    dispatch({
      type: "FETCH_STYLE",
      data: data
    })
    setLoading(false)

  }

  function openModal() {
    setShowModal(true)

  }

  function closeModal() {
    setShowModal(false)
    setTimeout(() => {
      setArrayImage([])
    }, 500)

  }

  useEffect(() => {
    props.setColor()
    getStyle()
  }, [])


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
      }
    )
      .then(res => {
        setArrayImage(state => [...state, res.data[0]])
      }).catch(() => {
      })
  }
  const MyUploader = () => {
    const handleChangeStatus = ({ meta, file }, status) => {
    }
    const handleSubmit = async (files, allFiles) => {
      allFiles.map((item) => {
        postImage(item.file)
      })
      allFiles.forEach(f => f.remove())
    }

    return (
      <Dropzone
        multiple
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        inputContent={"Hãy chọn file"}
        submitButtonContent="Thêm ảnh vào danh sách"
        classNames={{ submitButton: 'btn btn-danger' }}
        accept="image/*"
      />
    )
  }


  const postArrayImage = async () => {
    if (arrayImage.length < 4) {
      setCheckpost('Chọn nhiều hơn 4 ảnh');
      return;
    }

    callApi('post', '/postStyle', { arrayStyle: arrayImage }).then((res) => {
      getStyle()
      setArrayImage([])
      setCheckpost('')
      setShowModal(false)
      swal()

    })
  }
  if (loading) {
    return <h2 style={{ margin: '0 auto', textAlign: 'center' }}>Loading...</h2>;
  } else {
    return (

      <div>

        <button onClick={() => openModal('Thêm')} style={{}} type="button" className="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Create New</button>


        <Modal
          closeTimeoutMS={500}
          isOpen={showModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
          <h2> Thêm kiểu tóc</h2>
          <div class="card card-body">
            <MyUploader />
            {arrayImage.map((item) =>
              <label key={item}>
                {item}
              </label>
            )}
          </div>
          <button style={{ marginTop: 20, marginLeft: '5%' }} onClick={postArrayImage} className="btn btn-info">Thêm kiểu</button>
          <label>{checkpost}</label>
        </Modal>
        <div style={{ marginTop: 40 }} className="row">
          {
            listStyle.map((item) =>
              <div key={item._id} style={{ marginTop: 10 }} className="col-12">
                <DeleteIcon onClick={() => callApi('delete', '/deleteStyle', { id: item._id }).then(() => {
                  dispatch({
                    type: "DELETE_STYLE",
                    data: item._id
                  })
                  swal()
                }).catch(() => swalErr())

                } />
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      {item.img_style.map((itemimage) => (
                        <div key={itemimage} className="col-lg-3">
                          <img className="card-img responsive" style={{ height: 200 }} src={itemimage} alt="Card image cap" />
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              </div>
            )
          }

        </div>

      </div>

    );

  }


}
