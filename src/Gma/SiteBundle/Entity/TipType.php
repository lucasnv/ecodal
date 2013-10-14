<?php

namespace Gma\SiteBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TipType
 *
 * @ORM\Table(name="tip_type")
 * @ORM\Entity
 */
class TipType
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="tip_type", type="string", length=100, nullable=true)
     */
    private $tipType;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="modified_at", type="datetime", nullable=true)
     */
    private $modifiedAt;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set tipType
     *
     * @param string $tipType
     * @return TipType
     */
    public function setTipType($tipType)
    {
        $this->tipType = $tipType;
    
        return $this;
    }

    /**
     * Get tipType
     *
     * @return string 
     */
    public function getTipType()
    {
        return $this->tipType;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return TipType
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    
        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set modifiedAt
     *
     * @param \DateTime $modifiedAt
     * @return TipType
     */
    public function setModifiedAt($modifiedAt)
    {
        $this->modifiedAt = $modifiedAt;
    
        return $this;
    }

    /**
     * Get modifiedAt
     *
     * @return \DateTime 
     */
    public function getModifiedAt()
    {
        return $this->modifiedAt;
    }
}