const mysql = require('mysql');
const exp = require("express");
const app = exp();
var cors = require('cors');
app.use([cors(), exp.json()]);
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'laptop_react'
});
db.connect(err => { if (err) throw err; console.log('Da ket noi database') });

//Route lấy sản phẩm mới
app.get('/spmoi/:sosp?', function (req, res) {
    let sosp = parseInt(req.param.sosp || 8);
    if (sosp <= 1) sosp = 8;
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE an_hien=1 ORDER BY ngay desc LIMIT 0,?`;
    db.query(sql, sosp, (err, data) => {
        if (err) res.json({ "thongbao": "Loi lay san pham", err })
        else res.json(data);
    }
    )
})
//Route lấy Menu
app.get('/loai', function (req, res) {
    let sql = `SELECT id, ten_loai FROM loai`
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "lỗi lấy loại", err })
        else res.json(data);
    })
})

//Route lấy chi tiết 1 sản phẩm
app.get('/sp/:id', function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thongbao": "Không biết sản phẩm", "id": id });
        return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE id=?`
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "lỗi lấy 1 sản phẩm", err })
        else res.json(data[0]);
    })
})

//Route lấy sản phẩm trong loại
app.get('/sptrongloai/:id_loai', function (req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thongbao": "Không biết loại", "id_loai": id_loai });
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay
    FROM san_pham WHERE id_loai=? AND an_hien=1 ORDER BY id desc`;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy sản phẩm trong loại", err })
        else res.json(data);
    })
})

//Route lấy thông tin một loại
app.get('/loai/:id_loai', function (req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thongbao": "Không biết loại", "id_loai": id_loai });
        return;
    }
    let sql = `SELECT id, ten_loai FROM loai WHERE id=?`;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "lỗi lấy loại", err })
        else res.json(data[0]);
    });
})

//TÌm kiếm sản phẩm
app.get('/search', function (req, res) {
    let keyword = req.query.keyword;
    if (!keyword) {
        res.json({ "thongbao": "Không có từ khóa tìm kiếm" });
        return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE an_hien=1 AND (ten_sp LIKE ? OR mo_ta LIKE ?) ORDER BY ngay desc`;
    let searchKeyword = `%${keyword}%`;
    db.query(sql, [searchKeyword, searchKeyword], (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi tìm kiếm sản phẩm", err });
        else res.json(data);
    });
});
//Route lưu đơn hàng
app.post('/luudonhang/', function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO don_hang SET ?`;
    db.query(sql, data, function (err, data) {
        if (err) {
            res.json({ "id_dh": -1, "thongbao": "Lỗi lưu đơn hàng", err })
        } else {
            id_dh = data.insertId
            res.json({"id_dh":id_dh, "thongbao":"Đã lưu đơn hàng"});
        }
    })
})
//Route lưu giỏ hàng
app.post('/luugiohang/', function(req, res){
    let data = req.body;
    let sql = `INSERT INTO don_hang_chi_tiet SET ?`;
    db.query(sql, data, function(err, data){
        if(err){
            res.json({"thongbao":"Lỗi lưu sản phẩm", err})
        } else {
            res.json({"thongbao":"Đã lưu sản phẩm vào database", "id_sp":data.id_sp})
        }
    })  
})
app.listen(3000, () => console.log(`Ung dung dang chay voi port 3000`));
module.exports = db;