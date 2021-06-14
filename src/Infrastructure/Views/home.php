<?php require_once 'header.php'; ?>


<div id="auctions-wrapper">
    <div id="auctions">
        <div id="auctions-list">
        </div>
        <div id="auctions-list2">
            <div class="auction-wrapper">
                <div class="auction-info">
                    <div>
                        <h1 id="auction-title"></h1>
                    </div>
                    <hr/>
                    <div>
                        <img id="auction-img" img alt="Imagen del producto" />
                    </div>
                    <hr/>
                    <div>
                        <p>Descripción:</p>
                        <br/>
                        <p id="auction-desc"></p>
                    </div>
                </div>
                <div class="item-auction">
                    <div id="close-btn" onClick="hideAuction()">
                        <span>X</span>
                    </div>
                    <div id="auction-time"></div>
                    <div>
                        <p>
                            El precio está en 
                            <var id="auction-price"></var>
                        </p>
                    </div>
                    <div>
                        <p>
                            La siguiente puja está en 
                            <var id="auction-next-bid"></var>
                        </p>
                        <p id='auction-ship-cost'>Gastos de envío 9€</p>
                    </div>
                    <div>
                        <p>Puja rápida</p>
                        <div class="auction-fast-bid">
                            <button 
                                id="auction-fast-bid-btn1" 
                                class="auction-btn"
                                onClick="item.fastBid(0.1)"
                            ></button>
                            <button 
                                id="auction-fast-bid-btn2" 
                                class="auction-btn"
                                onClick="item.fastBid(0.2)"
                            ></button>
                            <button 
                                id="auction-fast-bid-btn3" 
                                class="auction-btn"
                                onClick="item.fastBid(0.3)"
                            ></button>
                        </div>
                    </div>
                    <div>
                        <p>Puja directa</p>
                        <div class="auction-direct-bid">
                            <input id="auction-direct-bid-field" type="text" placeholder="€" required />
                            <button 
                                id="auction-direct-bid-btn"
                                class="auction-btn"
                                onClick="item.directBid()"
                            >Pujar</button>
                        </div>
                    </div>
                    <div id="auction-previous-bids">
                        <p>Pujas realizadas</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<?php require_once 'footer.php'; ?>