$(document).ready(function() {
    
    getCarMakes();
    
    $('#makes').change(function() {
        getCarModels($(this).val());
    });
    
    $('#models').change(function() {
        getCarEngines($('#makes').val(), 
        $(this).val());
    });
    
    var name = "";
    var zip = "";

    $('.ajax-fun').submit(function(event) {
            event.preventDefault();
            
            name = $('#name').val();
            zip = $('#zip').val();
            
            var data = {
                action: 'save',
                make: $('#makes').val(),
                model: $('#models').val(),
                engine: $('#engines').val(),
                name: name,
                phone: $('#phone').val(),
                email: $('#email').val(),
                zip: zip,
                contact: $(".ajax-fun input[type='radio']:checked").val()
            };
            
            $.ajax({
                url: 'handler.php',
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                    // console.log(data);
                    getGeoCode(data.zip);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error!');
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
            
            
    });
        
    function getCarMakes()
    {
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: {
                action: 'makes',
            },
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                
               
                $('#makes').append("<option value=''>Please Select a Make.....</option>");
                
                for (var i=1; i < data.length; i++) {
                    $('#makes').append('<option value= ' + data[i][0] + '>' + data[i][1] + '</option>');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
            }
        });
    }
    
    
    
    function getCarModels(makeId)
    {
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: {
                action: 'models', 
                make: makeId,
            },
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                
      
                $('#models').append("<option value=''>Please Select a Model.....</option>");
                
                for (var i=0; i < data.length; i++) {
                    $('#models').append('<option value=' + data[i][0] + '>' + data[i][1] + '</option>');
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
            }
        });
    }
    
  
    
    function getCarEngines(makeId, modelId)
    {
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: {
                action: 'engines',
                make: makeId,
                model : modelId,
            },
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                
                
                $('#engines').append("<option value=''>Please Select a Engine.....</option>");
                
                for(var i=0; i < data.length; i++)
                {
                    $('#engines').append('<option value=' + data[i][0] + '>' + data[i][1] + '</option>');
                    
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
            }
        });
    }


    
    function getGeoCode(zip)
    {
        var data = {
            action: 'geocode',
            zipcode: zip,
        };
        
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                
                var greeting = "Thank you " + name + "!";
                var zipState = "Here are the closest car dealerships to your " + zip + " zipcode.";
                var list = "";
                
                $.each(data, function(key, value) {
                    list += "<ul class='dealer'>";
                    list += "<li class='name'>"+ value.details.name +"</li>";
                    list += "<li class='addy'>"+ value.details.address + "</li>";
                    list += "<li class='phone'>" + value.details.phone + "</li>";
                    list += "<li class='url'><a href='" + value.details.url + "' target='_blank'>" + value.details.url + "</a></li>";
                    list += "<li class='rating'>Rating: " + value.details.rating + "</li>";
                    list += "</ul>";
                });
                
                $('.ajax-fun').hide();
                $('h1.greeting').html(greeting).show();
                $('h2.zip-statement').html(zipState).show();
                $('.list').html(list).show();
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
    
}); //end of document