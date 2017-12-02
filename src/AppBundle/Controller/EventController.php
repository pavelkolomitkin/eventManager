<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Event;
use AppBundle\Entity\EventStatus;
use AppBundle\Form\Type\EventType;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Response;


class EventController extends FOSRestController
{
    /**
     * Get event list by filter
     *
     * @Route(name="event_list", path="/event/list")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function listAction(Request $request)
    {
        $user = $this->getUser();

        $entityManager = $this->getDoctrine()->getManager();
        $eventsQuery = $entityManager
            ->getRepository('AppBundle:Event')
            ->getUserEventsQuery($user, $request->query->all());

        $paginator = $this->get('knp_paginator');

        $pagination = $paginator->paginate(
            $eventsQuery,
            $request->query->getInt('page', 1)
        );

        $view = $this->view([
            'events' => $pagination->getItems(),
            'total' => $pagination->getTotalItemCount()
        ]);

        return $this->handleView($view);
    }

    /**
     * @Route(name="event_create", path="/event")
     * @Method({"POST"})
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $event = new Event();
        $event->setUser($this->getUser());
        $event->setStatus($entityManager->getRepository('AppBundle:EventStatus')->getStatusNew());

        $form = $this->createForm(EventType::class, $event);
        $form->submit($request->request->all(), false);

        if ($form->isValid()) {

            /** @var Event $event */
            $event = $form->getData();

            $entityManager->persist($event);
            $entityManager->flush();

            return $this->handleView($this->view(
                [
                    'event' => $event,
                    'message' => $this->get('translator')->trans('event.created')
                ],
                Response::HTTP_CREATED
            ));
        }

        return $this->handleView($this->view(
            [
                'form' => $form
            ],
            Response::HTTP_BAD_REQUEST
        ));
    }

    /**
     * Get event info
     *
     * @Route(name="event_get", path="event/{id}")
     * @Method({"GET"})
     * @ParamConverter("event", class="AppBundle\Entity\Event")
     * @param Event $event
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getAction(Event $event, Request $request)
    {
        if ($event->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        return $this->handleView($this->view($event));
    }

    /**
     * @Route(name="event_edit", path="event/{id}")
     * @Method({"PUT"})
     *
     * @ParamConverter("event", class="AppBundle:Event")
     * @param Event $event
     * @param Request $request
     * @return Response
     */
    public function editAction(Event $event, Request $request)
    {
        if ($event->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $form = $this->createForm(EventType::class);

        $form->setData($event);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            /** @var Event $event */
            $event = $form->getData();
            return $this->handleView($this->view([
                'event' => $event,
                'message' => $this->get('translator')->trans('event.updated')
            ]));
        }

        return $this->handleView($this->view(
            [
                'form' => $form
            ],
            Response::HTTP_BAD_REQUEST)
        );
    }

    /**
     * @Route(name="event_delete", path="/event/{id}")
     * @Method({"DELETE"})
     *
     * @ParamConverter("event", class="AppBundle\Entity\Event")
     *
     * @param Event $event
     * @param Request $request
     * @return Response
     */
    public function deleteAction(Event $event, Request $request)
    {
        if ($event->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $entityManager = $this->getDoctrine()->getManager();

        $entityManager->remove($event);
        $entityManager->flush();

        return $this->handleView($this->view(
            [
                'message' => $this->get('translator')->trans('event.deleted')
            ]
        ));
    }
}