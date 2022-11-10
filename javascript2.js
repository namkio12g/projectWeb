const container = document.querySelector('.container');
var move = 0;
var moves = [];
var branches = ['iphone', 'samsung'];
var collection = [];
var ItemInterval = [];
var lengthOfPagination = 0;

var data = JSON.parse(window.localStorage.getItem("products" || "[]"));
swipeSectionEntries(data);

function titleOnclick() {
    location.reload();
}

function swipeSectionEntries(entries) {
    container.innerHTML = "";
    var index = 0;
    for (var branch of branches) {
        container.innerHTML += '<div class="section"></div>';
        var branchProduct = entries.filter(entry => entry.branch == branch);
        if (branchProduct.length != 0) {
            container.lastElementChild.innerHTML = `
                    <div class="swipe-content">
                        <div class="content">
                            <div class="title">
                                <div class="title-block">
                                    <div class="wrap-content">
                                        <h3 class="title-group">${branch}</h3>
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

            swpieWrapperWrite(branchProduct, index);
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

                <div class="col-lg" data-id=${data.id}>
                    <div class="product-image">
                        <img src="${data.image}">
                        <button class="plus-button"><i class="bi bi-plus"></i></button>

                    </div>
                    <div class="detail">
                        <p>${data.name}</p>
                        <div class="rating">
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                            <span><i class="bi bi-star-fill"></i></span>
                        </div>
                        <p><span>$${data.price}</span></p>

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

            var spct = data.find(item1 => item1.id == item.dataset.id)
            document.querySelector('.detail-section').classList.add('active')
            document.querySelector('.product-name').innerHTML = `
                    ${spct.name}
                    `
        }
    })
}
// const label = document.querySelectorAll('.filter-label');
// const filterSection = document.getElementsByClassName('filter-section');
// label.forEach((item, index) => {
//     item.onclick = () => {
//         if (filterSection[index].classList.contains(
//                 'active')) {
//             filterSection[index].classList.remove('active')
//         } else {
//             filterSection[index].classList.add('active')

//         }

//     }
// })



function renderAllSection(data, totalpages = 8) {
    container.innerHTML = `

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
        paginationAdd.innerHTML += `<li>${i}</li>`

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
            console.log(dataCurrent)
            renderAllContent(dataCurrent);
            colOnclick();
        }

    })

}

function renderAllContent(datas) {
    var allSection = document.querySelector('.all-section');
    allSection.innerHTML = '';
    for (var data of datas) {
        allSection.innerHTML += `
              <div class="col-lg" data-id=${data.id}>
                  <div class="product-image">
                      <img src="${data.image}">
                      <button class="plus-button"><i class="bi bi-plus"></i></button>

                  </div>
                  <div class="detail">
                      <p>${data.name}</p>
                      <div class="rating">
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                          <span><i class="bi bi-star-fill"></i></span>
                      </div>
                      <p><span>$${data.price}</span></p>

                  </div>
              </div>
              `;
    }
}