var action = "";
var hdaction = "";
var active = "";
var retrievedPhone = JSON.parse(localStorage.getItem("phone"));
//tranght -1 * sospcua1 trang
function opennew(btn) {
	action = btn.id.toString();
	switch (action) {
		case "newphone":
			clearinput();
			break;
		case "editphone":
			editp();
			break;
		case "edithd":
			edithd();
			break;
	}
	document.getElementById('addphone').style.display = 'flex';
	document.getElementById('addhdform').style.display = 'none';
	document.getElementById('cthdform').style.display = 'none';
	document.getElementById('adduserform').style.display = 'none';
	document.getElementById('addphoneform').style.display = 'block';
}
function closeform() {
	document.getElementById('addphone').style.display = 'none';
}
function checkinput() {
	if (document.getElementById('phoneid').value == "") {
		alert("phone ID NULL");
		return false;
	}
	if (document.getElementById('phonename').value == "") {
		alert("phone Name NULL");
		return false;
	}
	if (document.getElementById('phoneprice').value == "") {
		alert("phone price NULL");
		return false;
	}
	if (document.getElementById('phonebrand').value == "") {
		alert("phone brand NULL");
		return false;
	}
	if (document.getElementById('phoneos').value == "") {
		alert("phone OS NULL");
		return false;
	}
	return true;
}
function getallphone() {
	var hst = document.getElementById("phonetable");
	var arr = JSON.parse(localStorage.getItem("phone"));
	if (arr == null) {
		var phone = [
			{ ID: "6001", Name: "IPX", Price: "3000", OS: "IOS", Brand: "Apple", img: "image/phone.jpg" },
			{ ID: "7451", Name: "SamsungA12", Price: "2000", OS: "Android", Brand: "Samsung", img: "image/phone.jpg" },
			{ ID: "713", Name: "IP11", Price: "4000", OS: "IOS", Brand: "Apple", img: "image/phone.jpg" },
		];
		localStorage.setItem("phone", JSON.stringify(phone));
	}
	var retrievedPhone = JSON.parse(localStorage.getItem("phone"));
	for (var i = 0; i < retrievedPhone.length; i++) {
		hst.innerHTML += "<tr><td>" + retrievedPhone[i].ID + "</td><td>"
			+ retrievedPhone[i].Name + "</td><td> "
			+ retrievedPhone[i].Price + "</td><td>"
			+ retrievedPhone[i].OS + "</td><td>"
			+ retrievedPhone[i].Brand + "</td><td><img src="
			+ retrievedPhone[i].img + " width = 100 height = 100></td><td><a href='#'><i id='editphone' onclick='opennew(this)' class='fa-solid fa-pen-nib'></i></a>"
			+ "<a href='#'<i onclick='delphone()' class='fa-solid fa-trash'></i></a></td>" + "</td></tr>";
	}
}
function delphone() {
	if (confirm('Are you sure ?')) {
		var table = document.getElementById('phonetable');
		//get id
		for (var i = 1; i < table.rows.length; i++) {
			table.rows[i].onclick = function () {
				var phoneid = this.cells[0].innerHTML;
				var filteredArray = retrievedPhone.filter(function (phone) { return phone.ID !== phoneid })
				localStorage.setItem("phone", JSON.stringify(filteredArray));
				delrow(table);
				getallphone();
			};
		}
	}
}
function phoneaction() {
	if (checkinput()) {
		var pimg = "";
		var pid = document.getElementById('phoneid').value;
		var pname = document.getElementById('phonename').value;
		var price = document.getElementById('phoneprice').value;
		var os = document.getElementById('phoneos').value;
		var brand = document.getElementById('phonebrand').value;
		var fullpath = document.getElementById('phoneimgupload').value;
		var imgname = fullpath.split(/(\\|\/)/g).pop();
		if (imgname == "")
			pimg = document.getElementById("phoneimg").src;
		else
			pimg = "image/" + imgname;
		let newp = {
			ID: pid,
			Name: pname,
			Price: price,
			OS: os,
			Brand: brand,
			img: pimg
		};
		if (action == "newphone") {
			retrievedPhone.push(newp);
			localStorage.setItem("phone", JSON.stringify(retrievedPhone));
		}
		else {
			for (var i = 0; i < retrievedPhone.length; i++) {
				var editphone = retrievedPhone[i];
				if (editphone.ID == pid) {
					editphone.Name = pname;
					editphone.Price = price;
					editphone.OS = os;
					editphone.Brand = brand;
					editphone.img = pimg;
					localStorage.setItem("phone", JSON.stringify(retrievedPhone));
					break;
				}
			}
		}
		closeform();
		delrow(document.getElementById("phonetable"));
		getallphone();
	}
}
function openphone() {
	var hd = document.getElementById('hdtbl');
	var p = document.getElementById('ptbl');
	var u = document.getElementById("usertbl");
	var s = document.getElementById("statistictbl");
	if (active !== "phone") {
		active = "phone";
		hd.style.display = "none";
		u.style.display = "none";
		s.style.display = "none";
		p.style.display = "block";
	}
}
function openhd() {
	var hd = document.getElementById('hdtbl');
	var s = document.getElementById("statistictbl");
	var p = document.getElementById('ptbl');
	var u = document.getElementById("usertbl");
	if (active !== "hoadon") {
		active = "hoadon";
		p.style.display = "none";
		s.style.display = "none";
		u.style.display = "none";
		hd.style.display = "block";
	}
}
function preview() {
	var img = document.getElementById('phoneimg');
	img.src = URL.createObjectURL(event.target.files[0]);
}
function getphone(phone) {
	document.getElementById('phoneid').disabled = true;
	document.getElementById('phoneid').value = phone.ID;
	document.getElementById('phonename').value = phone.Name;
	document.getElementById('phoneprice').value = phone.Price;
	document.getElementById('phonebrand').value = phone.Brand;
	document.getElementById('phoneos').value = phone.OS;
	document.getElementById('phoneimg').src = phone.img;
}
function delimg() {
	document.getElementById('phoneimg').src = "";
	document.getElementById('phoneimgupload').value = "";
}
function clearinput() {
	document.getElementById('phoneid').disabled = false;
	document.getElementById('phoneid').value = "";
	document.getElementById('phonename').value = "";
	document.getElementById('phoneprice').value = "";
	document.getElementById('phoneos').value = "";
	document.getElementById('phonebrand').value = "";
	document.getElementById('phoneimg').src = "";
}
function editp() {
	var table = document.getElementById('phonetable');
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].onclick = function () {
			var phoneid = this.cells[0].innerHTML;
			let phone = retrievedPhone.find(phone => phone.ID == phoneid);
			getphone(phone);
		};
	}
}
function checkid(phone) {
	var searchtxt = document.getElementById("searchtxt").value;
	return phone.ID === searchtxt;
}
function checkname(phone) {
	var searchtxt = document.getElementById("searchtxt").value;
	return phone.Name.toLowerCase().includes(searchtxt.toLowerCase());
}
function checkbrand(phone) {
	var searchtxt = document.getElementById("searchtxt").value;
	return phone.Brand.toLowerCase().includes(searchtxt.toLowerCase());
}
function checkos(phone) {
	var searchtxt = document.getElementById("searchtxt").value;
	return phone.OS.toLowerCase().includes(searchtxt.toLowerCase());
}
function delrow(myTable) {
	var rowCount = myTable.rows.length;
	for (var x = rowCount - 1; x > 0; x--) {
		myTable.deleteRow(x);
	}
}
function search() {
	var allp = JSON.parse(localStorage.getItem("phone"));
	var table = document.getElementById("phonetable");
	delrow(table);
	var stype = document.getElementById("psearchtype").value;
	var retrievedPhone = null;
	switch (stype) {
		case "ID":
			retrievedPhone = allp.filter(checkid);
			break;
		case "Name":
			retrievedPhone = allp.filter(checkname);
			break;
		case "Brand":
			retrievedPhone = allp.filter(checkbrand);
			break;
		case "OS":
			retrievedPhone = allp.filter(checkos);
			break;
	}
	for (var i = 0; i < retrievedPhone.length; i++) {
		table.innerHTML += "<tr><td>" + retrievedPhone[i].ID + "</td><td>"
			+ retrievedPhone[i].Name + "</td><td> "
			+ retrievedPhone[i].Price + "</td><td>"
			+ retrievedPhone[i].OS + "</td><td>"
			+ retrievedPhone[i].Brand + "</td><td><img src="
			+ retrievedPhone[i].img + " width = 100 height = 100></td><td><a href='#'><i id='editphone' onclick='opennew(this)' class='fa-solid fa-pen-nib'></i></a>"
			+ "<a href='#'<i onclick='delphone()' class='fa-solid fa-trash'></i></a></td>" + "</td></tr>";
	}
}
//--------------------------HOADON'S SCRIPT------------------------------------------------------------------//

