<?php

class Home_model extends CI_Model
{ 
	    public function articleList()
        { 

        	$sql = 'SELECT
        	 a.id, 
        	 a.title as title, 
        	 a.content as content ,
        	 a.publish_datetime as publish_datetime, 
        	 a.category,c.name as category ,
        	 s.name as subcategory,
        	 s.id,
        	 i.image_path
        	 FROM article a 
 			 join category c on a.category = c.id
 			 left join subcategory s on a.subcategory = s.id 
 			 left join image_path i on a.id = i.article_id 


 			 where a.publish_stat = 1 ORDER BY 
             a.id DESC limit 40 ';  
          $query     = $this->db->query($sql);
          return $query->result_array();
        }

        public function tagList()
        {  			

        	$sql = 'SELECT at.article_id,t.tag_title AS title
				    FROM   article_tags at
				    JOIN   tag t ON t.id = at.tag_id';  
          $query     = $this->db->query($sql);
          return $query->result_array();
        }

        public function imageList()
        {  			

        	$sql = 'SELECT at.article_id,t.tag_title AS title
				    FROM   article_tags at
				    JOIN   tag t ON t.id = at.tag_id';  
          $query     = $this->db->query($sql);
          return $query->result_array();
        }
}
?>