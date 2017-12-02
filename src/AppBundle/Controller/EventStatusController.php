<?php


namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\Route;


class EventStatusController extends FOSRestController
{
    /**
     * Get all statuses of events
     *
     * @Route(name="event_status_list", path="/list")
     *
     * @param Request $request
     * @return Response
     */
    public function listAction(Request $request)
    {
        $statuses = $this
            ->getDoctrine()
            ->getRepository('AppBundle:EventStatus')
            ->findBy([], ['id' => 'ASC']);

        return $this->handleView($this->view($statuses));
    }
}