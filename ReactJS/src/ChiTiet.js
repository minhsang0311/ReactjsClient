import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { themSP } from "./cartSlice";
function ChiTiet() {
    let { id } = useParams();
    const dispath = useDispatch()
    const [sp, ganSP] = useState([])
    useEffect( ()=>{
        let url =`http://localhost:3000/sp/${id}`;
        fetch(url)
            .then(res=>res.json())
            .then(data=>ganSP(data))
    }, [id]);
    return (
        <div id='chitiet'>
            <div id="row1">
                <div id="trai"> <img src={sp['hinh']} alt={sp['ten_sp']} /> </div>
                <div id="phai">
                    <h1 className="h3"> {sp['ten_sp']} </h1>
                    <p><span>Giá gốc</span>: {Number(sp['gia']).toLocaleString("vi")} VNĐ</p>
                    <p><span>Giá KM</span>: {Number(sp['gia_km']).toLocaleString("vi")} VNĐ</p>
                    <p><span>Ngày</span>: {new Date(sp['ngay']).toLocaleString("vi-VN")}</p>
                    <p><a href="#" onClick={ ()=>dispath(themSP(sp))}>Thêm vào giỏ hàng</a></p>
                </div>
            </div>
        </div>
    )
}
export default ChiTiet;