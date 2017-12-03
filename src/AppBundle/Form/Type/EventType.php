<?php

namespace AppBundle\Form\Type;

use AppBundle\Entity\Event;
use AppBundle\Entity\EventPriority;
use AppBundle\Entity\EventStatus;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class)
            ->add('description', TextareaType::class)
            ->add('timeStart', DateTimeType::class, [
                'widget'=>'single_text'
            ])
            ->add('timeEnd', DateTimeType::class, [
                'widget'=>'single_text'
            ])
            ->add('status', EntityType::class, [
                'class' => EventStatus::class,
                'query_builder' => function(EntityRepository $repository)
                {
                    return $repository
                        ->createQueryBuilder('status')
                        ->orderBy('status.id', 'ASC');
                }
            ])
            ->add('priority', EntityType::class, [
                'class' => EventPriority::class,
                'query_builder' => function(EntityRepository $repository)
                {
                    return $repository
                        ->createQueryBuilder('priority')
                        ->orderBy('priority.value', 'ASC');
                }
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);
    }
}