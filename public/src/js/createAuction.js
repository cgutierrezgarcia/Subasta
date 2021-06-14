let createAuction = () => {

    const TITLE_VALUE = document.getElementById("create-auction-title").value;
    const IMG_VALUE = document.getElementById("create-auction-img").value;
    const DESC_VALUE = document.getElementById("create-auction-desc").value;
    const DATE_VALUE = document.getElementById("create-auction-date").value;
    const PRICE_VALUE = document.getElementById("create-auction-price").value;

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "name": TITLE_VALUE,
        "image": IMG_VALUE,
        "description": DESC_VALUE,
        "date": DATE_VALUE,
        "price": parseInt(PRICE_VALUE)

    });

    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:9200/auctions", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}