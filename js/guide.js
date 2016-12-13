$(document).ready(function() {

    var cards = $(".card");
    var num_cards = cards.length;
    var delay = 250;

    cards.each(function(i) {
        var changes = {"opacity": 1, "margin-top": "0px"}
        var div = $(this);
        setTimeout(function() {
            div.animate(changes, 500, function() {
                if (i == num_cards - 1)
                    $(".card-container").css("overflow", "auto");
            })
        }, i * delay);
    });

});