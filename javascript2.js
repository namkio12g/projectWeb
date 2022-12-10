var container = document.querySelector('.container');
var move = 0;
var moves = [];
var branches = ['apple', 'samsung', 'xiaomi', 'oppo', 'redmi', 'nokia', 'vivo'];
var collection = [];
var ItemInterval = [];
var lengthOfPagination = 0;

const data = JSON.parse(window.localStorage.getItem("phone" || "[]"));
swipeSectionEntries(data);
// renderAllSection(data);


function titleOnclick() {
    location.reload();
}

function swipeSectionEntries(entries) {
    container.innerHTML = "";
    var index = 0;
    for (var brand of branches) {
        container.innerHTML += '<div class="section"></div>';
        var brandProduct = entries.filter(entry => entry.Brand.toLowerCase() == brand);
        if (brandProduct.length != 0) {
            container.lastElementChild.innerHTML = `
                    <div class="swipe-content">
                        <div class="content">
                            <div class="title">
                                <div class="title-block">
                                    <div class="wrap-content">
                                        <h3 class="title-group" id="${brand}">${brand.toUpperCase()}</h3>
                                        <div class="title-group-note">Happy Us</div>
                                    </div>
                                </div>
                            </div>
                            <div class="swipe-wrapper">
                            </div>
                            <button class="move-right-button" onclick="moveRightButton(${index})"><i
                                    class="bi bi-chevron-compact-right"></i></button>
                            <button class="move-left-button" onclick="moveLeftButton(${index})"><i
                                    class="bi bi-chevron-compact-left"></i></button>

                        </div>
                    </div>   `;

            swpieWrapperWrite(brandProduct, index);
            index++;
            moves.push(0);
        }
    }
    colOnclick();
    collection = document.getElementsByClassName('swipe-wrapper');

}

function swpieWrapperWrite(datas, index) {
    for (var data of datas) {

        document.getElementsByClassName('swipe-wrapper')[index].innerHTML += `

                <div class="col-lg" data-id=${data.ID}>
                    <div class="product-image">
                        <img src="${data.img}">
                        <button class="plus-button"><i class="bi bi-plus"></i></button>

                    </div>
                    <div class="detail">
                        <p>${data.Name}</p>
                        <div class="rating">
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                        </div>
                        <p><span>$${data.Price}</span></p>

                    </div>
                </div>
                `;
    }

}
var rightButtons = document.querySelectorAll('.container .move-right-button');
var leftButtons = document.querySelectorAll('.container .move-left-button');
var shift = 330;

function moveRightButton(index) {
    var item = document.getElementsByClassName('swipe-wrapper')[index];
    if (item.querySelectorAll('.col-lg').length > 8) {
        clearInterval(ItemInterval[index]);
        leftButtons[index].style.display = "block";
        moves[index] += -shift;
        if (moves[index] == -2 * shift) {
            rightButtons[index].style.display = "none";
        }
        item.style.left = `${moves[index]}px`
    }
}

function moveLeftButton(index) {
    var item = document.getElementsByClassName('swipe-wrapper')[index];
    if (item.querySelectorAll('.col-lg').length > 8) {
        clearInterval(ItemInterval[index]);
        rightButtons[index].style.display = "block";
        moves[index] += shift;
        if (moves[index] == 0) {
            leftButtons[index].style.display = "none";
        }

        item.style.left = `${moves[index]}px`
    }
}



setIntervalItem();

function setIntervalItem() {
    for (let i = 0; i < collection.length; i++) {
        var listCollg = collection[i].querySelectorAll('.col-lg');
        if (listCollg.length > 8) {
            ItemInterval.push(setInterval(function () {




                moves[i] += -shift;
                if (moves[i] < -shift) {
                    moves[i] = 0;
                    leftButtons[i].style.display = "none";
                    rightButtons[i].style.display = "block";
                } else if (moves[i] == -shift * 2) {
                    rightButtons[i].style.display = "none";
                } else {
                    leftButtons[i].style.display = "block";


                }
                collection[i].style.left = `${moves[i]}px`;


            }, 4000))
        }
    }
}

const bgrClose = document.querySelector('.bgr')
const btnClose = document.querySelector('.close')

function closeDetail() {
    document.querySelector('.detail-section').classList.remove('active')
}

function colOnclick() {
    var test = document.querySelectorAll('.col-lg')
    test.forEach((item, id) => {
        item.onclick = () => {

            var spct = data.find(item1 => item1.ID == item.dataset.id)
            document.querySelector('.detail-section').classList.add('active')
            document.querySelector('.product-name').innerHTML = `
                    ${spct.Name}
                    `
            document.querySelector('.product-price').innerHTML = `
                    ${spct.Price}$
                    `
            document.querySelector('.brand').innerHTML = `
                    ${spct.Brand}
                    `
            document.querySelector('.OS').innerHTML = `
                    ${spct.OS}
                    `
            document.querySelector('.top-detail img').src = `
                    ${spct.img}
                    `
            document.getElementById('product-id').value = `${spct.ID}`
        }
    })

}


