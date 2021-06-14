<?php

namespace IESLaCierva\Entrypoint;

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class Routes
{
    private RouteCollection $routes;

    public function __construct()
    {
        $this->routes = new RouteCollection();
        $routes= json_decode(file_get_contents(__DIR__.'/../../config/routes.json'), true);
        foreach ((array)$routes as $route) {
            $this->addRoute($route['name'], $route['path'], $route['controller'], $route['methods']);
        }
    }


    public function getRoutes()
    {
        return $this->routes;
    }

    private function addRoute(string $name, string $path, string $controller, array $methods)
    {
        $this->routes->add(
            $name,
            new Route(
                $path,
                [
                    '_controller' => $controller,
                ],
                [],
                [],
                null,
                [],
                $methods
            )
        );
    }
}
