<?php

namespace Gma\SiteBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tip
 *
 * @ORM\Table(name="tip")
 * @ORM\Entity
 */
class Tip
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="tip_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $tipTypeId;

    /**
     * @var string
     *
     * @ORM\Column(name="tip", type="string", length=250, nullable=true)
     */
    private $tip;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

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
     * Set id
     *
     * @param integer $id
     * @return Tip
     */
    public function setId($id)
    {
        $this->id = $id;
    
        return $this;
    }

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
     * Set tipTypeId
     *
     * @param integer $tipTypeId
     * @return Tip
     */
    public function setTipTypeId($tipTypeId)
    {
        $this->tipTypeId = $tipTypeId;
    
        return $this;
    }

    /**
     * Get tipTypeId
     *
     * @return integer 
     */
    public function getTipTypeId()
    {
        return $this->tipTypeId;
    }

    /**
     * Set tip
     *
     * @param string $tip
     * @return Tip
     */
    public function setTip($tip)
    {
        $this->tip = $tip;
    
        return $this;
    }

    /**
     * Get tip
     *
     * @return string 
     */
    public function getTip()
    {
        return $this->tip;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Tip
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Tip
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
     * @return Tip
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