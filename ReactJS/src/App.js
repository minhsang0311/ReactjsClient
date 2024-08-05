import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu';
import Home from './Home'
import Header from './Header'
import Spinner from './Spinner';
import './App.css';
import ChiTiet from "./ChiTiet";
import SPTrongLoai from "./SPTrongLoai";
import TimKiem from "./TimKiem";
import NotFound from "./NotFound";
import ShowCart from "./ShowCart";
import ThanhToan from "./ThanhToan";

function App() {
  return (
    <BrowserRouter basename="/">
      <div className='container'>
        <header><Header /></header>
        <nav> <Menu /></nav>
        <main className=''>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/sp/:id" element={<ChiTiet />} />
            <Route path="/loai/:id_loai" element={<SPTrongLoai />} />
            <Route path="/search" element={<TimKiem />} />
            <Route path="/showcart/" element={<ShowCart/>} />
            <Route path="/thanhtoan/" element={<ThanhToan/>} />
            <Route element={<NotFound />} />
          </Routes>
        </main>
        <footer>Nguyễn Minh Sang <Spinner /></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
