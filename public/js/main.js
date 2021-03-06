$( document ).ready(function() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext('2d');
    var coordenadas = document.getElementById('coordenadas');
    var cordX = document.getElementById('x');
    var cordY = document.getElementById('y');
    var input = $( ".input" );
    var txt = $(input).find('.tituloChamado');
    var x1 = $( ".input-father" ).find( '.x1');
    var y1 = $( ".input-father" ).find( '.y1');
    var x2 = $( ".input-father" ).find( '.x2');
    var y2 = $( ".input-father" ).find( '.y2');
    var x3 = $( ".input-father" ).find( '.x3');
    var y3 = $( ".input-father" ).find( '.y3');
    
    $('.chamaGrafico').click(function(){
        var name = $(this).text();
        var x3 = input.find('.xy3');
        input.show().css('display', 'inline-flex');
        txt.html(name);
        (name == 'Triângulo')?$(x3).show():$(x3).hide();
    });
    /**
    * 
    * MOUSE CLICK FUCNTION SAVE IN DOM
    * 
    */
    $('#myCanvas').click(function(evt){
        var mousePos = getMousePos(this, evt);
        x = Math.round(mousePos.x);
        y = Math.round(mousePos.y);

        if($('.tituloChamado').text() == 'Triângulo'){
            switch (click) {
                case 1:
                ponto1(x , y);
                click += 1;
                break;

                case 2:
                ponto2(x , y);
                click += 1;                
                break;
            
                case 3:
                ponto3(x , y);
                click = 1;
                break;
                default:
                    break;
            }
        } else {
            switch (click) {
                case 1:
                ponto1(x , y);
                click += 1;
                break;

                case 2:
                ponto2(x , y);
                click = 1;                
                break;
            }
        }
    });
    
    function ponto1(x , y){
        x1.val(x);
        y1.val(y);
    }
    
    
    function ponto2(x , y){
        x2.val(x);
        y2.val(y);
    }

    function ponto3(x , y){
        x3.val(x);
        y3.val(y);
    }
    
    /**
    * 
    * Metódo chama para desenhar no canvas
    * 
    */
    
    //
    canvas.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            alert('eaeae');
            $('.montar').click();
        }
    });   

    function limparA(){
         $('.clicked').each(function(){
            $('a').removeClass('clicked');
         });
    }

    $('a').click(function(){
        limparA();
        $(this).toggleClass('clicked');
    });
    
    $('.TESTE').click(function(){
        var x1 = $( ".input-father" ).find( '.x1');
        var y1 = $( ".input-father" ).find( '.y1');
        var x2 = $( ".input-father" ).find( '.x2');
        var y2 = $( ".input-father" ).find( '.y2');
        console.log(retornaLinha(x1.val(),y1.val(),x2.val(),y2.val()));
    });
    
    $('.montar').click(function(){
        var canvas = document.getElementById("myCanvas");
        var input = $( ".input" );
        var txt = $(input).find('.tituloChamado').text();
        var x1 = $( ".input-father" ).find( '.x1');
        var y1 = $( ".input-father" ).find( '.y1');
        var x2 = $( ".input-father" ).find( '.x2');
        var y2 = $( ".input-father" ).find( '.y2');
        var x3 = $( ".input-father" ).find( '.x3');
        var y3 = $( ".input-father" ).find( '.y3');
        
        switch(txt) {
            case 'Reta':
            montaReta(x1 , y1 , x2 , y2);
            break;
            case 'Retângulo':
            montaRetangulo(x1 , y1 , x2 , y2);
            break;
            case 'Triângulo':
            montaTriangulo(x1 , y1 , x2 , y2, x3 , y3);    
            break;
            case 'Círculo':
            montaCirculo(x1 , y1 , x2, y2);
            break;
            default:
        }
    });
    
    
    function writeMessage(coordenadas, x, y) {
        cordX.innerHTML = x;
        cordY.innerHTML = y;
        
        
    }
    
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        }; 
    }
    
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var messageX = 'X ' + Math.round(mousePos.x);
        var messageY =  ' Y ' + Math.round(mousePos.y);        
        writeMessage(coordenadas, messageX, messageY);
    }, false);
    
    function montaReta(x1 , y1 , x2 , y2){
        context.moveTo(x1.val(),y1.val());
        context.lineTo(x2.val(),y2.val());
        context.stroke();
    }
    
    function montaRetangulo(x1 , y1 , x2 , y2){
        context.moveTo(x1.val(),y1.val());
        context.lineTo(x1.val(),y2.val());
        context.stroke();
        context.moveTo(x1.val(),y2.val());
        context.lineTo(x2.val(),y2.val());
        context.stroke();
        context.moveTo(x2.val(),y2.val());
        context.lineTo(x2.val(),y1.val());
        context.stroke();
        context.moveTo(x2.val(),y1.val());
        context.lineTo(x1.val(),y1.val());
        context.stroke();
    }
    
    function montaTriangulo(x1 , y1 , x2 , y2, x3 , y3){
        context.moveTo(x1.val(),y1.val());
        context.lineTo(x2.val(),y2.val());
        context.stroke();
        context.moveTo(x2.val(),y2.val());
        context.lineTo(x3.val(),y3.val());
        context.stroke();
        context.moveTo(x3.val(),y3.val());
        context.lineTo(x1.val(),y1.val());
        context.stroke();
    }
    
    function montaCirculo(x1 , y1 , x2, y2){
        context.beginPath();
        a = x1.val() - x2.val();
        b = y1.val() - y2.val();
        var raio = Math.sqrt( a*a + b*b );
        // if(raio <  0){raio *= -1};
        context.arc(x1.val(), y1.val() , raio , 0, 2 * Math.PI);
        context.stroke();
        
        
    }   
    
});