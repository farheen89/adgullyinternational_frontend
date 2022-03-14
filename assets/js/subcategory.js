var base_url  = $("#base_url").val();
$(document).delegate('.delete', 'click', function() {
    if (confirm('Do you really want to delete record?')) {
        var id = $(this).attr('id');
        var parent = $(this).parent().parent();
        $.ajax({
            type: "POST",
            url: base_url+"api/delete_sub_category",
            data: 'id=' + id,
            cache: false,
            success: function() {
                parent.fadeOut('slow', function() {
                    $(this).remove();
                });
            },
            error: function() {
                $('#msgAdd').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
                $(this).remove();
                });
            }
        });
    }
});

function save_sub_category() {   
        if ($('[id="switch-1"]').is(':checked')){ 
            var is_active = 1;
        } else { 
            var is_active = 0;
        }
    var name = $("#subcategoryname").val();
    var cat_id = $("#cat_id").val();  
    
   $( "#form-validation" ).validate({
        ignore: ':hidden:not(:checkbox)',
        errorElement: 'label',
        errorClass: 'is-invalid',
        validClass: 'is-valid',
        rules: {
            subcategoryname: {
                required: true
            },
           /* is_active: {
                required: true
            }*/

        },
        submitHandler: function(form) {
             $.ajax({
                type: "POST",
                url: base_url+"api/add_sub_category",
                data: "name="+name+"&is_active="+is_active+"&cat_id="+cat_id,
                cache: false,
                dataType: "JSON",
                success: function(data) {  
                if (data.stat) 
                {
                    location.href = data.send_to;
                }
                else
                {
                    alert( data.msg );
                }
                    
           }
        }); 
    }
    });
}

$(document).on('click', '.edit_sub', function(){    
   var id = $(this).attr("id");    
   $.ajax({  
        url:base_url+"api/get_sub_category/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){ 
             $('#modal_subcategoryname').val(data.name);   
             $('#modal_id').val(data.id);
             $('#side-modal-right-edit').modal('show');  
        }  
   });  
  });  

function update_sub_category() {
    var name    = $("#modal_subcategoryname").val();
    var id      = $("#modal_id").val();
    var cat_id   = $("#modal_cat_id").val();
     $.ajax({
            type: "POST",
            url: base_url+"api/update_sub_category",
            data: "name="+name+"&id="+id+"&cat_id="+cat_id,
            cache: false, 
            dataType: "JSON",
            success: function(data){  
                if (data.stat) 
                {
                    location.href = data.send_to;
                }
                else
                {
                    alert( data.msg );
                }
                $("#msgAdd_modal").html( "<span style='color: green'>Subu Category Updated successfully</span>");
                $("#modal_name").val('');
            },
            error: function() {
                $("#msgAdd_modal").html( "<span style='color: red'>Error updating a Sub Category</span>");
                $("#modal_name").val('');
            }
        });       
}

$(document).on('click', '.updatestatus', function(){
    var id = $(this).attr("id");    
    $.ajax({  
        url:base_url+"api/updatesub_category_status/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){      
            window.location.reload();       
        }  
    });  
});   
