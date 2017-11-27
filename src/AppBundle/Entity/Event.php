<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use JMS\Serializer\Annotation as JMSSerializer;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Validator\Constraints as AppAssert;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Event
 *
 * @ORM\Table(name="event")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EventRepository")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Event
{
    use TimestampableEntity;

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMSSerializer\Expose
     */
    private $id;

    /**
     * @var string
     * @Assert\NotBlank()
     * @ORM\Column(name="title", type="string", length=255)
     * @JMSSerializer\Expose
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     * @JMSSerializer\Expose
     */
    private $description;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="timeStart", type="datetime")
     * @Assert\NotBlank()
     * @AppAssert\EventTimeRangeConstraint()
     * @JMSSerializer\Expose
     */
    private $timeStart;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="timeEnd", type="datetime")
     * @Assert\NotBlank()
     * @JMSSerializer\Expose
     */
    private $timeEnd;


    /**
     * @var User
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="events")
     * @ORM\JoinColumn(name="user_id", nullable=false)
     */
    private $user;


    /**
     * @var EventStatus
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\EventStatus", inversedBy="events")
     * @ORM\JoinColumn(name="status_id", nullable=false)
     * @JMSSerializer\Expose
     */
    private $status;

    /**
     * @var EventPriority
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\EventPriority", inversedBy="events")
     * @ORM\JoinColumn(name="priority_id", nullable=false)
     * @JMSSerializer\Expose
     */
    private $priority;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Event
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Event
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set timeStart
     *
     * @param \DateTime $timeStart
     *
     * @return Event
     */
    public function setTimeStart(\DateTime $timeStart)
    {
        $this->timeStart = $timeStart;

        return $this;
    }

    /**
     * Get timeStart
     *
     * @return \DateTime
     */
    public function getTimeStart()
    {
        return $this->timeStart;
    }

    /**
     * Set timeEnd
     *
     * @param \DateTime $timeEnd
     *
     * @return Event
     */
    public function setTimeEnd(\DateTime $timeEnd)
    {
        $this->timeEnd = $timeEnd;

        return $this;
    }

    /**
     * Get timeEnd
     *
     * @return \DateTime
     */
    public function getTimeEnd()
    {
        return $this->timeEnd;
    }

    /**
     * Get user
     *
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set user
     *
     * @param User $user
     * @return $this
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get status
     *
     * @return EventStatus
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set status
     *
     * @param EventStatus $status
     * @return $this
     */
    public function setStatus(EventStatus $status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get priority
     *
     * @return EventPriority
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * Set priority
     *
     * @param EventPriority $priority
     * @return $this
     */
    public function setPriority(EventPriority $priority)
    {
        $this->priority = $priority;

        return $this;
    }
}