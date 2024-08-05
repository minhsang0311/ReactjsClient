import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { xoaSP, xoaGH, suaSL } from "./cartSlice";
import { Link } from "react-router-dom";
function ShowCart(props) {
    const dispath = useDispatch();
    const cart = useSelector(state => state.cart.listSP);
    const clearCart = () => {
            dispath(xoaGH());
      };
    
    return (
        <div id="giohang">
            <h2>Giỏ hàng của bạn</h2>
            <table>
            <tr>
                <th>Tên SP</th>
                <th>Hình</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Giá khuyến mãi</th>
                <th>Ngày</th>
                <th>Thanh toán</th>
            </tr>
            {cart.map((sp, index) => {
                return (

                        <tr>
                            <td>{sp.ten_sp}</td>
                            <td><img src={sp.hinh} alt={sp.ten_sp} /></td>
                            <td>
                                <input type="number" defaultValue={sp.so_luong}
                                    onClick={e => dispath(suaSL([sp.id, e.target.value]))} />
                            </td>
                            <td>{Number(sp.gia*sp.so_luong).toLocaleString("vi")} VNĐ</td>
                            <td>{Number(sp.gia_km).toLocaleString("vi")} VNĐ</td>
                            <td>{sp.ngay}</td>
                            <td>
                                <Link to='/thanhtoan'>Thanh toán</Link>
                                <span> <a href="#" onClick={() => dispath(xoaSP(sp.id))}>Xóa sản phẩm</a> </span>
                            </td>
                        </tr>
                )
            })}
            </table>
            <button onClick={clearCart}>Xóa tất cả</button>
        </div>
    );
}
export default ShowCart;