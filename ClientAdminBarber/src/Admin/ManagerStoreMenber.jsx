import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { GetMenber, GetStore } from '../componentsAdmin/ModalManager'
import callApi from '../controller/resapi'
import customStyles from '../controller/custom_modal'
import { swal, swalErr } from '../controller/swal'


function ManagerStoreMenber(props) {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listMenber, setListMenber] = useState([]);
  const [cityLocation, setCityLocation] = useState('');
  const [districtLocation, setDistrictLocation] = useState('');
  const [districtDetailLocation, setDistrictDetailLocation] = useState('');
  const [addressLocation, setAddressLocation] = useState('');
  const [listStoreMenber, setListStoreMenber] = useState('');
  const [nameMenber, setNameMenber] = useState('');
  const [ratingStylist, setRatingStylist] = useState('');
  const [selectStore, setSelectStore] = useState('');

  const listStore = useSelector(state => state.reducerStore.data);
  const dispacth = useDispatch();

  function openModal(id) {
    if (id === 'Store') {
      setListStoreMenber(id)
      getStore();
      setShowModal(true);
    } else if ('Menber') {
      setListStoreMenber(id);
      getMenber();
      setShowModal(true);
    }
  }

  function closeModal() {
    setShowModal(false)
    setTimeout(() => {
    }, 500)
  }
  const getStore = async () => {
    const { data } = await axios('/getStore')
    dispacth({
      type: 'FETCH_STORE',
      data: data
    })
  }

  const getMenber = async () => {
    const { data } = await axios('/getMenber')
    setListMenber(data)
  }

  const postMenber = async () => {
    if (!checkValidateMenber()) {
      callApi('post', '/postMenber', {
        nameStylist: nameMenber, ratingStylist: ratingStylist,
        locationStylist: selectStore
      }).then(() => {
        setNameMenber('')
        setRatingStylist('');
        swal()
      }).catch(() => swalErr())
    }
  }

  useEffect(() => {
    props.setColor();
    getStore()
  }, [])

  const checkValidateStore = () => {
    if (cityLocation === '' || districtLocation === '' || districtDetailLocation === '' || addressLocation === '') {
      alert('Vui lòng nhập đủ các trường dữ liệu')
      return true
    } else {
      return false
    }
  }

  const checkValidateMenber = () => {
    if (nameMenber === '' || ratingStylist === '' || selectStore === '') {
      alert('Vui lòng nhập đủ các trường dữ liệu')
      return true
    } else {
      return false
    }
  }

  const ReturnModal = () => {
    if (listStoreMenber === 'Store') {
      return (
        <GetStore data={listStore} getNew={getStore} />
      )
    } else if (listStoreMenber === 'Menber') {
      return (
        <GetMenber data={listMenber} getNew={getMenber} />
      )
    }
  }

  const postStore = () => {
    if (!checkValidateStore()) {
      callApi('post', '/postStore',
        {
          cityLocation: cityLocation,
          districtLocation: districtLocation,
          addressLocation: addressLocation,
          districtDetailLocation: districtDetailLocation
        }).then(async () => {
          getStore()
          createCalender()
          setAddressLocation('');
          setCityLocation('');
          setDistrictLocation('')
          setDistrictDetailLocation('')
          swal()
        }).catch(() => swalErr())
    }
  }

  const createCalender = async () => {
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=8h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=8h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=9h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=9h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=10h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=10h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=11h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=11h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=12h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=12h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=13h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=13h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=14h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=14h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=15h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=15h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=16h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=16h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=17h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=17h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=18h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=18h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=19h00&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=19h30&address=' + addressLocation)
    await axios('https://api.tradenowvn.com/v1/other/haircut-add?time=20h00&address=' + addressLocation)
  }

  const HeaderModal = () => {
    let title;
    if (listStoreMenber === 'Menber') {
      title = 'Danh sách thợ'
    } else if (listStoreMenber === 'Store') {
      title = 'Danh sách địa chỉ'
    }
    return (
      <h3>{title} </h3>
    )
  }

  const handleChangeSelect = async text => {
    setSelectStore(text.target.value)
  }

  return (
    <div style={{ width: '100%' }}>
      <Modal
        closeTimeoutMS={500}
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
        <HeaderModal />
        <ReturnModal />
      </Modal>
      <div style={{ marginTop: 5 }} className="card card-body">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label>Thêm chi nhánh</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tỉnh thành phố"
                value={cityLocation}
                onChange={(e) => setCityLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Quận huyện"
                value={districtLocation}
                onChange={(e) => setDistrictLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Số"
                value={addressLocation}
                onChange={(e) => setAddressLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Địa chỉ quận huyện chi tiết"
                value={districtDetailLocation}
                onChange={(e) => setDistrictDetailLocation(e.target.value)}
              />
            </div>
            <button style={{ float: 'right', marginLeft: 15 }} onClick={() => openModal('Store')} className="btn btn-info">Xem</button>
            <button style={{ float: 'right' }}
              onClick={postStore}
              className="btn btn-info">Thêm</button>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Thêm thợ</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tên thợ"
                value={nameMenber}
                onChange={(e) => setNameMenber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Số sao"
                value={ratingStylist}
                min="0"
                max="5"
                onChange={(e) => setRatingStylist(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select value={selectStore} onChange={handleChangeSelect} className="custom-select mr-sm-2" id="SelectAdrress">
                <option value='' selected>Chọn một chi nhánh</option>
                {listStore.map((item) => (
                  <option key={item._id} value={item.addressLocation}>{item.addressLocation}</option>
                ))}
              </select>
            </div>
            <button style={{ float: 'right', marginLeft: 15 }} onClick={() => openModal('Menber')} className="btn btn-info">Xem</button>
            <button style={{ float: 'right' }} onClick={() => postMenber()} className="btn btn-info">Thêm</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManagerStoreMenber
