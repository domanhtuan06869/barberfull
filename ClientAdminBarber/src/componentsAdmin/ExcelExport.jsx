import React, { useRef, useState, useEffect } from 'react'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default (data) => {
    return (
        <ExcelFile
            filename={'Berber_manager'}
            element={<button className="btn btn-info">Export Excel</button>}>
            <ExcelSheet data={data.dataset} name="Leaves">
                <ExcelColumn label="Mã đơn" value="_id" />
                <ExcelColumn label="Tên sản phẩm" value="nameProduct" />
                <ExcelColumn label="Tên khách hàng" value="fullName" />
                <ExcelColumn label="Số điện thoại" value="phoneNumber" />
                <ExcelColumn label="Địa chỉ" value="address" />
                <ExcelColumn label="Đơn giá" value="priceProduct" />
                <ExcelColumn label="Số lượng" value="amountProduct" />
                <ExcelColumn label="Thành tiền" value="amountProduct * priceProduct" />
            </ExcelSheet>
        </ExcelFile>
    )
}