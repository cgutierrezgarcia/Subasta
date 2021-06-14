class Auction {
    constructor(id, title, img, description, time, price) {
        this.id = id;
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
                "id": this.id,
                "date": nowInDate.toLocaleString(),
                "price": this.price
            });

            let requestOptions = {
                method: 'POST',
                headers: headers,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:9300/bids", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        } else {
            if (isNaN(amount)) {
                alert("El campo no puede estar vacío");
            } else if (amount <= this.minPrice) {
                alert("La puja es inferior al precio mínimo: "+ (this.minPrice * 1.1) +"€");
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

    putArrayInElement = (array, element) => {
        let minuArrLen = array.length - 1;
        element.innerHTML = "";
        for (let i = 0; i+1 < array.length; i++) {
            let p = document.createElement("p");
            element.appendChild(p).innerHTML = 
                array[minuArrLen - i]['date'] +" - "+ array[minuArrLen - i]['price'] +"€";
        }
    }

    countdownOfDateInElement = (date, element) => {
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
    }
}