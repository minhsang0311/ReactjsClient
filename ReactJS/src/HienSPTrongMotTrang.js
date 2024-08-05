import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
function HienSPTrongMotTrang({ spTrongTrang }) {
    const dispath = useDispatch();
    return (<div id="data">
        {spTrongTrang.map((sp, index) => {
            return (
                <div className="sp" key={index}>
                    <h4> <Link to={"/sp/" + sp.id} > {sp['ten_sp']} </Link> </h4>
                    <img src={sp['hinh']} alt={sp['ten_sp']} />
                    Giá:<del>{Number(sp.gia).toLocaleString("vi")}VNĐ</del>
                    <p>Giá KM:{Number(sp.gia_km).toLocaleString("vi")}VNĐ</p>
                    <p><a href="#" onClick={ ()=>dispath(themSP(sp))}>Thêm vào giỏ hàng</a></p>
                </div>
            )
        })//map
        }
    </div>);
}
export default HienSPTrongMotTrang;