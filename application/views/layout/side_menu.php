
            <div class="side-nav">
                <div class="side-nav-inner">
                    <ul class="side-nav-menu scrollable">
                        
                        <li class="nav-item dropdown <?php if($this->uri->segment(2)=="profile"){echo "active";}?>">
                            <a class="dropdown-toggle" href="<?php echo base_url();?>admin/profile">
                                <span class="icon-holder">
									<i class="anticon anticon-build"></i>
								</span>
                                <span class="title">Dashboard</span>
                                
                            </a>                           
                        </li>
                         <li class="nav-item dropdown <?php if($this->uri->segment(2)=="category" || $this->uri->segment(2)=="country"){echo "active";}?> ">
                            <a class="dropdown-toggle" href="javascript:void(0);">
                                <span class="icon-holder">
                                    <i class="anticon anticon-appstore"></i>
                                </span>
                                <span class="title">Masters</span>
                                <span class="arrow">
                                    <i class="arrow-icon"></i>
                                </span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="<?php echo base_url();?>admin/users">User Management</a>
                                </li>
                                <li>
                                    <a href="<?php echo base_url();?>admin/country">Country</a>
                                </li>
                                <li  <?php if($this->uri->segment(2)=="category" ){ echo "active";}?>>
                                    <a href="<?php echo base_url();?>admin/category">Category</a>
                                </li>
                                <li  <?php if($this->uri->segment(2)=="subcategory" ){ echo "active";}?>>
                                    <a href="<?php echo base_url();?>admin/sub_category">Sub Category</a>
                                </li>
                                
                            </ul>
                        </li>
                        <li class="nav-item dropdown open">
                            <a class="dropdown-toggle" href="articles">
                                <span class="icon-holder">
                                    <i class="anticon anticon-build"></i>
                                </span>Articles
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle" href="articles_approval">
                                <span class="icon-holder">
                                    <i class="anticon anticon-hdd"></i>
                                </span>Articles Approval
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle" href="image_request">
                                <span class="icon-holder">
                                    <i class="anticon anticon-form"></i>
                                </span>Image Request
                            </a>
                        </li>
                       
                    </ul>
                </div>
            </div>