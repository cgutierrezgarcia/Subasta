<?php

namespace IESLaCierva\Entrypoint\Controllers\Bid;

use IESLaCierva\Application\Bid\GetBidById\GetBidByIdService;
use IESLaCierva\Infrastructure\Files\Bids\CsvBidRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetBidByIdController
{
    public function execute(Request $request): Response
    {
        $file = fopen('./../src/Infrastructure/Files/Bids/'.$request->get('id').'.csv', "r");
        if (false === $file) {
            throw new Exception('File not found');
        }

        while (($data = fgetcsv($file, 1000, ',')) !== false) {
            $bids[] = [
                    'date' => $data[0],
                    'price' => $data[1]
                ];
        }

        return new JsonResponse($bids);

    }

}
