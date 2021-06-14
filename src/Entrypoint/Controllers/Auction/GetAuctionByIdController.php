<?php

namespace IESLaCierva\Entrypoint\Controllers\Auction;

use IESLaCierva\Application\User\GetAuctionById\GetAuctionByIdService;
use IESLaCierva\Infrastructure\Files\CsvAuctionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetAuctionByIdController
{
    public function execute(Request $request): Response
    {
        $auctionId = $request->get('id');


        $auctionBids = fopen('./../src/Infrastructure/Files/Bids/'.$auctionId.'.csv', "r");
        $lastBid;
        while (($data = fgetcsv($auctionBids, 1000, ',')) !== false) {
            $lastBid = $data[1];
        }
        fclose($auctionBids);



        $file = fopen('./../src/Infrastructure/Files/auctions.csv', "r");
        if (false === $file) {
            throw new Exception('File not found');
        }

        if (null === $auctionId) {
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        $aucion = [];

        while (($data = fgetcsv($file, 1000, ',')) !== false) {
            if ($data[0] === $auctionId) {
                $aucion = [
                        'name' => $data[1],
                        'image' => $data[2],
                        'description' => $data[3],
                        'date' => $data[4],
                        'price' => $lastBid
                    ];
            }
        }

        fclose($file);
        return new JsonResponse($aucion, count($aucion) ? Response::HTTP_OK : Response::HTTP_NOT_FOUND);

    }

}
