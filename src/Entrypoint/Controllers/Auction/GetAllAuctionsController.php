<?php

namespace IESLaCierva\Entrypoint\Controllers\Auction;

use IESLaCierva\Application\Auction\GetAllAuctions\GetAllAuctionService;
use IESLaCierva\Infrastructure\Files\CsvAuctionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetAllAuctionsController
{

    public function execute(Request $request): Response
    {
        $file = fopen('./../src/Infrastructure/Files/auctions.csv', "r");
        if (false === $file) {
            throw new Exception('File not found');
        }

        while (($data = fgetcsv($file, 1000, ',')) !== false) {
            $users[] = [
                    'id' => $data[0],
                    'name' => $data[1],
                    'image' => $data[2],
                    'description' => $data[3],
                    'date' => $data[4],
                    'price' => $data[5]
                ];
        }

        return new JsonResponse($users);
    }
}
