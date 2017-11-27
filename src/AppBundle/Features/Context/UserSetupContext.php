<?php

namespace AppBundle\Features\Context;

use AppBundle\Entity\Event;
use AppBundle\Entity\EventPriority;
use AppBundle\Entity\EventStatus;
use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Gherkin\Node\TableNode;
use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\Model\UserManagerInterface;

class UserSetupContext implements Context, SnippetAcceptingContext
{
    /**
     * @var UserManagerInterface
     */
    private $userManager;
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * UserSetupContext constructor.
     *
     * @param UserManagerInterface   $userManager
     * @param EntityManagerInterface $em
     */
    public function __construct(UserManagerInterface $userManager, EntityManagerInterface $em)
    {
        $this->userManager = $userManager;
        $this->em = $em;
    }

    /**
     * @Given there are Users with the following details:
     */
    public function thereAreUsersWithTheFollowingDetails(TableNode $users)
    {
        foreach ($users->getColumnsHash() as $key => $val) {

            $confirmationToken = isset($val['confirmation_token']) && $val['confirmation_token'] != ''
                ? $val['confirmation_token']
                : null;

            $user = $this->userManager->createUser();

            $user->setEnabled(true);
            $user->setUsername($val['username']);
            $user->setEmail($val['email']);
            $user->setPlainPassword($val['password']);
            $user->setConfirmationToken($confirmationToken);

            if ( ! empty($confirmationToken)) {
                $user->setPasswordRequestedAt(new \DateTime('now'));
            }

            $this->userManager->updateUser($user);
        }
    }

    /**
     * @Given there are statuses of events:
     */
    public function createEventStatuses(TableNode $statusInfo)
    {
        foreach ($statusInfo->getColumnsHash() as $key => $value)
        {
            $eventStatus = new EventStatus();

            $eventStatus
                ->setCode($value['code'])
                ->setTitle($value['title']);

            $this->em->persist($eventStatus);
        }

        $this->em->flush();
    }

    /**
     * @Given there are priorities of events:
     */
    public function createEventPriorities(TableNode $priorityInfo)
    {
        foreach ($priorityInfo->getColumnsHash() as $key => $value)
        {
            $eventPriority = new EventPriority();

            $eventPriority
                ->setTitle($value['title'])
                ->setCode($value['code'])
                ->setValue($value['value'])
            ;

            $this->em->persist($eventPriority);
        }

        $this->em->flush();
    }

    /**
     * @Given there are users have events:
     */
    public function createEvents(TableNode $eventInfo)
    {
        $userRepository = $this->em->getRepository('AppBundle:User');
        $eventStatusRepository = $this->em->getRepository('AppBundle:EventStatus');
        $eventPriorityRepository = $this->em->getRepository('AppBundle:EventPriority');

        foreach ($eventInfo->getColumnsHash() as $key => $value)
        {
            $event = new Event();

            $event
                ->setTitle($value['title'])
                ->setUser($userRepository->find($value['user_id']))
                ->setDescription($value['description'])
                ->setPriority($eventPriorityRepository->find($value['priority_id']))
                ->setStatus($eventStatusRepository->find($value['status_id']))
                ->setTimeStart(new \DateTime($value['timeStart']))
                ->setTimeEnd(new \DateTime($value['timeEnd']))
                ;

            $this->em->persist($event);
        }

        $this->em->flush();
    }
}