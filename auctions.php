<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET' && count($_GET) === 0) {
    $file='bids.csv';
    $csv= file_get_contents($file);
    $array = 
        array_map("str_getcsv", explode("\n", $csv));
    $json = json_encode($array);
    echo $json;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(@file_get_contents('php://input'), true);
    $file = fopen("bids.csv", "a");
    fputcsv($file, [$data['date'], $data['price']]);
    fclose($file);
}
