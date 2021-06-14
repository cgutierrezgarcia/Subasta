let auction;

fetch("http://localhost:9300/auctions")
.then(response => response.json())
.then(data => {

    for (let i = 0; i < data.length; i++) {

        const ID = data[i]['id'];
        const NAME = data[i]['name'];
        const IMG = data[i]['image'];

        let auctionDiv = document.createElement("div");
        auctionDiv.setAttribute("id", "auction-inner");
        auctionDiv.setAttribute("onClick", "showActionById('"+ID+"')");
        
        const CONTAINER = document.getElementById('auctions-list');
        CONTAINER.appendChild(auctionDiv).innerHTML = `
            <img src="${IMG}" />
            <h2>${NAME}</h2>
        `;

    }
});



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

const AUCTION_HTML = document.getElementById("auctions-list2");

let showActionById = (auctionId) => {
    fetch("http://localhost:9300/auctions/"+auctionId)
    .then(response => response.json())
    .then(data => {

        item = new Auction(
            auctionId,
            data['name'],
            data['image'],
            data['description'],
            data['date'],
            parseInt(data['price'])
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
        
        let interval = setInterval(function () {
        item.countdownOfDateInElement(
            item.time, TIME_HTML);
        }, 1000);

        fetch("http://localhost:9300/bids/"+auctionId)
            .then(response => response.json())
            .then(data => {
                item.putArrayInElement(
                    data, 
                    PREVIOUS_BIDS_HTML);
            });

            AUCTION_HTML.style.zIndex = "4"; 

    });
}

let hideAuction = () => {
    AUCTION_HTML.style.zIndex = "-1"; 
}
