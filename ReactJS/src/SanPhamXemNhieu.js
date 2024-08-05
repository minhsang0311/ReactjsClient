import { listsp } from "./data";

function SanPhamXemNhieu() {
    let jsxcode =
        <div id="spxn">
            {listsp.slice(0,6).map((sp,i) =>
                <div className="sp" key={i}>{sp.ten_sp}</div>
            )}
        </div>
    return (jsxcode)
}

export default SanPhamXemNhieu;