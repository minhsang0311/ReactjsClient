
// import { listsp } from "./data";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
function Home() {
    const [listsp, ganListSP] = useState( [] );
    const dispath = useDispatch();
    useEffect ( () => {
    fetch("http://localhost:3000/spmoi")
        .then(res=>res.json())
        .then(data => ganListSP(data));
 } , []);
    return (
        <div id="spnb">
            <div className="home">
                {listsp.slice(0,8).map((sp, i) => (
                    <div className="sp" key={i}>
                        <h4><Link to={ "/sp/" + sp.id } > {sp.ten_sp} </Link></h4>
                        <img src={sp.hinh} alt={sp.ten_sp} />
                        Giá:<del>{Number(sp.gia).toLocaleString("vi")}VNĐ</del>
                        <p>Giá KM:{Number(sp.gia_km).toLocaleString("vi")}VNĐ</p>
                       <p><a href="#" onClick={ ()=>dispath(themSP(sp))}>Thêm vào giỏ hàng</a></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
