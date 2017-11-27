<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\Route;

class EventPriorityController extends FOSRestController
{
    /**
     * Get all priorities of events
     *
     * @Route(name="event_priority_list", path="/list")
     *
     * @param Request $request
     * @return Response
     */
    public function listAction(Request $request)
    {
        $priorities = $this
            ->getDoctrine()
            ->getRepository('AppBundle:EventPriority')
            ->findBy([], ['value' => 'ASC']);

        return $this->handleView($this->view([
            'priorities' => $priorities
        ]));
    }
}