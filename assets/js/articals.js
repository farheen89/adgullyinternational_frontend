
$(document).ready(function() {
    var crudServiceBaseUrl = base_url;
    var dataSource = new kendo.data.DataSource({
        requestEnd: function (e) {
            var widget = $("#products").getKendoMultiSelect();
            var dataSource = e.sender;

            if (e.type === "create") {
                var newValue = e.response[0].id;

                dataSource.one("sync", function () {
                    widget.value(widget.value().concat([newValue]));
                });
            }
        },
        batch: true,
        transport: {
            read:  {
                url: crudServiceBaseUrl + "api/tag_list",
                dataType: "jsonp"
            },
            create: {
                url: crudServiceBaseUrl + "api/create_tag",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { type: "number" },
                    tag_title: { type: "string" }
                }
            }
        }
    });

    var multi =$("#products").kendoMultiSelect({
        filter: "startswith",
        dataTextField: "tag_title",
        dataValueField: "id",
        dataSource: dataSource,
        noDataTemplate: $("#noDataTemplate").html()
    })
});

$(function () {

    new Quill('#editor', {
        theme: 'snow'
    });

    // $.datetimepicker.setLocale('en');
    // $('#datetimepicker1').datetimepicker({
    //       dateFormat: 'yyyy/mm/dd',
    //       timeFormat: 'hh:mm',
    //       stepHour: 2,
    //       stepMinute: 10
    //  });
    $('#datetimepicker1').datetimepicker();
    category_dropdown();
    country_dropdown();
    $(".category").change(function(){
        subcategory_dropdown();
    });
    approval_dropdown();
});

function hide_form(){
    $('.add_artical').hide();
    $('.table_data').show();
}

function show_form(){
    $('.add_artical').show();
    $('.table_data').hide();
}

function save_artical()
{
    var multiselect = $("#products").data("kendoMultiSelect");
    var selectedData= [];
    var items = multiselect.value();
    $.each(items ,function(i,v){
      selectedData.push(v);
    });
    $.ajax({
        type: "GET",
        url: base_url+"api/save_article?"+$('#artical_form').serialize()+'&content='+$('.ql-editor').html()+'&tag='+selectedData,
        cache: false,
        success: function(resp) {
            var data = JSON.parse(resp); 
            var option = '';
            if(data.stat)
            {
                hide_form();
            }
            else
            {
                show_form();
            }
            // for (var i = 0; i < data.length; i++) 
            // {
            // }   
        },
        error: function() {
        }
    });

}

function addNew(widgetId, value) {
        var widget = $("#" + widgetId).getKendoMultiSelect();
        var dataSource = widget.dataSource;
        if (confirm("Are you sure?")) {
            dataSource.add({
                ProductID: 0,
                ProductName: value
            });
            dataSource.sync();
        }
    }


function request_img_remove(param){
    $(param).parents('.img_block').remove();
}

function request_img_addmore()
{
    $('.add_more').append(
        '<div class="row img_block">'+
        '    <div class="col">'+
        '        <div class="form-group">'+
        '            <input type="file" name="customfile[]"  class="custom-file-input customfile">'+
        '            <label class="custom-file-label" for="customFile">Choose file</label>'+
        '        </div> '+
        '    </div>'+
        '    <div class="col-2">'+
        '    <button class="btn btn-success btn-block request_img" type="button" onclick="request_img()">'+
        '        Request Image'+
        '    </button>'+
        '    </div>'+
        '    <div class="col-1">'+
        '        <strong style="line-height: 40px;"><-OR-></strong>'+
        '    </div>'+
        '    <div class="col">'+
        '        <div class="input-group mb-3">'+
        '            <div class="input-group-prepend">'+
        '                <span class="input-group-text" id="basic-addon1" style="color: red;">'+
        '                    <i class="fab fa-youtube"></i>'+
        '                </span>'+
        '            </div>'+
        '            <input type="text" class="form-control" aria-label="Youtube Embeded Video Link" aria-describedby="basic-addon1"  name="embeded_link[]" placeholder="Youtube Embeded Video Link">'+
        '        </div>'+
        '    </div>'+
        '    <div class="col-1">'+
        '        <button class="btn btn-danger btn-block request_img" type="button" '+
        '           onclick="request_img_remove(this)" request_img="1" '+
        '           style = "font-size: 15px;"><i class="anticon anticon-delete"></i></button>'+
        '    </div>'+
        '</div>');
}

