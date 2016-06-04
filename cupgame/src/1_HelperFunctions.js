function RGBtoHEX(r, g, b) {    
    return r << 16 | g << 8 | b;    
}

function animateResizeGame(game, width, height, scale, completeFunction) {    
    var widthTo = width * scale;
    var heightTo = height * scale;
    
    var totalSteps = 60;
    var stepCount = 1;
    
    var differenceWidth = width - widthTo;
    var differenceHeight = height - heightTo;
    
    var grow = false;
    
    if(scale>=1)
    {
        grow = true;   
    }
    
    if(grow)
    {
        differenceWidth = width + widthTo;
        differenceHeight = height + heightTo;
        
        $("canvas").animate({
            'width': differenceWidth + "px",
            'height': differenceHeight + "px",
            'left': "-"+ (widthTo) + "px",
            'top': "-"+ (heightTo) + "px"
        }, 1000).animate({
            'width': width + "px",
            'height': height + "px",
            'left':  "0px",
            'top':  "0px"
        }, 1000);
    }
    else
    {    
        $("canvas").animate({
            'width': differenceWidth + "px",
            'height': differenceHeight + "px",
            'left': (differenceWidth) + "px",
            'top': (differenceHeight) + "px"
        }, 1000).animate({
            'width': width + "px",
            'height': height + "px",
            'left':  "0px",
            'top':  "0px"
        }, 1000);
    }
    
}

function randomNumberWithMax(itemSize)
{
    var returnRandom =  Math.floor(Math.random() * (itemSize)) + 1;
    
    return returnRandom;
}
        
function distractSize(game, scaleTo)
{
    (function(object) { 
        animateResizeGame(object, object.scale.width, object.scale.height, scaleTo, function(){
            
        });
    })(game)
}

function resetGameSizeWidth(object)
{
    if(object.device.desktop)
    {
        return DESKTOP_GAME_WIDTH;
    }
    else
    {
        return MOBILE_GAME_WIDTH;   
    }
}

function resetGameSizeHeight(object)
{
    if(object.device.desktop)
    {
        return DESKTOP_GAME_HEIGHT;
    }
    else
    {
        return MOBILE_GAME_HEIGHT;   
    }
}

(function( $ ){
   $.fn.pauseGame = function(game, statePause, aWidth, aHeight) {
       
       if(statePause)
       {
         //console.log(aWidth);  
         game.scale.width = aWidth;
         game.scale.height = aHeight;
         // Tell ScaleManager that we have changed sizes (updates canvas styles)
         game.scale.setSize();
       }
       else
       {
            game.scale.setMinMax(MIN_GAME_WIDTH, MIN_GAME_HEIGHT, resetGameSizeWidth(game), resetGameSizeHeight(game));
            game.scale.refresh();
       }
        
       
      
      return this;
   }; 
})( jQuery );
