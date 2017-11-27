<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;

/**
 * @RouteResource("profile", pluralize=false)
 */
class RestProfileController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @Annotations\View(serializerGroups={
     *   "users_all"
     * })
     * @Annotations\Get("/profile")
     */
    public function getAction()
    {
        return $this->getUser();
    }
}