$(document).ready(function () {
	for(var i=1;i<11;i++)	{
  	newDiv(i);
    $("div."+i).css("color", getRandomColor());
  }

  $.get( "https://62fe4c23a85c52ee483484f9.mockapi.io/love/hearts/1", function( data ) {
    var response = new Date(data.createdAt);    
    	$('div > i').click(function() {        
        if(response<new Date()){      
          var id = $(this).attr('class');
          
          $.get( "https://62fe4c23a85c52ee483484f9.mockapi.io/love/gift/"+id, function(gifts) {
            alert('Te has ganado '+ gifts.name);
          })

          response = addHours(24);
          var data = { 
            "createdAt": addHours(24), 
            "name": id, 
            "avatar":'identificador seleccionado '+id
          };
          API_Resource('https://62fe4c23a85c52ee483484f9.mockapi.io/love/hearts/1','PUT',data,null,null,null,null);
        }else{          
          alert(`Se puede ejecutar luego de ${response.toLocaleString()}`)
        }     
      });      
  })        
});

function newDiv(i) {
    var $div = $("<div class='"+i+"'><i class='las la-heart'></i></div>");
    $(".animatedDivs").append($div);    
    animateDiv();

    function animateDiv() {
        var newq = makeNewPosition();
        var oldq = $div.offset();
        var speed = calcSpeed([oldq.top, oldq.left], newq);

        $div.animate({
            top: newq[0]+100,
            left: newq[1]
        }, speed, function () {
            animateDiv();
        });

    };
}

function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 150;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = .3;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 *  Metodo generico para invocación de API REST 
 *  URL  -> Url de servicio junto con path
 *  data -> datos a enviar en servicio
 *  headers -> cabeceras de servicio
 *  callbackDone -> funcion a ejecutar luego que finalize correctamente petición.
 *  callbackInit -> funcion a ejecutar cuando inicia la petición.
 *  callbackError -> funcion a ejecutar cuando haya error
 */
function API_Resource(URL,type,data,headers,callbackDone,callbackInit,callbackError){
    $.ajax({
        url: URL,
        headers: headers,
        type: type,
        data: data,
        beforeSend: function() {
            if(callbackInit!=null){
                callbackInit();
            }
        },
    })
    .done(function(data) {
      if(callbackDone!=null){
        callbackDone(JSON.stringify(data));
      }      
    })
    .fail(function(error) {
       if(callbackError!=null){
          callbackError(JSON.stringify(error));
       }      
    });   
}

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}