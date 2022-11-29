var icurrent = 0;
const list = document.querySelectorAll('.swipe-image ul li')
const list_pag = document.querySelectorAll('.slides-pagination a')

const welcomeInterval = setInterval(function () {
    if (icurrent == list.length - 1) {
        icurrent = 0;
    } else {
        icurrent++;
    }
    var iBehind = icurrent - 1;
    if (icurrent == 0) {
        iBehind = list.length - 1;
    }


    list[iBehind].style.opacity = '0';
    list_pag[iBehind].classList.remove('current');
    list[icurrent].style.opacity = '1';
    list_pag[icurrent].classList.add('current');



}, 4000)
list_pag.forEach((item, index) => {
    item.onclick = () => {
        clearInterval(welcomeInterval);
        if (index != icurrent) {
            list[icurrent].style.opacity = '0';
            list_pag[icurrent].classList.remove('current');
            list[index].style.opacity = '1';
            list_pag[index].classList.add('current');
        }
        icurrent = index

    }
})
const Welcome_moveLeftButton = document.querySelector('.swipe-image .move-left-button')
const Welcome_moveRightButton = document.querySelector('.swipe-image .move-right-button')
Welcome_moveRightButton.onclick = () => {
    clearInterval(welcomeInterval);
    var iBehind;
    if (icurrent == 2) {
        icurrent = 0
    } else {
        icurrent++;

    }
    if (icurrent == 0) {
        iBehind = 2;
    } else {
        iBehind = icurrent - 1;
    }
    list[iBehind].style.opacity = '0';
    list_pag[iBehind].classList.remove('current');
    list[icurrent].style.opacity = '1';
    list_pag[icurrent].classList.add('current');

}
Welcome_moveLeftButton.onclick = () => {
    clearInterval(welcomeInterval);
    if (icurrent == 0) {
        icurrent = 2
    } else {
        icurrent--;
    }
    var iBehind;
    if (icurrent == 2) {
        iBehind = 0;
    } else {
        iBehind = icurrent + 1;
    }
    list[iBehind].style.opacity = '0';
    list_pag[iBehind].classList.remove('current');
    list[icurrent].style.opacity = '1';
    list_pag[icurrent].classList.add('current');



}