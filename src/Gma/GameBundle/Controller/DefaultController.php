<?php

namespace Gma\GameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GmaGameBundle:Default:index.html.twig', array());
    }
}