function renderAllSection(data, totalpages = 8) {
    document.querySelector('.main').innerHTML = `
    <div class="container">
        </div>
    `;
    container = document.querySelector('.container');
    container.innerHTML = `
        <div class = "all-title" >
                <h3 >Search list</h3>
        </div>

        <div class="all-wrapper">
        <div class="all-section">
        </div>
      
        </div>
          <div class="pagination">
            <ul>
            </ul>
        </div>
        
        `;
    var dataCurrent = data.slice(0 * totalpages, (0 + 1) * totalpages)
    renderAllContent(dataCurrent);
    colOnclick();
    lengthOfPagination = Math.ceil(data.length / totalpages);
    var paginationAdd = document.querySelector('.pagination ul');
    for (var i = 1; i <= lengthOfPagination; i++) {
        paginationAdd.innerHTML += `<li><a href="#">${i}</a></li>`

    }
    paginationAdd.innerHTML += '<div class="bar"></div>'

    const paginationLi = document.querySelectorAll('.pagination ul li');
    var currentPage = 0;
    paginationLi.forEach((item, index, ) => {
        var bar = document.querySelector('.bar');
        var percent = Math.floor(100 / lengthOfPagination);
        item.onmouseenter = () => {
            bar.style.left = `${percent*index}%`;

        }
        item.onmouseleave = () => {
            bar.style.left = `${percent*currentPage}%`;
        }
        item.onclick = () => {
            if (index != currentPage)
                currentPage = index;
            dataCurrent = data.slice(index * totalpages, (index + 1) * totalpages)
            document.body.scrollTop = 0;
            renderAllContent(dataCurrent);


            colOnclick();
            document.querySelector('.all-title').focus();

        }

    })

}

function renderAllContent(datas) {
    var allSection = document.querySelector('.all-section');
    allSection.innerHTML = '';
    for (var data of datas) {
        allSection.innerHTML += `
              <div class="col-lg" data-id=${data.ID}>
                  <div class="product-image">
                      <img src="${data.img}">
                      <button class="plus-button"><i class="bi bi-plus"></i></button>

                  </div>
                  <div class="detail">
                      <p>${data.Name}</p>
                      <div class="rating">
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                      </div>
                      <p><span>$${data.Price}</span></p>

                  </div>
              </div>
              `;
    }
}

//Filters
var BrandFilter = []
document.querySelectorAll('.menu-brand-dropdown-list li').forEach((item, id) => {
    item.onclick = () => {
        if (BrandFilter.includes(item.dataset.name)) {
            BrandFilter.splice(BrandFilter.indexOf(item.dataset.name), 1);
            item.style.backgroundColor = '#000000';
        } else {
            BrandFilter.push(item.dataset.name)
            item.style.backgroundColor = '#00ffff';
        }
        console.log(BrandFilter);
        filterActive(data);
    }
})
document.querySelectorAll('.menu-brand-dropdown-list li').forEach((item, id) => {
    item.onclick = () => {
        if (BrandFilter.includes(item.dataset.name)) {
            BrandFilter.splice(BrandFilter.indexOf(item.dataset.name), 1);
            item.style.backgroundColor = '#000000';
        } else {
            BrandFilter.push(item.dataset.name)
            item.style.backgroundColor = '#00ffff';
        }
        console.log(BrandFilter);
        filterActive();
    }
})
var priceFilter = 0;
var priceFilterindex = -1;
document.querySelectorAll('.menu-price-dropdown-list li').forEach((item, id) => {
    item.onclick = () => {
        if (priceFilterindex != id) {


            priceFilter = parseInt(item.dataset.price)
        } else {
            priceFilter = 0;
        }
        filterActive();
        item.style.backgroundColor = '#00ffff';
        if (priceFilterindex > -1) {
            document.querySelectorAll('.menu-price-dropdown-list li')[priceFilterindex].style.backgroundColor = '#000000';
        }

        priceFilterindex = id;

    }

})
var nameFilter = "";

function searchName() {
    nameFilter = document.getElementById("search-name").value;
    if (nameFilter != "") {
        filterActive();
    }

}

function filterActive() {
    var dataFilted = data;
    if (BrandFilter.length != 0) {
        dataFilted = [];
    }
    for (var brand of BrandFilter) {
        dataFilted = dataFilted.concat(data.filter(item => item.Brand.toLowerCase() == brand))
    }

    if (priceFilter != 0) {
        if (priceFilter > 10) {
            dataFilted = dataFilted.filter(item => item.Price > 10000000)
        } else {
            dataFilted = dataFilted.filter(item => item.Price < priceFilter * 1000000)
        }
        console.log(dataFilted)
    }
    if (nameFilter != "") {
        dataFilted = dataFilted.filter(item => item.Name.toLowerCase().includes(nameFilter.toLowerCase()))
    }
    if (dataFilted.length == 0) {

    }
    renderAllSection(dataFilted);
}