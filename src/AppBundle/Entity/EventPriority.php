<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMSSerializer;

/**
 * EventPriority
 *
 * @ORM\Table(name="event_priority")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EventPriorityRepository")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class EventPriority
{
    const PRIORITY_SECONDARY = 'secondary';

    const PRIORITY_NORMAL = 'normal';

    const PRIORITY_URGENT = 'urgent';

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
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @JMSSerializer\Expose
     */
    private $title;

    /**
     * @var int
     *
     * @ORM\Column(name="value", type="integer", unique=true)
     * @JMSSerializer\Expose
     */
    private $value;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=20, unique=true)
     * @JMSSerializer\Expose
     */
    private $code;


    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Event", mappedBy="priority")
     */
    private $events;

    /**
     * @return ArrayCollection
     */
    public function getEvents()
    {
        return $this->events;
    }

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
     * @return EventPriority
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
     * Set value
     *
     * @param integer $value
     *
     * @return EventPriority
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return int
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set code
     *
     * @param string $code
     *
     * @return EventPriority
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }
}

