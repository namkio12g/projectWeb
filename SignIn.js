var khachhang = JSON.parse(window.localStorage.getItem("khachhang"))
console.log(khachhang);
if (khachhang != null) {

    document.querySelector('.resign a span').innerHTML = 'logout';
    document.querySelector('.sign_in a span').innerHTML = khachhang.TenKH;
    document.querySelector('.sign_in a').setAttribute('onclick', 'openCartList()');
    document.querySelector('.resign a').setAttribute('onclick', 'logout()');

}

function logout() {
    localStorage.removeItem("khachhang");
    location.reload()
}

function signin() {
    var userlist = JSON.parse(localStorage.getItem("user"));
    var usernameinput = document.getElementById("usernametxt").value;
    var passwordinput = document.getElementById("passwordtxt").value;
    var checkusername = null;
    checkusername = userlist.filter(function (user) {
        return user.Username == usernameinput
    });
    if (checkusername.length != 0 && checkusername[0].Password == passwordinput) {

        Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công',
            showConfirmButton: false,
        })
        if (checkusername[0].Level == 0) {

            khachhang = {
                TenKH: checkusername[0].Realname,
                SDTKH: checkusername[0].SDT

            }
            window.localStorage.setItem("khachhang", JSON.stringify(khachhang))

            setTimeout(() => {
                location.href = "project.html";
            }, 500);
        } else {
            Swal.fire({
                title: 'You are admin',
                text: "do you want to go admin page!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes !'
            }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(() => {
                        location.href = "Admin.html";
                    }, 500);

                } else {
                    khachhang = {
                        TenKH: checkusername[0].Realname,
                        SDTKH: checkusername[0].SDT

                    }
                    window.localStorage.setItem("khachhang", JSON.stringify(khachhang))

                    setTimeout(() => {
                        location.href = "project.html";
                    }, 500);
                }
            })


        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'sai thông tin đăng nhập',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

function openformResign() {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('resign-form').style.display = 'block';
    document.getElementById('sign-in-form').style.display = 'none';
}

function checkResign() {
    var usernameinput = document.getElementById("usernametxt1");
    if (usernameinput.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'valid username',
            showConfirmButton: false,
            timer: 1000
        })
        usernameinput.focus();
        return false;
    }

    var realname = document.getElementById("realnametxt");
    if (realname.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'valid realname',
            showConfirmButton: false,
            timer: 1000
        })
        realname.focus();
        return false;
    }

    var phone = document.getElementById("phonetxt");
    if (phone.value == "" || isNaN(phone.value) || parseInt(phone.value) < 0) {
        Swal.fire({
            icon: 'error',
            title: 'valid Phone number',
            showConfirmButton: false,
            timer: 1000
        })
        phone.focus();
        return false;
    }

    var passwordinput = document.getElementById("passwordtxt1");
    if (passwordinput.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'valid password',
            showConfirmButton: false,
            timer: 1000
        })
        passwordinput.focus;
        return false;
    }

    var cfpassword = document.getElementById("cfpasswordtxt")
    if (cfpassword.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'something wrong',
            showConfirmButton: false,
            timer: 1000
        })
        cfpassword.focus;
        return false;
    }

    if (passwordinput.value != cfpassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'the confirm password is not match',
            showConfirmButton: false,
            timer: 1000
        })
        return false;
    }
    var userlist = JSON.parse(localStorage.getItem("user"));
    var checkDouble = null;
    checkDouble = userlist.filter(function (user) {
        return user.Username == usernameinput.value
    });
    console.log(checkDouble);
    if (checkDouble.length != 0) {
        alert("user da ton tai")
        usernameinput.focus();
        return false;
    }

    return true;
}

function resign() {
    if (checkResign()) {
        var userlist = JSON.parse(localStorage.getItem("user"));
        var usernameinput = document.getElementById("usernametxt1").value;
        var realname = document.getElementById("realnametxt").value;
        var phone = document.getElementById("phonetxt").value
        var passwordinput = document.getElementById("passwordtxt1").value;
        var cfpassword = document.getElementById("cfpasswordtxt").value;
        if (passwordinput != cfpassword) {
            alert("Sai mật khẩu");
        } else {
            var user = {
                Username: usernameinput,
                Password: passwordinput,
                Realname: realname,
                SDT: phone,
                Level: 0
            }
            userlist.push(user);
            localStorage.setItem("user", JSON.stringify(userlist));
            alert("Đăng ký thành công");
        }
    }
}

function closeform() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('resign-form').style.display = 'none';
    document.getElementById('sign-in-form').style.display = 'none';
}

function openform() {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('sign-in-form').style.display = 'block';
}