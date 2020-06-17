import axios from 'axios'
export default async(method,url,data)=>{
  return  await axios({
        method: method,
        url: url,
        data: data,
        headers: {
            'content-type': 'application/json'
        }
    })
}