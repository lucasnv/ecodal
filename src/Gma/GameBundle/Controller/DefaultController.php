<?php

namespace Gma\GameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GmaGameBundle:Layout:layout.html.twig', array());
    }
}
