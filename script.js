const TITLE_HTML = document.getElementById("auction-title");
const IMG_HTML   = document.getElementById("auction-img");
const DESCRIPTION_HTML  = document.getElementById("auction-desc");
const TIME_HTML  = document.getElementById("auction-time");
const PRICE_HTML = document.getElementById("auction-price");
const NEXT_BID_HTML = document.getElementById("auction-next-bid");

const FAST_BID_BTN_1 = document.getElementById("auction-fast-bid-btn1");
const FAST_BID_BTN_2 = document.getElementById("auction-fast-bid-btn2");
const FAST_BID_BTN_3 = document.getElementById("auction-fast-bid-btn3");
const DIRECT_BID_FIELD = document.getElementById("auction-direct-bid-field");
const DIRECT_BID_BTN = document.getElementById("auction-direct-bid-btn");

const PREVIOUS_BIDS_HTML = document.getElementById("auction-previous-bids");



class Auction {
    constructor(title, img, description, time, price) {
        this.title = title;
        this.img   = img;
        this.description = description;
        this.time  = time;
        this.price = price;
        this.minPrice = price;
    }

    putDataInElement(data, element) {
        element.innerHTML = data;
    }

    putURLInElement(data, element) {
        element.src = data;
    }
    
    bid = amount => {
        if (amount > this.minPrice) {
            this.price = amount;
            this.minPrice = this.price;
            let nowInDate = new Date();

            let headers = new Headers();
            headers.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "date": nowInDate.toLocaleString(),
                "price": this.price
            });

            let requestOptions = {
                method: 'POST',
                headers: headers,
                body: raw,
                redirect: 'follow'
            };

                //.then(response => response.text())
            fetch("http://localhost/Subasta/auctions.php", requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        } else {
            if (isNaN(amount)) {
                alert("El campo no puede estar vacío");
            } else if (amount < this.minPrice) {
                alert("La puja es inferior al precio mínimo: "+ this.minPrice +"€");
            } else {
                alert("La puja introducida debe ser un número");
            }
        }
    }

    fastBid = amount => {
        this.bid(parseInt(this.price + this.price * amount));
    }
    
    directBid = () => {
        this.price = parseInt(DIRECT_BID_FIELD.value);
        this.bid(this.price);
    }

    /*
    storageData = () => {
        let nowInMilliseconds = Date.now();
        let nowInDate = new Date();
        sessionStorage.setItem(
            nowInMilliseconds, nowInDate.toLocaleString() +" - "+ this.price.toFixed(2) + "€");
    }

    putStorageDataInElement = (element) => {
        let storageDataInTotal = Object.keys(sessionStorage);
        storageDataInTotal.sort(function(a, b) {
            return b - a;
        });
        for (let i = 0; i < storageDataInTotal.length; i++) {
            let p = document.createElement("p");
            element.appendChild(p).innerHTML = 
                sessionStorage.getItem(storageDataInTotal[i]);
        }
    }
    */

    putArrayInElement = (array, element) => {
        array.sort(function(a, b) {
            return b - a;
        });
        for (let i = 1; i < array.length; i++) {
            let p = document.createElement("p");
            element.appendChild(p).innerHTML = 
                array[i][0] +" - "+ array[i][1] +"€";
        }
    }

    countdownOfDateInElement = (date, element) => {
        setInterval(function () {
            let date1 = Date.now();
            let date2 = new Date(date);
            date2 = date2.getTime();
    
            let difference = date2 - date1;
            let daysDifference = difference / 1000 / 60 / 60 / 24;
    
            let days = Math.trunc(
                daysDifference);
    
            let hours = Math.trunc(
                (daysDifference - days) * 24);
    
            let minutes = Math.trunc(
                ((daysDifference - days) * 24 - hours) * 60);
    
            let seconds = Math.trunc(
                (((daysDifference - days) * 24 - hours) * 60 - minutes) * 60);
    
            if (difference < 0) {
                return element.innerHTML = "<p>Subasta finalizada</p>";
            } else {
                return element.innerHTML = 
                    "<p>Cierra en "
                        + days +"d "
                        + hours +"h "
                        + minutes +"m "
                        + seconds +"s</p>";
            }
        }, 1000);
    }
}


let item;

fetch("http://localhost/Subasta/auctions.php")
.then(response => response.json())
.then(data => {

    let currentPrice = data.length

    item = new Auction(
        "Canon EOS 90D",
        "https://ae01.alicdn.com/kf/Ufd141a24622f4d0ca95bfd998ba43c21T/Canon-EOS-90D-DSLR-C-mara-4K-y-EF-S-18-135mm-f-3-5-5.jpeg",
        "Una cámara réflex repleta de funciones que te permite acercarte más, disparar más rápido y captar increíbles imágenes de 32,5 megapíxeles. Un rápido rendimiento réflex que te permite acercarte más. Un perfecto equilibrio de velocidad, calidad de imagen y portabilidad, ideal para acercarte más a la naturaleza y capturar deportes de movimiento rápido.",
        "2021-8-7 00:00:00",
        parseInt(data[currentPrice-2][1])
    );
    
    item.putDataInElement(
        item.title, TITLE_HTML);
    item.putURLInElement(
        item.img, IMG_HTML);
    item.putDataInElement(
        item.description, DESCRIPTION_HTML);
    item.putDataInElement(
        item.price +"€", PRICE_HTML);
    item.putDataInElement(
        item.price + (item.price * 0.1) +"€", NEXT_BID_HTML);
    item.putDataInElement( 
        item.price + item.price * 0.1 +"€", FAST_BID_BTN_1);
    item.putDataInElement(
        item.price + item.price * 0.2 +"€", FAST_BID_BTN_2);
    item.putDataInElement(
        item.price + item.price * 0.3 +"€", FAST_BID_BTN_3);
    item.countdownOfDateInElement(
        item.time, TIME_HTML);
    //item.putStorageDataInElement(PREVIOUS_BIDS_HTML);

    item.putArrayInElement(
        data, 
        PREVIOUS_BIDS_HTML);
});



