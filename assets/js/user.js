var base_url  = $("#base_url").val();


$( document ).ready(function() {
    
    user_table();
});

$(document).delegate('.delete', 'click', function() {
    if (confirm('Do you really want to delete record?')) {
        var id = $(this).attr('user_id');
        var parent = $(this).parent().parent();
        $.ajax({
            type: "POST",
            url: base_url+"api/delete_user",
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


$(document).on('click', '.edit_user', function(){ 
   var id = $(this).attr("user_id");    
   $('.user_id').val(id);
   open_new_user_form();
   $.ajax({  
        url:base_url+"api/get_user/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){ 

            $('#modal_id').val(data.id);
            $('#username').val(data.username);  
            $('#emailid').val(data.email);  
            $('#mobileno').val(data.mobile_no);  
            $('#password').val(data.password); 
            
            if(data.is_active=='1')
            {
                $('#switch-1').prop('checked', true);
            }
            else
            {
                $('#switch-1').prop('checked', false);
            }
        }  
   });  
  });  



function user_table()
{

    $('#user_table').DataTable({
        destroy: true,
        "ajax": 'json',
        processing: true,
        serverSide: false,
        ajax:  base_url+"api/get_user_data"
    });

}

function edit_access(id)
{    
    $('.user_id').val(id);
    open_new_user_form();

    $('.add_userform').hide();
    $('.access_form').show();    
    $('.country_form').hide();

   $.ajax({  
        url:base_url+"api/get_user/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){ 

            $('#modal_id').val(data.id);
            $('#username').val(data.username);  
            $('#emailid').val(data.email);  
            $('#mobileno').val(data.mobile_no);  
            $('#password').val(data.password); 
            
            if(data.is_active=='1')
            {
                $('#switch-1').prop('checked', true);
            }
            else
            {
                $('#switch-1').prop('checked', false);
            }
            user_table();
        }  
   });

}



function close_target()
{
    $('#side-modal-right').toggle();
    $("#side-modal-right").toggleClass("show");
    $('.add_userform').show();
    $('.access_form').hide();    
    $('.country_form').hide();
    $(".user_id").val('0');
}


function open_new_user_form()
{
    // $('.user_id').val('0');
    $('#side-modal-right').toggle();
    $("#side-modal-right").toggleClass("show");
    $('.country_form').hide();

    $.ajax({  
        url:base_url+"api/get_user_acces_list",  
        method:"GET",  
        data:{id:$('.user_id').val()},  
        success:function(resp)
        {
            var data = JSON.parse(resp); 
            var option = '';
            $(".check_box_data").html('');  
            $(".check_box_data_country").html('');  
             
            if(data['list'].length>0)
            {   
                for (var i = 0; i < data['list'].length; i++) 
                {
                    option += '<div class="form-check">'+
                    '  <input class="form-check-input" type="checkbox" value="'+data['list'][i].id+'" name="user_access[]" id="flexCheckDefault'+data['list'][i].id+'">'+
                    '  <label class="form-check-label" for="flexCheckDefault">'+
                    '  '+data['list'][i].title+
                    '  </label>'+
                    '</div>';
                }
                $(".check_box_data").html(option);  
            }


            if(data['access'].length>0)
            {   
                $("input[name='user_access[]']").each( function () {
                    $(this).prop('checked', false);
                });

                for (var i = 0; i < data['access'].length; i++) 
                {
                    $("#flexCheckDefault"+data['access'][i].access_id).prop('checked', true);
                }    
            }



            if(data['country_list'].length>0)
            {   
                option ='';
                for (var i = 0; i < data['country_list'].length; i++) 
                {
                    option += '<div class="form-check">'+
                    '  <input class="form-check-input" type="checkbox" value="'+data['country_list'][i].id+'" name="country_access[]" id="country_access'+data['country_list'][i].id+'">'+
                    '  <label class="form-check-label" for="flexCheckDefault">'+
                    '  '+data['country_list'][i].name+
                    '  </label>'+
                    '</div>';
                    // '( Redirect To :'+data['country_list'][i].name+')'+
                }
                $(".check_box_data_country").html(option);  
            }

            if(data['country_access'].length>0)
            {   
                $("input[name='country_access[]']").each( function () {
                    $(this).prop('checked', false);
                });

                for (var i = 0; i < data['country_access'].length; i++) 
                {
                    $("input[name='country_access[]']").each( function () {
                        $('#country_access'+data['country_access'][i].access_id).prop('checked', true);
                    });
                }    
            }
        }  
    });

}

function save_user_access()
{
     $.ajax({
        type: "GET",
        url: base_url+"api/add_user_access?"+$('#form-validation2').serialize(),
        cache: false,
        dataType: "JSON",
        success: function(resp) 
        {
            var data = JSON.parse(resp);
            if (data.stat) 
            {
              //  $('#side-modal-right').toggle();
               // $("#side-modal-right").toggleClass("show");
                $('.country_form').show();
                $('.access_form').hide(); 
               // $(".user_id").val('0');
                user_table();
            }
            else
            {
                alert(data.msg );
            }
        },
        error: function() {
           alert(" Error adding a new user ");
        }
    });
}

function save_user_country()
{
     $.ajax({
        type: "GET",
        url: base_url+"api/add_user_country?"+$('#form-validation3').serialize(),
        cache: false,
        dataType: "JSON",
        success: function(data) 
        {
            // var data = JSON.parse(resp);
            if (data.stat) 
            {
                $('#side-modal-right').toggle();
                $("#side-modal-right").toggleClass("show");
                $('.add_userform').show();
                $('.access_form').hide();
                $('.country_form').hide();

                $(".user_id").val('0');
                user_table();
            }
            else
            {
                alert(data.msg );
            }
        },
        error: function() {
           alert(" Error adding a new user ");
        }
    });
}

function save_user() 
{ 
    var is_active = 0;
    if ($('[id="switch-1"]').is(':checked'))
    { 
        is_active = 1;
    } 
    else 
    { 
        is_active = 0;
    }

    var username    = $("#username").val();
    var emailid     = $("#emailid").val();
    var mobileno    = $("#mobileno").val(); 
    var password    = $("#password").val(); 
    var user_id     = $(".user_id").val(); 
    
    $( "#form-validation" ).validate({
        ignore: ':hidden:not(:checkbox)',
        errorElement: 'label',
        errorClass: 'is-invalid',
        validClass: 'is-valid',
        rules: {
            username: {
                required: true
            },
           emailid: {
                required: true
            }, 
            mobileno: {
                required: true
            }, 
            password: {
                required: true
            }
        },
        submitHandler: function(form) {  
         $.ajax({
            type: "GET",
            url:  base_url+"api/add_user",
            data: "user_id="+user_id+"&username="+username+"&emailid="+emailid+"&mobileno="+mobileno+"&password="+password,
            cache: false,
            dataType: "JSON",
            success: function(data) {
                if (data.stat) 
                {
                    $('.add_userform').hide();
                    $('.access_form').show();
                    $('.country_form').hide();
                    $(".user_id").val(data.last_id);
                    user_table();
                }
                else
                {
                    alert(data.msg );
                }
            },
            error: function() {
                alert(" Error adding a new user ");
            }
        });
        }
    }); 
}



function update_user() {
    var username    = $("#modal_username").val();
    var id          = $("#modal_id").val();
    var mobileno    = $("#modal_mobileno").val();
    var emailid     = $("#modal_emailid").val();
     $.ajax({
            type: "POST",
            url: base_url+"api/update_user",
            data: "username="+username+"&id="+id+"&mobileno="+mobileno+"&emailid="+emailid,
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
                $("#msgAdd_modal").html( "<span style='color: green'>User Updated successfully</span>");
                $("#modal_name").val('');
            },
            error: function() {
                $("#msgAdd_modal").html( "<span style='color: red'>Error updating a User</span>");
                $("#modal_name").val('');
            }
        });       
}

$(document).on('click', '.updatestatus', function(){
    var id = $(this).attr("id");    
    $.ajax({  
        url:base_url+"api/updateuser_status/"+id,  
        method:"POST",  
        data:{id:id},  
        dataType:"json",  
        success:function(data){      
            window.location.reload();       
        }  
    });  
});   
