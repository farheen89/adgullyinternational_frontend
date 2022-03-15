  <?php  if(count($data)>0){
                  $rows = ceil(count($data) / 3);
                  $lists  = array_chunk($data, $rows);

                      foreach ( $lists as $column) {
                         ?>
                      <div class="column__item">
                         <ul class="post">
                            <?php foreach ($column as $item) {
                                 $path =  (isset($item['image_path']) && ($item['image_path']!=NULL)) ? base_url().'ajax_upload/'.$item['image_path'].'.png' :    base_url().'pubs/share/thumb/562402645_c798x427+2+26_r433x232%21.jpg'; 
                             ?> 
                               <li class="post__item">
                               <a class="link_no-underline post__img_href" href="news/admission/562402484.html"><img class="post__img" src="<?php echo $path; ?> " alt="Applications for Study Tour Experience Close February 13"></a>
                               <h3 class=" post__title"><a href="news/admission/562402484.html">
                                
                                     <?php 
                                     echo $item['title'];
                                    // echo $title = strlen($item['title']) > 50 ? substr($item['title'],0,50)."..." : $item['title'];
                                     ?>

                                  </a></h3>
                               <div class="post__descr" >
                                  <p>
                                     <?php echo $item['content'];
                                     echo $content = strlen($item['content']) > 500 ? substr($item['content'],0,500)."..." : $item['content'];
                                     ?>
                                        
                                  </p>
                               </div>
                                <div class="tag-set">
                                     <a class="link link_no-underline rubric rubric_9" href="news/admission/index.html">
                                        <span><?php  echo isset($item['category']) ? ucfirst($item['category']) : '';?></span>
                                     </a>
                                     <a class="link link_no-underline tag" href="news/tags/ideas/index.html" title="ideas &amp; experience" 
                                        style="background-color: #ffc208;color: black;border: 1px solid #857b5e;">
                                        <span class="rubric__inner" ><?php echo isset($item['subcategory']) ? ucfirst($item['subcategory']) : '';?></span>
                                     </a>

                                     <?php 
                                     foreach($tags as $tag){ 
                                        if($tag['article_id']==$item['id']){?>
                                               <a class="link link_no-underline tag" href="news/tags/ma/index.html" title="master's programmes ">
                                        <span class="rubric__inner"><?php echo $tag['title'];?></span>
                                     </a>
                                        <?php }

                                     }
                                     ?> 
                                     <a class="link link_no-underline tag date_tag" href="news/tags/ideas/index.html" title="February 10 ,2022">
                                        <span class="rubric__inner"><?php echo date('F d ,Y',strtotime($item['publish_datetime']));?></span>
                                     </a>
                               </div>
                            </li>
                            <?php } ?>
                           
                               
                         </ul>
                      </div>
                       <?php  
                          
                      } } else { echo '1'; } ?>