function approval_user_dropdown() {
     $.ajax({
        type: "GET",
        url: base_url+"api/approval_user",
        cache: false,
        success: function(resp) {
            var data = JSON.parse(resp); 
            var option = '';
            for (var i = 0; i < data.length; i++) 
            {
                if(i == 0)
                {
                    option +='<option  value="'+data[i].id+'" selected>'+data[i].username.toUpperCase()+'</option>'; 
                }
                else
                {
                    option +='<option  value="'+data[i].id+'">'+data[i].username.toUpperCase()+'</option>'; 
                }
            }   
            $('.approvaluser').html(option);
        },
        error: function() {
        }
    });
}


function approval_dropdown() {
    $.ajax({
        type: "GET",
        url: base_url+"api/approval_needed",
        cache: false,
        success: function(resp) {
            var data = JSON.parse(resp); 
            // console.log(data.stat);
            if(data.stat)
            {
                $('#approvaluser').val('0');
                $('#approvalneeded').val('0');

                $('#approvalneeded').attr('disabled', data.stat);
                $('#approvaluser').attr('disabled', data.stat);
                $('#approvaluser').html('<option value="0">Approval Not Needed</option>');
                $('#approvalneeded').html('<option value="0">No</option>');
            }
            else
            {
                $('#approvalneeded').html('<option value="1">Yes</option>');
                $('#approvalneeded').val('1');
                $('#approvalneeded').attr('disabled', data.stat);
                $('#approvaluser').attr('disabled', data.stat);
                approval_user_dropdown();
            }
            // var option = '';
            // for (var i = 0; i < data.length; i++) 
            // {
            //     if(i == 0)
            //     {
            //         option +='<option  value="'+data[i].id+'" selected>'+data[i].name.toUpperCase()+'</option>'; 
            //     }
            //     else
            //     {
            //         option +='<option  value="'+data[i].id+'">'+data[i].name.toUpperCase()+'</option>'; 
            //     }
            // }   
            // $('.category').html(option);
            // subcategory_dropdown();
        },
        error: function() {
        }
    });
}


function category_dropdown() {
    $.ajax({
        type: "GET",
        url: base_url+"api/list_category",
        data: 'id=0',
        cache: false,
        success: function(resp) {
            var data = JSON.parse(resp); 
            var option = '';
            for (var i = 0; i < data.length; i++) 
            {
                if(i == 0)
                {
                    option +='<option  value="'+data[i].id+'" selected>'+data[i].name.toUpperCase()+'</option>'; 
                }
                else
                {
                    option +='<option  value="'+data[i].id+'">'+data[i].name.toUpperCase()+'</option>'; 
                }
            }   
            $('.category').html(option);
            subcategory_dropdown();
        },
        error: function() {
            $('#msgAdd').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
            $(this).remove();
            });
        }
    });
}


function subcategory_dropdown() {
    $.ajax({
        type: "GET",
        url: base_url+"api/list_subcategory",
        data: 'id='+$('.category').val(),
        cache: false,
        success: function(resp) {
            var data = JSON.parse(resp); 
            var option = '';
            for (var i = 0; i < data.length; i++) 
            {
                option +='<option  value="'+data[i].id+'">'+data[i].name.toUpperCase()+'</option>'; 
            }   
            $('.subcategory').html(option);
        },
        error: function() {
        }
    });
}



function country_dropdown() {
    $.ajax({
        type: "GET",
        url: base_url+"api/list_country",
        data: 'id='+$('.country').val(),
        cache: false,
        success: function(resp) {
            var data = JSON.parse(resp); 
            var option = '';
            for (var i = 0; i < data.length; i++) 
            {
                option +='<option  value="'+data[i].id+'">'+data[i].name.toUpperCase()+'</option>'; 
            }   
            $('.country').html(option);
        },
        error: function() {
        }
    });
}


/*


function category_dropdown() {
    $.ajax({
        type: "GET",
        url: base_url+"api/list_category",
        data: 'id=0',
        cache: false,
        success: function(resp) {
            var data = JSON.parse(resp); 
            var option = '';
            for (var i = 0; i < data.length; i++) 
            {
                option +='<option  value="'+data[i].id+'">'+data[i].name.toUpperCase()+'</option>'; 
            }   
            $('.category').html(option);
        },
        error: function() {
            $('#msgAdd').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
            $(this).remove();
            });
        }
    });
}

*/


