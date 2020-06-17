import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { BallBeat } from 'react-pure-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'

function Users(props) {

    const [loading, setLoading] = useState(false);
    const [listUser, setListUser] = useState([])
    const [isRole, setRole] = useState(0)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassWord, setNewPassword] = useState('')

    useEffect(() => {
        getUsers()
        props.setColor()
        checkRole()
    }, [])

    async function getUsers() {
        setLoading(true)
        const result = await axios('/getListUser')
        setListUser(result.data)
        setLoading(false);
    }

    const checkRole = async () => {
        const { data } = await axios('/getUser?email=' + localStorage.getItem('email'))
        setRole(data.__v)
    }

    const updateUser = async (id, role) => {
        callApi('post', '/updateUsers', { id: id, role: role }).then(() => {
            swal()
            getUsers()
        }).catch(() => swalErr())
    }

    const deleteUser = (id) => {
        callApi('delete', '/deleteUser', { id: id }).then(() => {
            swal()
            getUsers()
        }).catch(() => swalErr())
    }

    const updatePassword = () => {
        if (oldPassword === '', newPassWord === '') {
            alert('Không để trống trường')
        } else {
            callApi('post', '/updatePassword', { email: localStorage.getItem('email'), oldPassword: oldPassword, newPassword: newPassWord }).then(() => {
                swal()
                setNewPassword('')
                setOldPassword('')
            }).catch(() => swalErr())
        }
    }
    return (
        <div>
            {loading ? < div className='loading' >
                <BallBeat color={'#123abc'}
                    loading={loading} />
            </div > :
                <div className="row">
                    <div className="col-lg-8">
                        <table style={{ marginTop: 15 }} className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Quyền</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            {isRole === 1 ? <tbody>
                                {listUser.map((item, index) =>
                                    <tr>

                                        {item.__v === 1 ? null : <td>{item.email}</td>}

                                        {item.__v === 1 ? null : <td>
                                            {item.__v === 2 ? <button onClick={() => updateUser(item._id, 0)} class="btn btn-secondary">Hủy quyền admin</button> : <button onClick={() => updateUser(item._id, 2)} class="btn btn-primary">Nâng quyền admin</button>}
                                        </td>}

                                        {item.__v === 1 ? null : <td>
                                            <button onClick={() => deleteUser(item._id)} class="btn btn-danger">Xóa tài khoản</button>
                                        </td>}
                                    </tr>
                                )}
                            </tbody> : null}
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Đổi mật khẩu</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mật khẩu cũ"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mật khẩu mới"
                                value={newPassWord}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button onClick={updatePassword} class="btn btn-primary">Đổi mật khẩu</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Users