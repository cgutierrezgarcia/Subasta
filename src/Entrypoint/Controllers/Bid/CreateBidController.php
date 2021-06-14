<?php

namespace IESLaCierva\Entrypoint\Controllers\Bid;

use IESLaCierva\Application\Bid\CreateNewBid\CreateNewBidService;
use IESLaCierva\Infrastructure\Files\Bids\CsvBidRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CreateBidController
{
    public function execute(Request $request): Response
    {
        $data = json_decode(@file_get_contents('php://input'), true);

        if (isset($data['date']) && isset($data['price'])) {
            $file = fopen('./../src/Infrastructure/Files/Bids/'.$data['id'].'.csv', "a");

            if (false === $file) {
                throw new Exception('File not found');
            }
            
            fputcsv($file, [$data['date'], $data['price']]);
            fclose($file);

            return new JsonResponse([], Response::HTTP_CREATED);
        } else {
            return new JsonResponse(["error" => "Missing parameters"], Response::HTTP_BAD_REQUEST);
        }
        
    }
}
