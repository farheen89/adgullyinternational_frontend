var base_url  = $("#base_url").val();
$(document).delegate('.delete', 'click', function() {
    if (confirm('Do you really want to delete record?')) {
        var id = $(this).attr('id');
        var parent = $(this).parent().parent();
        $.ajax({
            type: "POST",
            url: base_url+"admin/delete_country",
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

function save_country() { 
        if ($('[id="switch-1"]').is(':checked')){ 
            var is_active = 1;
        } else { 
            var is_active = 0;
        }
    var name = $("#countryname").val();
    var redirecttocountry = $("#redirecttocountry").val();

    
   $( "#form-validation" ).validate({
        ignore: ':hidden:not(:checkbox)',
        errorElement: 'label',
        errorClass: 'is-invalid',
        validClass: 'is-valid',
        rules: {
            countryname: {
                required: true
            },
            redirecttocountry: {
                required: true
            }

        },
        submitHandler: function(form) {
         $.ajax({
            type: "POST",
            url: base_url+"api/add_country",
            data: "name="+name+"&is_active="+is_active+"&redirecttocountry="+redirecttocountry,
            cache: false,
            dataType:"json",  
            success: function(data) {
                if (data.stat) 
                {
                location.href = data.send_to;
                }
                else
                {
                alert( data.msg );
                }
                $("#msgAdd").html( "<span style='color: green'>Country added successfully</span>");
                $("#countryname").val('');
            },
            error: function() {
                $("#msgAdd").html( "<span style='color: red'>Error adding a new Country</span>");
                $("#countryname").val('');
            }
        });
        }
    }); 
}

$(document).on('click', '.edit', function(){  
   var id = $(this).attr("id");    
   $.ajax({  
        url:base_url+"api/get_country/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){
         console.log(data);
             $('#modal_name').val(data.name);   
             $('#modal_id').val(data.id); 
             //$("#modal_redirecttocountry").append("<option selected='selected' id="+data.redirecttocountry+">"+data.redirecttocountry+"</option>");
             $('#side-modal-right-edit').modal('show');  
        }  
   });  
  });  

function update_country() {
    var name    = $("#modal_name").val();
    var id      = $("#modal_id").val();
    var redirecttocountry      = $("#modal_redirecttocountry").val();
     $.ajax({
            type: "POST",
            url: base_url+"api/update_country",
            data: "name="+name+"&id="+id+"&redirecttocountry="+redirecttocountry,
            cache: false,
            dataType:"json",  
            success: function(data) {
                 if (data.stat) 
                {
                    location.href = data.send_to;
                }
                else
                {
                    alert( data.msg );
                }
                $("#msgAdd_modal").html( "<span style='color: green'>Country Updated successfully</span>");
                $("#modal_name").val('');
            },
            error: function() {
                $("#msgAdd_modal").html( "<span style='color: red'>Error updating a Country</span>");
                $("#modal_name").val('');
            }
        });       
}

$(document).on('click', '.updatestatus', function(){
    var id = $(this).attr("id");    
    $.ajax({  
        url:base_url+"api/updatecountry_status/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){      
            window.location.reload();       
        }  
    });  
});   
