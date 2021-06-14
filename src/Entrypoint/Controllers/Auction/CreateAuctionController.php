<?php

namespace IESLaCierva\Entrypoint\Controllers\Auction;

use IESLaCierva\Application\Auction\CreateNewAuction\CreateNewAuctionService;
use IESLaCierva\Infrastructure\Files\CsvAuctionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CreateAuctionController
{
    public function execute(Request $request): Response
    {
        $data = json_decode(@file_get_contents('php://input'), true);

        if (isset($data['name']) && isset($data['image'])  && isset($data['description']) && isset($data['date']) && isset($data['price'])) {


            $file = fopen('./../src/Infrastructure/Files/auctions.csv', "a");
            if (false === $file) {
                throw new Exception('File not found');
            }
            $id = uniqid();
            fputcsv($file, [$id, $data['name'], $data['image'], $data['description'], $data['date'], $data['price']]);
            fclose($file);


            $createBidsCsv = fopen('./../src/Infrastructure/Files/Bids/'.$id.'.csv', "a");
            fputcsv($createBidsCsv, [$data['date'], $data['price']]);
            fclose($createBidsCsv);


            return new JsonResponse([], Response::HTTP_CREATED);

        } else {
            return new JsonResponse(["error" => "Missing parameters"], Response::HTTP_BAD_REQUEST);
        }
        
    }
}
