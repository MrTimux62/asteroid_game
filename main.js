let life = 100;
let secondesplayed = 0;
let minutesplayed = 0;
let hoursplayed = 0;

$(document).mousemove(function (e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    $("#player").css("top", e.clientY + "px");
    $("#player").css("left", e.clientX + "px");
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

$(document).ready(function () {

    function displayLife() {
        $("#life").css("width", life + "%");
    }

    let nb_wave = 1;
    let countdown = -10;
    setInterval(() => { // ASTEROID DEPLACEMENTS
        for (let index = 0; index < (getRandomInt(10) + 4); index++) {
            let a_num = getRandomInt(10000);
            $("#game_window").append("<img class='asteroid wave_" + nb_wave + "' id='" + nb_wave + "_" + a_num + "' src='img/asteroid"+ getRandomInt(5) +".png' style='max-width: " + (getRandomInt(60) + 40) + "px; translate(-50%, -50%);'>");
            switch (getRandomInt(4)) {
                case 0: // top
                    $("#" + nb_wave + "_" + a_num).css("top", "-25vh");
                    $("#" + nb_wave + "_" + a_num).css("left", (getRandomInt(100) + 1) + "vw");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: (getRandomInt(100) + 1) + "vh",
                        top: "125vh",
                        deg: getRandomInt(721),
                    }, {
                        duration: (getRandomInt(3000) + 6000),
                        step: function (now) {
                            //$(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
                        }
                    });
                    break;
                case 1: // left
                    $("#" + nb_wave + "_" + a_num).css("top", (getRandomInt(100) + 1) + "vh");
                    $("#" + nb_wave + "_" + a_num).css("left", "-25vw");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: "125vw",
                        top: (getRandomInt(100) + 1) + "vh",
                        ddeg: getRandomInt(721),
                    }, {
                        duration: (getRandomInt(3000) + 6000),
                        step: function (now) {
                            //$(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
                        }
                    });
                    break;
                case 2: // right
                    $("#" + nb_wave + "_" + a_num).css("top", (getRandomInt(100) + 1) + "vh");
                    $("#" + nb_wave + "_" + a_num).css("left", "125vw");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: "-25vw",
                        top: (getRandomInt(100) + 1) + "vh",
                        deg: getRandomInt(721),
                    }, {
                        duration: (getRandomInt(3000) + 6000),
                        step: function (now) {
                            //$(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
                        }
                    });
                    break;
                case 3: // bottom
                    $("#" + nb_wave + "_" + a_num).css("top", "125vh");
                    $("#" + nb_wave + "_" + a_num).css("left", (getRandomInt(100) + 1) + "vh");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: (getRandomInt(100) + 1) + "vw",
                        top: "-25vh",
                        deg: getRandomInt(721),
                    }, {
                        duration: (getRandomInt(3000) + 6000),
                        step: function (now) {
                            //$(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
                        }
                    });
                    break;
                default:
                    break;
            }
            $("#" + nb_wave + "_" + a_num).css("top",)
        }
        setTimeout(() => {
            $(".wave_" + nb_wave).remove();
            nb_wave++;
        }, 9500);
    }, 10000);

    setInterval(() => {
        if (countdown < 0) {
            countdown ++;
            if (countdown > -4) {
                $("#wave-countdown").html("Première vague dans <b style='color:red;font-size: 130%;'>"+ Math.abs(countdown) +"</b> secondes")
            } else {
                $("#wave-countdown").html("Première vague dans <b>"+ Math.abs(countdown) +"</b> secondes")
            }
        } else {
            countdown--
        }
        if (countdown == 0) {
            countdown = 10
        }
        if (countdown > 5) {
            $("#wave-countdown").html("Vague en approche !")
        } else if (countdown > 3) {
            $("#wave-countdown").html("Prochaine vague dans <b>"+countdown+"</b> secondes")
        }
        else if (countdown > 0) {
            $("#wave-countdown").html("Prochaine vague dans <b style='color:red;font-size: 130%;'>"+countdown+"</b> secondes")
        }
    }, 1000);

    setInterval(() => {
        secondesplayed++;
        if (secondesplayed > 59) {
            minutesplayed++;
            secondesplayed = 0;
            if (minutesplayed > 59) {
                hoursplayed++;
                minutesplayed = 0;
            }
        }
        $("#timer").html("Temps joué : " + ('0' + hoursplayed).slice(-2) + "h" + ('0' + minutesplayed).slice(-2) + "m" + ('0' + secondesplayed).slice(-2) + "s")
        
    }, 1000);

    setInterval(() => { // COLLISION SYSTEM
        $(".wave_" + nb_wave).each(function( index ) {
            let asteroid_Xmin = parseFloat($(this).css("left")) - (parseFloat($(this).css("max-width")) / 2) 
            let asteroid_Xmax = parseFloat($(this).css("left")) + (parseFloat($(this).css("max-width")) / 2)
            let asteroid_Ymax = parseFloat($(this).css("top")) + (parseFloat($(this).css("max-width")) / 2)
            let asteroid_Ymin = parseFloat($(this).css("top")) - (parseFloat($(this).css("max-width")) / 2)
            let player_Xmin = parseFloat($("#player").css("left")) - 25
            let player_Xmax = parseFloat($("#player").css("left")) + 25
            let player_Ymax = parseFloat($("#player").css("top")) + 25
            let player_Ymin = parseFloat($("#player").css("top")) - 25

            if (player_Ymax > asteroid_Ymin && player_Ymax < asteroid_Ymax) {
                // MATCH BOTTOM JOUEUR
                if (player_Xmax > asteroid_Xmin && player_Xmax < asteroid_Xmax) {
                    console.log("COLLISION DROITE BOTTOM");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
                    console.log("COLLISION GAUCHE BOTTOM");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                }
            } else if (player_Ymin < asteroid_Ymax && player_Ymin > asteroid_Ymin) {
                // MATCH TOP JOUEUR
                if (player_Xmax > asteroid_Xmin && player_Xmax < asteroid_Xmax) {
                    console.log("COLLISION DROITE TOP");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
                    console.log("COLLISION GAUCHE TOP");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                }
            } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
                // MATCH GAUCHE JOUEUR
                if (player_Ymax > asteroid_Ymin && player_Ymax < asteroid_Ymax) {
                    console.log("COLLISION GAUCHE BOTTOM");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                }
                if (player_Ymin < asteroid_Ymax && player_Ymin > asteroid_Ymin) {
                    console.log("COLLISION GAUCHE TOP");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                }
            } else if (player_Xmax > asteroid_Xmin && player_Xmax < asteroid_Xmax) {
                // MATCH DROITE JOUEUR
                if (player_Ymax > asteroid_Ymin && player_Ymax < asteroid_Ymax) {
                    console.log("COLLISION DROITE BOTTOM");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                }
                if (player_Ymin < asteroid_Ymax && player_Ymin > asteroid_Ymin) {
                    console.log("COLLISION DROITE TOP");
                    life = life - parseInt((parseInt($(this).css("max-width")) -30) / (getRandomInt(4) + 3))
                    displayLife();
                    $(this).remove()
                }
            }
            /*
            console.log("POSITION : " + parseFloat($("#player").css("left")) + "G " + parseFloat($("#player").css("top")) + "D");
            console.log("PLAYER : " + player_Xmax + "D " + player_Xmin + "G " + player_Ymax + "B " + player_Ymin + "T");
            console.log("ASTEROID : " + asteroid_Xmax + "D " + asteroid_Xmin + "G " + asteroid_Ymax + "B " + asteroid_Ymin + "T");
            */
          });
    }, 50);

});