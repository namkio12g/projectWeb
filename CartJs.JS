 var productsInCart = JSON.parse(window.localStorage.getItem("productsInCart" || "[]"));


 var user = JSON.parse(window.localStorage.getItem("khachhang" || "[]"));
 var hoadonList = JSON.parse(window.localStorage.getItem("hoadon" || "[]"));
 var CTHDList = JSON.parse(window.localStorage.getItem("CTHD" || "[]"));


 var user = JSON.parse(window.localStorage.getItem("khachhang" || "[]"));

 function checkid(item, id) {
     return item.id = id;
 }
 var idHD;
 if (productsInCart.length == 0) {
     idHD = Math.floor(Math.random() * 10000);
 } else {
     idHD = productsInCart[0].IDHD;
 }
 window.onbeforeunload = function (event) {
     window.localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
     console.log(productsInCart)

 };


 if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
     document.querySelector('.number').innerHTML = productsInCart.length;
 }

 function addToCart() {
     var productId = document.getElementById('product-id').value
     console.log(productId)


     var index = productsInCart.findIndex(item => item.IDSP == productId);

     if (index == -1) {
         productsInCart.push({
             IDHD: idHD,
             IDSP: productId,
             amount: 1,
         });

         document.querySelector('.number').innerHTML = productsInCart.length;
     } else {
         productsInCart[index].amount += 1;
     }
     Swal.fire(
         'Success!',
         'Your product was added to cart!',
         'success'
     )
     closeDetail();
 }
 var total = 0;

 function showCart() {
     document.querySelector('.main').innerHTML = `
    <div class="container">
        </div>
    `;
     document.querySelector('.container').innerHTML = `
             <div class = "cart-container">
                    <h1 class = "projTitle" style = "text-align: center;text-transform: uppercase;">Responsive Table<span>-Less</span>Shopping Cart</h1>
                    <div class = "heading">
                        <h1>My Cart</h1> 
                        <a href = "#" class = "cart-button" onclick = "location.reload()">Continue Shopping</a> 
                    </div> 
                    <br>
                    <br>
                        <div class = "cart-section">
                    </div> 
                    <div class = "checkOut-section">
                        <div style = "margin-right: 50px;">

                                <h3>TOTAL:</h3> 
                                <br >
                                <h3 id='total'>0$</h3> 
                        </div>
                        <a class = "cart-button" onclick="checkoutFunction()">Check out </a> 
                    </div>
                 </div>
    `;
     var cartSection = document.querySelector('.cart-section');
     document.querySelector('.projTitle').focus();
     for (var index = 0; index < productsInCart.length; index++) {
         var item = data.find(item1 => item1.ID == productsInCart[index].IDSP);
         var amount = productsInCart[index].amount;
         total += item.Price * amount;

         cartSection.innerHTML += `
            <div class = "cart-tag">
                <div class = "cart-head" style = "display: flex;flex-direction: row;width: fit-content;">
                    <img src = ${item.img} alt = "">
                    <div class = "shopped-product" style = "margin-left: 15px;">
                        <h3>${item.Name}</h3>
                        <div class = "shopped-product-amounts" style = "margin:5px 0;display: flex;flex-direction: row;" >
                            <p> amount: </p>
                            <input type = "text"style = "width: 30px;height: 30px;margin:0 5px;text-align: center;" onchange="changeAmounts(${index},${item.ID},${item.Price})" value="${amount}">
                            <p>x ${item.Price}$</p>

                        </div>

                    </div>

                </div> 
                <div class = "cart-tail">
                    <h4 >${item.Price*amount}$</h4> 
                    <span onclick=removeProductCart(${index},${item.ID},${item.Price})>X</span>

                </div>


            </div>

        `;
     }
     document.getElementById('total').innerHTML = `${total}$`

 }

 function changeAmounts(index, id, price) {

     var value = document.querySelectorAll('.shopped-product-amounts input')[index].value;

     var indexCart = productsInCart.findIndex(item => item.IDSP == id)
     var amount = productsInCart[indexCart].amount;
     if (!isNaN(value) && value >= 0 && value < 11) {
         if (!value && value != amount) {
             document.querySelectorAll('.shopped-product-amounts input')[index].value = amount;
             value = amount;
         } else if (value == 0) {
             removeProductCart(index, productsInCart[indexCart].IDSP, price);
         } else {
             total -= amount * price;
             total += value * price;
             productsInCart[index].amount = parseInt(value);
             document.querySelectorAll('.cart-tail h4')[index].innerHTML = `${value * price}$`;
             document.getElementById('total').innerHTML = total
         }
     } else {
         Swal.fire(
             'Valid input!',
             'please enter a number!',
             'error'
         )
         document.querySelectorAll('.shopped-product-amounts input')[index].value = amount;
     }

 }


 function removeProductCart(index, id, price) {
     document.querySelectorAll('.cart-tag')[index].style.display = 'none';
     var index = productsInCart.findIndex(item => item.IDSP == id)
     total -= productsInCart[index].amount * price;
     document.getElementById('total').innerHTML = total;
     productsInCart.splice(index, 1);
     document.querySelector('.number').innerHTML = productsInCart.length;
 }

 function checkoutFunction() {

     if (total == 0) {
         Swal.fire(
             'No Products in cart!',
             'you must add some product to check out!',
             'error'
         )
     } else {

         for (var i = 0; i < productsInCart.length; i++) {
             CTHDList.push({
                 IDHD: productsInCart[i].IDHD,
                 IDSP: productsInCart[i].IDSP,
                 SL: productsInCart[i].amount

             })

         }
         hoadonList.push({
             ID: idHD,
             TenKh: 'name',
             SDTKH: '123456',
             Ngay: new Date().toLocaleDateString(),
             Tongtien: total,
             Tinhtrang: 'unprocessed'
         })
         window.localStorage.setItem("CTHD", JSON.stringify(CTHDList));
         window.localStorage.setItem("hoadon", JSON.stringify(hoadonList));

         productsInCart = []
         Swal.fire(
             'Success!',
             'Your invoice is processing',
             'success'
         )
         setTimeout(() => {
             location.reload();
         }, 1000);

     }

 }