<?php require_once 'header.php'; ?>


<div id="create-auction-wrapper">
    <div id="create-auction">
        <h1>Nueva subasta</h1>
        <label for="create-auction-title">Nombre</label>
        <input id="create-auction-title" type="text" required>
        <label for="create-auction-img">Imagen</label>
        <input id="create-auction-img" type="text" required>
        <label for="create-auction-desc">Descripción</label>
        <input id="create-auction-desc" type="text" required>
        <label for="create-auction-date">Fecha</label>
        <input id="create-auction-date" type="text" required>
        <label for="create-auction-price">Precio</label>
        <input id="create-auction-price" type="text" required>
        <button onClick="createAuction()">
            Crear
        </button>
    </div>
</div>


<?php require_once 'footer2.php'; ?>