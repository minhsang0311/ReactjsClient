
import { useState } from "react";
import HienSPTrongMotTrang from "./HienSPTrongMotTrang"
import ReactPaginate from 'react-paginate';
function PhanTrang({ listSP, pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = listSP.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);
    const chuyenTrang = (event) => {
        const newIndex = (event.selected * pageSize) % listSP.length;
        setfromIndex(newIndex);
    };
    return (
        <div> <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
            <ReactPaginate nextLabel=">" previousLabel="<" pageCount={tongSoTrang}
                pageRangeDisplayed={5} onPageChange={chuyenTrang} className="thanhphantrang"
            />
        </div>);
}
export default PhanTrang;