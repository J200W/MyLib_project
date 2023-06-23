<?php

class Ebook
{
    private $id;
    private $title;
    private $date_parution;
    private $auteur;
    private $nb_chapitres;
    private $nb_pages;
    private $editeur;
    private $category;
    private $age_limite;
    private $langue;
    private $id_biblio;

    public function __construct($id, $title, $date, $auteur, $nb_chapitres, $nb_pages, $editeur, $age_limite, $id_biblio)
    {
        $this->id = $id;
        $this->title = $title;
        $this->date_parution = $date;
        $this->auteur = $auteur;
        $this->nb_chapitres = $nb_chapitres;
        $this->nb_pages = $nb_pages;
        $this->editeur = $editeur;
        $this->age_limite = $age_limite;
        $this->id_biblio = $id_biblio;
        $this->category = array();
        $this->langue = array();
    }

    public function setCategory($category){
        $this->category[] = $category;
    }

    public function setLanguage($langue){
        $this->langue[] = $langue;
    }

    public function getId(){
        return $this->id;
    }

    public function getTitle(){
        return $this->title;
    }

    public function getDate(){
        return $this->date_parution;
    }

    public function getAuteur(){
        return $this->auteur;
    }

    public function getChap(){
        return $this->nb_chapitres;
    }

    public function getPages(){
        return $this->nb_pages;
    }

    public function getEditeur(){
        return $this->editeur;
    }

    public function getAge(){
        return $this->age_limite;
    }

    public function getIdBiblio(){
        return $this->id_biblio;
    }

    public function getCategories(){
        return $this->category;
    }
    public function getLanguages(){
        return $this->langue;
    }
}

?>