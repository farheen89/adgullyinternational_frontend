var base_url  = $("#base_url").val();

$(document).delegate('.delete', 'click', function() {
    if (confirm('Do you really want to delete record?')) {
        var id = $(this).attr('id');
        var parent = $(this).parent().parent();
        $.ajax({
            type: "POST",
            url: base_url+"api/delete_category",
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

function save_category() { 
        if ($('[id="switch-1"]').is(':checked'))
        { 
            var is_active = 1;
        } 
        else 
        { 
            var is_active = 0;
        }
    var name = $("#categoryname").val();
    
   $( "#form-validation" ).validate({
        ignore: ':hidden:not(:checkbox)',
        errorElement: 'label',
        errorClass: 'is-invalid',
        validClass: 'is-valid',
        rules: {
            categoryname: {
                required: true
            },
           /* is_active: {
                required: true
            }*/

        },
        submitHandler: function(form) {
         $.ajax({
            type: "POST",
            url: base_url+"api/add_category",
            data: "name="+name+"&is_active="+is_active,
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
               // $("#msgAdd").html( "<span style='color: green'>Category added successfully</span>");
                $("#categoryname").val('');
            },
            error: function() {
                $("#msgAdd").html( "<span style='color: red'>Error adding a new category</span>");
                $("#categoryname").val('');
            }
        });
        }
    }); 
}

$(document).on('click', '.edit', function(){  
   var id = $(this).attr("id");    
   $.ajax({  
        url:base_url+"api/get_category/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){ 
             $('#modal_name').val(data.name);   
             $('#modal_id').val(data.id);

               /*if (data.is_active == '1')
                $('#editVehicle').find(':radio[name=drive][value="1"]').prop('checked', true);
              else
                $('#editVehicle').find(':radio[name=drive][value="2"]').prop('checked', true);*/

             $('#side-modal-right-edit').modal('show');  
        }  
   });  
  });  

function update_category() {
    var name    = $("#modal_name").val();
    var id      = $("#modal_id").val();
     $.ajax({
            type: "POST",
            url: base_url+"api/update_category",
            data: "name="+name+"&id="+id,
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
                $("#msgAdd_modal").html( "<span style='color: green'>Category Updated successfully</span>");
                $("#modal_name").val('');
            },
            error: function() {
                $("#msgAdd_modal").html( "<span style='color: red'>Error updating a category</span>");
                $("#modal_name").val('');
            }
        });       
}

$(document).on('click', '.updatestatus', function(){
    var id = $(this).attr("id");    
    $.ajax({  
        url:base_url+"api/updatecategory_status/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){      
            window.location.reload();       
        }  
    });  
});   
