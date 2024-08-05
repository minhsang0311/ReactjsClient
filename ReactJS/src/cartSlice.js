import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name:'cart',
    initialState:{listSP: [], },//Cấu trúc listSP sẽ như yêu cầu ở trên
    reducers: {
        themSP: (state, param) => {
            let sp = param.payload;//tham số là sản phẩm = {'id':1,'ten_sp'=>'A'}
            let index = state.listSP.findIndex(s => s.id ===sp.id);
            if(index===-1) {//sp chưa có trong giỏ hàng
                sp['so_luong']=1;
                state.listSP.push(sp);
            }
            else state.listSP[index]['so_luong']++;
            alert("Đã thêm sản phẩm "+sp.ten_sp+" vào giỏ!")
            console.log("Đã thêm sp. Số SP = ", state.listSP.length);
        },
        suaSL: (state, param) => {// Tham số là mảng 2 phần tử id  và sl. VD[5000,3]
            let id = param.payload[0];
            let so_luong = param.payload[1];
            let index = state.listSP.findIndex(s=>s.id===id);
            if(index !==1) state.listSP[index].so_luong= Number(so_luong);
            console.log("Đã sửa sp ", param)
        },
        xoaSP: (state, param) =>{//tham số là id_sp
            let id = param.payload;
            const index = state.listSP.findIndex(s => s.id ===id);
            if(index!==-1) state.listSP.splice(index, 1);    
        },
        xoaGH: state => {state.listSP =[]}
    }//reducers
});
export const { themSP, suaSL, xoaSP, xoaGH} = cartSlice.actions;
export default cartSlice.reducer;