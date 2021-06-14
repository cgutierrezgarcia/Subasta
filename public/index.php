<?php

use IESLaCierva\Entrypoint\Routes;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Controller\ArgumentResolver;
use Symfony\Component\HttpKernel\Controller\ControllerResolver;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;

require_once __DIR__.'/../vendor/autoload.php';


$request = Request::createFromGlobals();
$routes = new Routes();

$context = new RequestContext();
$context->fromRequest($request);
$matcher = new UrlMatcher($routes->getRoutes(), $context);
$controllerResolver = new ControllerResolver();
$argumentResolver = new ArgumentResolver();

try {
    $request->attributes->add($matcher->match($request->getPathInfo()));
    $controller = $controllerResolver->getController($request);
    $arguments = $argumentResolver->getArguments($request, $controller);
    $response = call_user_func_array($controller, $arguments);
} catch (Exception $e) {
    $response = new Response('Unexpected error', Response::HTTP_INTERNAL_SERVER_ERROR);
}

$response->send();