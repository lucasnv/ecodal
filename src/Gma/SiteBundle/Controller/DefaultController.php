<?php

namespace Gma\SiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GmaSiteBundle:Default:index.html.twig', array());
    }
}