function getallhd() {
	var hst = document.getElementById("hdtable");
	var arr = JSON.parse(localStorage.getItem("hoadon"));
	if (arr == null) {
		var hoadon = [
			{ ID: "001", TenKH: "NguyenVanA", SDTKH: "3000", Ngay: "2018/01/11", Tongtien: 700, Tinhtrang: "processed" },
			{ ID: "004", TenKH: "NguyenVanB", SDTKH: "090325761", Ngay: "2022/09/10", Tongtien: 1200, Tinhtrang: "unprocessed" },
			{ ID: "007", TenKH: "TranVanC", SDTKH: "090784261", Ngay: "2018/03/11", Tongtien: 3600, Tinhtrang: "unprocessed" },
		];
		localStorage.setItem("hoadon", JSON.stringify(hoadon));
	}
	var retrievedPhone = JSON.parse(localStorage.getItem("hoadon"));
	for (var i = 0; i < retrievedPhone.length; i++) {
		hst.innerHTML += "<tr><td>" + retrievedPhone[i].ID + "</td><td>"
			+ retrievedPhone[i].TenKH + "</td><td> "
			+ retrievedPhone[i].SDTKH + "</td><td>"
			+ retrievedPhone[i].Ngay + "</td><td>"
			+ retrievedPhone[i].Tongtien + "</td>"
			+ "<td><a href='#' id='edithd' onclick='hdopennew(this)'>" + retrievedPhone[i].Tinhtrang + "</a></td>"
			+ "<td><a href='#'<i class='fa-solid fa-receipt' id='newcthd' onclick='cthdopennew(this)' ></i></a>"
			+ "<a href='#'<i onclick='delhd()' class='fa-solid fa-trash'></i></a></td></tr>";
	}

}
function hdopennew(btn) {
	hdaction = btn.id.toString();
	if (hdaction == "newhd") {
		hdclearinput();
	}
	else
		edithd();
	document.getElementById('addphoneform').style.display = 'none';
	document.getElementById('addphone').style.display = 'flex';
	document.getElementById('addhdform').style.display = 'block';
	document.getElementById('cthdform').style.display = 'none';
}
function edithd() {
	var retrievedhd = JSON.parse(localStorage.getItem("hoadon"));
	var table = document.getElementById('hdtable');
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].onclick = function () {
			var hdid = this.cells[0].innerHTML;
			let hoadon = retrievedhd.find(hoadon => hoadon.ID === hdid);
			gethd(hoadon);
		};
	}
}
function gethd(hoadon) {
	document.getElementById('hdid').disabled = true;
	document.getElementById('hdid').value = hoadon.ID;
	document.getElementById('TenKH').value = hoadon.TenKH;
	document.getElementById('SDTKH').value = hoadon.SDTKH;
	document.getElementById('Ngay').value = hoadon.Ngay;
	document.getElementById('Tongtien').value = hoadon.Tongtien;
	if (hoadon.Tinhtrang === "processed")
		document.getElementById('tinhtrang').checked = true;
	else
		document.getElementById('tinhtrang').checked = false;
}
function hdclearinput() {
	document.getElementById('hdid').value = "";
	document.getElementById('TenKH').value = "";
	document.getElementById('SDTKH').value = "";
	document.getElementById('Ngay').value = "";
	document.getElementById('Tongtien').value = "";
	document.getElementById('tinhtrang').checked = false;
}
function checkhdid(hd) {
	var searchtxt = document.getElementById("searchhdtxt").value;
	return hd.ID === searchtxt;
}
function checktenkh(hd) {
	var searchtxt = document.getElementById("searchhdtxt").value;
	return hd.TenKH.toLowerCase().includes(searchtxt.toLowerCase());
}
function checksdtkh(hd) {
	var searchtxt = document.getElementById("searchhdtxt").value;
	return hd.SDTKH.toLowerCase().includes(searchtxt.toLowerCase());
}
function checkngay(hd) {
	var searchtxt = document.getElementById("searchhdtxt").value;
	return hd.Ngay.toLowerCase().includes(searchtxt.toLowerCase());
}
function checktinhtrang(hd) {
	var searchtxt = document.getElementById("searchhdtxt").value;
	return hd.Tinhtrang.toLowerCase().includes(searchtxt.toLowerCase());
}
function hdsearch() {
	var allp = JSON.parse(localStorage.getItem("hoadon"));
	var table = document.getElementById("hdtable");
	delrow(table);
	var stype = document.getElementById("hdsearchtype").value;
	var retrievedPhone = JSON.parse(localStorage.getItem("hoadon"));
	switch (stype) {
		case "ID":
			retrievedPhone = allp.filter(checkhdid);
			break;
		case "TenKH":
			retrievedPhone = allp.filter(checktenkh);
			break;
		case "SDTKH":
			retrievedPhone = allp.filter(checksdtkh);
			break;
		case "Ngay":
			retrievedPhone = allp.filter(checkngay);
			break;
		case "TinhTrang":
			retrievedPhone = allp.filter(checktinhtrang);
			break;
	}
	for (var i = 0; i < retrievedPhone.length; i++) {
		table.innerHTML += "<tr><td>" + retrievedPhone[i].ID + "</td><td>"
			+ retrievedPhone[i].TenKH + "</td><td> "
			+ retrievedPhone[i].SDTKH + "</td><td>"
			+ retrievedPhone[i].Ngay + "</td><td>"
			+ retrievedPhone[i].Tongtien + "</td>"
			+ "<td><a href='#' id='edithd' onclick='hdopennew(this)'>" + retrievedPhone[i].Tinhtrang + "</a></td>"
			+ "<td><a href='#'<i class='fa-solid fa-receipt' id='newcthd' onclick='cthdopennew(this)' ></i></a>"
			+ "<a href='#'<i onclick='delhd()' class='fa-solid fa-trash'></i></a></td></tr>";
	}
}
function delhd() {
	if (confirm('Are you sure ?')) {
		var table = document.getElementById('hdtable');
		var arr = JSON.parse(localStorage.getItem("hoadon"));
		for (var i = 1; i < table.rows.length; i++) {
			table.rows[i].onclick = function () {
				var hdid = this.cells[0].innerHTML;
				var filteredArray = arr.filter(function (hoadon) { return hoadon.ID != hdid })
				localStorage.setItem("hoadon", JSON.stringify(filteredArray));
				var CTHDarr = JSON.parse(localStorage.getItem("cthd"));
				var filteredArray2 = CTHDarr.filter(function (cthd) { return cthd.IDHD != hdid })
				localStorage.setItem("hoadon", JSON.stringify(filteredArray));
				localStorage.setItem("cthd", JSON.stringify(filteredArray2));
				delrow(table);
				getallhd();
			};
		}
	}

}
function hdformaction() {
	var hdid = document.getElementById('hdid').value;
	var tenkh = document.getElementById('TenKH').value;
	var sdtkh = document.getElementById('SDTKH').value;
	var ngay = document.getElementById('Ngay').value;
	var checkbox = document.getElementById('tinhtrang');
	var tinhtrang = "";
	if (checkbox.checked == true)
		tinhtrang = "processed";
	else
		tinhtrang = "unprocessed";
	var retrievedhd = JSON.parse(localStorage.getItem("hoadon"));
	let newhd = {
		ID: hdid,
		TenKH: tenkh,
		SDTKH: sdtkh,
		Ngay: ngay,
		Tinhtrang: tinhtrang,
	};
	if (hdaction == "newhd") {
		retrievedhd.push(newhd);
		localStorage.setItem("hoadon", JSON.stringify(retrievedhd));
	}
	else {
		for (var i = 0; i < retrievedhd.length; i++) {
			var editphone = retrievedhd[i];
			if (editphone.ID == hdid) {
				editphone.TenKH = tenkh;
				editphone.SDTKH = sdtkh;
				editphone.Ngay = ngay;
				editphone.Tinhtrang = tinhtrang;
				localStorage.setItem("hoadon", JSON.stringify(retrievedhd));
				break;
			}
		}
	}
	closeform();
	delrow(document.getElementById("hdtable"));
	getallhd();
}
//---------------------------------------CTHD SCRIPT-----------------------------------------------------------//

