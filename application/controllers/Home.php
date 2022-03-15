<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller { 

	public function index()
	{
		$this->load->model('Home_model');
	    $data = $this->Home_model->articleList();  
	    $tags = $this->Home_model->tagList();  
		$this->load->view('home', array('data' => $data,'tags' =>$tags));
	}
	public function getArticle()
	{
	$this->load->model('Home_model');
    $page =  $this->input->get('page');
    $data = $this->Home_model->getArticles($page,1);

	$tags = $this->Home_model->tagList();  
	$this->load->view('articles', array('data' => $data,'tags' =>$tags));
   // return $articles;
   // print_r($questions); 
	}
} 