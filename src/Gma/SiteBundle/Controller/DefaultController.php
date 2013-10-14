<?php

namespace Gma\SiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GmaSiteBundle:Default:index.html.twig', array());
    }

    public function academicAction()
    {
        return $this->render('GmaSiteBundle:Default:academic.html.twig',array());
    }

    public function contactAction()
    {
        return $this->render('GmaSiteBundle:Default:contact.html.twig',array());
    }

    public function projectAction()
    {
        return $this->render('GmaSiteBundle:Default:project.html.twig',array());
    }
}
