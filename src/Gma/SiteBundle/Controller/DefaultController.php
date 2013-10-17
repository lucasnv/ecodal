<?php

namespace Gma\SiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GmaSiteBundle:Default:index.html.twig', array('pageHome'=>true));
    }

    public function academicAction()
    {
        return $this->render('GmaSiteBundle:Default:academic.html.twig',array('pageAcademic'=>true));
    }

    public function contactAction()
    {
        return $this->render('GmaSiteBundle:Default:contact.html.twig',array('pageContact'=>true));
    }

    public function projectAction()
    {
        return $this->render('GmaSiteBundle:Default:project.html.twig',array('pageProject'=>true));
    }

    public function tipsAction()
    {
        return $this->render('GmaSiteBundle:Default:tips.html.twig',array('pageTips'=>true));
    }

    public function selectAvatarAction()
    {
        return $this->render('GmaSiteBundle:Default:select-avatar.html.twig',array());
    }
}