function cthdopennew(btn) {
	document.getElementById('addphoneform').style.display = 'none';
	document.getElementById('addphone').style.display = 'flex';
	document.getElementById('addhdform').style.display = 'none';
	document.getElementById('adduserform').style.display = 'none';
	document.getElementById('cthdform').style.display = 'block';
	cthdonclick();
}
function intcthd() {
	var arr = JSON.parse(localStorage.getItem("cthd"));
	if (arr == null) {
		var cthd = [
			{ IDHD: "001", IDSP: "6001", SL: 1 },
			{ IDHD: "001", IDSP: "7451", SL: 2 },
			{ IDHD: "004", IDSP: "6001", SL: 1 },
			{ IDHD: "004", IDSP: "713", SL: 1 },
			{ IDHD: "004", IDSP: "7451", SL: 1 },
			{ IDHD: "007", IDSP: "713", SL: 1 },
			{ IDHD: "007", IDSP: "6001", SL: 3 },
		];
		localStorage.setItem("cthd", JSON.stringify(cthd));
	}
}
function getcthd(hdid) {
	var table = document.getElementById('cthdtable');
	delrow(table);
	var retrievedPhone = JSON.parse(localStorage.getItem("phone"));
	var arr = JSON.parse(localStorage.getItem("cthd"));
	var filteredArray = arr.filter(function (cthd) { return cthd.IDHD == hdid });
	for (var i = 0; i < filteredArray.length; i++) {
		let foundphone = retrievedPhone.find(phone => phone.ID === filteredArray[i].IDSP);
		table.innerHTML += "<tr><td>" + filteredArray[i].IDSP + "</td><td>"
			+ foundphone.Name + "</td><td>"
			+ filteredArray[i].SL + "</td><td> "
			+ foundphone.Price + "</td><td>"
			+ "<a href='#'<i onclick='delSPfromCTHD()' class='fa-solid fa-trash'></i></a></td></tr>";
	}

	var total = caltongtien();
	document.getElementById("thanhtien").innerHTML = "Total: " + total + "$";
	document.getElementById("cthdid").innerHTML = "ID HoaDon: " + filteredArray[0].IDHD;
	settotal(filteredArray[0].IDHD, total);
}
function cthdonclick() {
	var table = document.getElementById('hdtable');
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].onclick = function () {
			var hdid = this.cells[0].innerHTML;
			getcthd(hdid);
		}
	}
}
function delSPfromCTHD() {
	var table = document.getElementById("cthdtable");
	var arr = JSON.parse(localStorage.getItem("cthd"));
	var string = document.getElementById("cthdid").innerHTML;
	var id = string.replace("ID HoaDon: ", "");
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].onclick = function () {
			var spid = this.cells[0].innerHTML;
			var filteredArray = arr.filter(function (cthd) { return cthd.IDSP != spid || cthd.IDHD != id });
			delrow(table);
			localStorage.setItem("cthd", JSON.stringify(filteredArray));
			getcthd(id);
		}
	}
	var total = caltongtien();
	settotal(id, total);
}
function settotal(idhd, tongtien) {
	var retrievedhd = JSON.parse(localStorage.getItem("hoadon"));
	for (var i = 0; i < retrievedhd.length; i++) {
		let retrievedHD = retrievedhd[i];
		if (idhd == retrievedHD.ID) {
			retrievedHD.Tongtien = tongtien;
			localStorage.setItem("hoadon", JSON.stringify(retrievedhd));
			break;
		}
	}
}
function closeformcthd() {
	delrow(document.getElementById("hdtable"));
	getallhd();
	document.getElementById('addphone').style.display = 'none';
}
function caltongtien() {
	var table = document.getElementById('cthdtable');
	var total = 0;
	for (var i = 1; i < table.rows.length; i++) {
		var sl = table.rows[i].cells[2].innerHTML;
		var price = table.rows[i].cells[3].innerHTML;
		total = total + (sl * price);
	}
	return total;

}
//---------------------------------------------------USER's SCRIPT-----------------------------------------------
var useraction = "";
function openuser() {
	var hd = document.getElementById('hdtbl');
	var p = document.getElementById('ptbl');
	var u = document.getElementById("usertbl");
	var s = document.getElementById("statistictbl");
	if (active !== "user") {
		active = "user";
		s.style.display = "none";
		hd.style.display = "none";
		p.style.display = "none";
		u.style.display = "block";
	}
	getalluser();
}
function userclearinput() {
	document.getElementById('username').value = "";
	document.getElementById('password').value = "";
	document.getElementById('level').value = "";
}
function useropennew(btn) {
	useraction = btn.id.toString();
	if (useraction == "newuser") {
		userclearinput();
	}
	else
		edituser();
	document.getElementById('addphoneform').style.display = 'none';
	document.getElementById('addphone').style.display = 'flex';
	document.getElementById('addhdform').style.display = 'none';
	document.getElementById('cthdform').style.display = 'none';
	document.getElementById('adduserform').style.display = 'block';
}
function getalluser() {
	var table = document.getElementById("usertable");
	var arr = JSON.parse(localStorage.getItem("user"));
	if (arr == null) {
		var user = [
			{ Username: "Admin1", Password: 123,Realname: "Nguyen Van A",SDT:"113" ,Level: 1 },
			{ Username: "Enduser1", Password: 123,Realname: "Nguyen Van B",SDT:"114", Level: 0 },
			{ Username: "Enduser2", Password: 123, Realname: "Tran Van C",SDT:"115",Level: 0 },

		];
		localStorage.setItem("user", JSON.stringify(user));
	}
	arr = JSON.parse(localStorage.getItem("user"));
	for (var i = 0; i < arr.length; i++) {
		table.innerHTML += "<tr><td>" + arr[i].Username + "</td><td>"
			+ arr[i].Password + "</td><td> "
			+ arr[i].Realname +"</td><td> "
			+ arr[i].SDT + "</td><td> "
			+ arr[i].Level + "</td><td>"
			+ "<a href='#'><i id='edituser' onclick='useropennew(this)' class='fa-solid fa-pen-nib'></i></a>"
			+ "<a href='#'<i onclick='deluser()' class='fa-solid fa-trash'></i></a></td></tr>";
	}
}
function getuser(user) {
	document.getElementById("username").value = user.Username;
	document.getElementById("password").value = user.Password;
	document.getElementById("realname").value = user.Realname;
	document.getElementById("sdt").value = user.SDT;
	document.getElementById("level").value = user.Level;
}
function edituser() {
	var arr = JSON.parse(localStorage.getItem("user"));
	var table = document.getElementById('usertable');
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].onclick = function () {
			var un = this.cells[0].innerHTML;
			let user = arr.find(user => user.Username == un);
			getuser(user);
		};
	}
}
function deluser() {
	if (confirm('Are you sure ?')) {
		var table = document.getElementById('usertable');
		var arr = JSON.parse(localStorage.getItem("user"));
		for (var i = 1; i < table.rows.length; i++) {
			table.rows[i].onclick = function () {
				var un = this.cells[0].innerHTML;
				var filteredArray = arr.filter(function (user) { return user.Username !== un })
				localStorage.setItem("user", JSON.stringify(filteredArray));
				delrow(table);
				getalluser();
			};
		}
	}
}
function userformaction() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var level = document.getElementById('level').value;
	var realname = document.getElementById('realname').value;
	var sdt = document.getElementById('sdt').value;
	var arr = JSON.parse(localStorage.getItem("user"));
	let newuser = {
		Username: username,
		Password: password,
		Realname: realname,
		SDT: sdt,
		Level: level,	
	};
	if (useraction == "newuser") {
		arr.push(newuser);
		localStorage.setItem("user", JSON.stringify(arr));
	}
	else {
		for (var i = 0; i < arr.length; i++) {
			var edituser = arr[i];
			if (edituser.Username == username) {
				edituser.Password = password;
				edituser.Level = level;
				edituser.Realname = realname;
				edituser.SDT = sdt;
				localStorage.setItem("user", JSON.stringify(arr));
				break;
			}
		}
	}
	closeform();
	delrow(document.getElementById("usertable"));
	getalluser();
}
function searchuser() {
	var userarr = JSON.parse(localStorage.getItem("user"));
	var table = document.getElementById("usertable");
	delrow(table);
	var stype = document.getElementById("usersearchtype").value;
	var arr = null;
	var searchkey = document.getElementById("searchusertxt").value;
	if (stype == "Username")
		arr = userarr.filter(function (user) {
			return user.Username.toLowerCase().includes(searchkey.toLowerCase());
		})
	else
		arr = userarr.filter(function (user) { return user.Level == searchkey })
	for (var i = 0; i < arr.length; i++) {
		table.innerHTML += "<tr><td>" + arr[i].Username + "</td><td>"
			+ arr[i].Password + "</td><td> "
			+ arr[i].Realname +"</td><td> "
			+ arr[i].SDT + "</td><td> "
			+ arr[i].Level + "</td><td>"
			+ "<a href='#'><i id='edituser' onclick='useropennew(this)' class='fa-solid fa-pen-nib'></i></a>"
			+ "<a href='#'<i onclick='deluser()' class='fa-solid fa-trash'></i></a></td></tr>";
	}
}
//---------------------------------------------------------STATISTCS-----------------------------------------------
function openstatistic() {
	var hd = document.getElementById('hdtbl');
	var s = document.getElementById("statistictbl");
	var p = document.getElementById('ptbl');
	var u = document.getElementById("usertbl");
	if (active !== "statistic") {
		active = "statistic";
		p.style.display = "none";
		u.style.display = "none";
		hd.style.display = "none";
		s.style.display = "block";
	}
}
function getarr(){
	var searchkey = document.getElementById("searchsstxt").value;
	var retrievedPhone = JSON.parse(localStorage.getItem("phone"));
	var retrievedhd = JSON.parse(localStorage.getItem("hoadon"));
	var retrievedcthd = JSON.parse(localStorage.getItem("cthd"));
	var st = document.getElementById("ssearchtype").value;
	var hdarr = [];
	var cthdarr = [];
	var idarr = [];
	if (st == "Today") {
		let today = new Date().toLocaleDateString();
		hdarr = retrievedhd.filter(function (hoadon) {
			return today === new Date(hoadon.Ngay).toLocaleDateString();
		});
	}
	if(st == "This month"){
		let month = new Date().getMonth();
		let year = new Date().getFullYear();
		hdarr = retrievedhd.filter(function (hoadon) {
			return (month == new Date(hoadon.Ngay).getMonth() && year == new Date(hoadon.Ngay).getFullYear());
		});
	}
	if(st == "This year"){
		let year = new Date().getFullYear();
		hdarr = retrievedhd.filter(function (hoadon) {
			return  year == new Date(hoadon.Ngay).getFullYear();
		});
	}
	if (st == "ALL")
		hdarr = retrievedhd;
	localStorage.setItem("hdarr", JSON.stringify(hdarr));
		for (var i = 0; i < hdarr.length; i++) {
			idarr[i] = hdarr[i].ID;
		}

		cthdarr = retrievedcthd.filter(function (cthd) { return idarr.includes(cthd.IDHD); });
		localStorage.setItem("testcthd", JSON.stringify(cthdarr));
		for (i = 0; i < cthdarr.length; i++) {
			idarr[i] = cthdarr[i].IDSP;
		}
	var stat = [];
	for (i = 0; i < cthdarr.length; i++) {
		let phone = retrievedPhone.find(phone => phone.ID == cthdarr[i].IDSP) //&& phone.Brand.toLowerCase().includes(searchkey.toLowerCase()));
		var newstat = {
			IDSP: cthdarr[i].IDSP,
			Name: phone.Name,
			SL: cthdarr[i].SL,
			Brand: phone.Brand,
			Price: phone.Price,
			money: null
		};
		stat.push(newstat);
		stat = stat.filter(phone => phone.Brand.toLowerCase().includes(searchkey.toLowerCase()));
	}
	localStorage.setItem("return arr", JSON.stringify(stat));
	return stat;
}
function CAl() {
	var table = document.getElementById("statistictable");
	delrow(table);
	var sparr = getarr();
	sparr = calSL(sparr);
	for (var i = 0; i < sparr.length; i++) {
		table.innerHTML += "<tr><td>" + sparr[i].IDSP + "</td><td>"
			+ sparr[i].Name + "</td><td>"
			+ sparr[i].SL + "</td><td>"
			+ sparr[i].Price * sparr[i].SL + "</td></tr>";
	}
}
function calSL(arr1) {
	var sl = 0;
	var id = null;
	var out = [];
	var temparr = [];
	while(arr1.length>0){
  sl = 0
  id = arr1[0].IDSP;
  temparr = arr1.filter(phone => phone.IDSP == id);
  for (var j = 0; j<temparr.length;j++){
    sl += temparr[j].SL; 
  }
  arr1[0].SL = sl;
  out.push(arr1[0]);
  arr1 = arr1.filter(phone => phone.IDSP != id)
}
	return out;
}