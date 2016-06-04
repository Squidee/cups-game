CupGame.Style = function (game) {
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.defaultText;
};

CupGame.Style.defaultText = function (fontSize, width)
{
    return this.defaultText(fontSize, width, "#46a8ef");
};

CupGame.Style.defaultText = function (fontSize, width, aColor)
{
    var style = { font: '', fontSize: fontSize, fill: aColor, wordWrap: true, wordWrapWidth: width, align: "center" };
    
    return style;
};
