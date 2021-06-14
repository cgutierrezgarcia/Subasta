<?php
namespace IESLaCierva\Entrypoint\Controllers;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class HomeController
{
    public function execute(Request $request): Response
    {
        $response = new Response();
        ob_start();
        require_once __DIR__.'/../../Infrastructure/Views/home.php';
        $response->setContent(ob_get_clean());
        return $response;
    }
}
