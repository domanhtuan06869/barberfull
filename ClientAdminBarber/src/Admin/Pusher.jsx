import React, { useRef, useState, useEffect } from 'react'
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'

function Pushnotification(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')

    useEffect(() => {
        props.setColor()
    }, [])


    const pushNotify = async (id) => {
        if (title === '' || content === ''){
            alert("Vui lòng nhập đủ trường dữ liệu")
        }
            callApi('post', '/pusher', {
                title: title,
                content: content
            }).then(() => {
                swal()
                setTitle('')
                setContent('')
            }).catch(() => swalErr())
    }


    return (
        <div>
            <h1>Thông báo tới ứng dụng</h1>
            <div>
                <label>Tiêu đề</label>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label>Nội dung</label>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nội dung"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={pushNotify} className="btn btn-info mt-20">Gửi thông báo</button>

        </div>
    )
}
export default Pushnotification