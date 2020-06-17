import React from 'react'
import ReactToPrint from 'react-to-print';

export default (props)=>{
    return (
        <ReactToPrint
        trigger={() => <button className="btn btn-info">Print</button>}
        content={() => props.refdata.current}
      />
    )
}