let life = 100;
let secondesplayed = 0;
let minutesplayed = 0;
let hoursplayed = 0;
let shock_on = false;
let asteroid_destroy = 0;
let shockwave_available = 3;

$(document).mousemove(function (e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    $("#player").css("top", e.clientY + "px");
    $("#player").css("left", e.clientX + "px");
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

$(document).ready(function () {

    $("#restart-over").click(function (e) { 
        e.preventDefault();
        location.reload();
    });

    function displayLife() {
        if (life <= 0) {
            console.log("GAME OVER");
            $("html, body").css("cursor", "default");
            $("#game-over").css("display", "");
            $("game_window").remove();
        }
        $("#life").css("width", life + "%");
    }

    function displayAsteroid() {
        $("#stats-asteroid").html("Astéroïdes détruits : " + asteroid_destroy);
        $("#stats-asteroid-over").html("Astéroïdes détruits : " + asteroid_destroy);
    }

    function displayShockwave() {
        console.log("resfresh");
        if (shockwave_available >= 3) {
            $("#shock-1").css("width", "100%");
            $("#shock-1").css("opacity", "1");
            $("#shock-2").css("width", "100%");
            $("#shock-2").css("opacity", "1");
            $("#shock-3").css("width", "100%");
            $("#shock-3").css("opacity", "1");
        } else if (shockwave_available >= 2) {
            $("#shock-1").css("width", "100%");
            $("#shock-1").css("opacity", "1");
            $("#shock-2").css("width", "100%");
            $("#shock-2").css("opacity", "1");
            $("#shock-3").css("width", ((shockwave_available - 2) * 100) + "%");
            $("#shock-3").css("opacity", "0.5");
        } else if (shockwave_available >= 1) {
            $("#shock-1").css("width", "100%");
            $("#shock-1").css("opacity", "1");
            $("#shock-2").css("width", ((shockwave_available - 1) * 100) + "%");
            $("#shock-2").css("opacity", "0.5");
            $("#shock-3").css("width", "0%");
        } else {
            $("#shock-1").css("width", (shockwave_available * 100) + "%");
            $("#shock-1").css("opacity", "0.5");
            $("#shock-2").css("width", "0%");
            $("#shock-3").css("width", "0%");
        }
    }

    let nb_wave = 1;
    let countdown = -7;
    setInterval(() => { // ASTEROID DEPLACEMENTS
        for (let index = 0; index < (getRandomInt(20) + 18); index++) {
            let a_num = getRandomInt(10000);
            $("#game_window").append("<img class='asteroid wave_" + nb_wave + "' id='" + nb_wave + "_" + a_num + "' src='img/asteroid" + getRandomInt(5) + ".png' style='max-width: " + (getRandomInt(60) + 40) + "px; rotate(360deg) translate(-50%, -50%);'>");
            switch (getRandomInt(4)) {
                case 0: // top
                    $("#" + nb_wave + "_" + a_num).css("top", "-25vh");
                    $("#" + nb_wave + "_" + a_num).css("left", (getRandomInt(100) + 1) + "vw");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: (getRandomInt(100) + 1) + "vh",
                        top: "125vh",
                        deg: getRandomInt(721),
                    }, {
                        duration: (getRandomInt(3000) + 5000),
                        step: function (now) {
                            $(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
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
                        duration: (getRandomInt(3000) + 5000),
                        step: function (now) {
                            $(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
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
                        duration: (getRandomInt(3000) + 5000),
                        step: function (now) {
                            $(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
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
                        duration: (getRandomInt(3000) + 5000),
                        step: function (now) {
                            $(this).css({ transform: 'rotate(' + now + 'deg) translate(-50%, -50%)' });
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
        }, 7000);
    }, 7200);

    setInterval(() => {
        if (countdown < 0) {
            countdown++;
            if (countdown > -4) {
                $("#wave-countdown").html("Champ d'asteroides dans <b style='color:red;font-size: 130%;'>" + Math.abs(countdown) + "</b> secondes")
            } else {
                $("#wave-countdown").html("Champ d'asteroides dans <b>" + Math.abs(countdown) + "</b> secondes")
            }
        }
        else {
            $("#wave-countdown").html("Vous êtes dans le champ d'asteroides !")
            //countdown--
        }
        /*
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
        }*/
    }, 1000);

    setInterval(() => {
        if (life > 0) {
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
            $("#timer-over").html("Temps joué : " + ('0' + hoursplayed).slice(-2) + "h" + ('0' + minutesplayed).slice(-2) + "m" + ('0' + secondesplayed).slice(-2) + "s")
        }
    }, 1000);

    setInterval(() => { // COLLISION SYSTEM
        $(".wave_" + nb_wave).each(function (index) {
            let asteroid_Xmin;
            let asteroid_Xmax;
            let asteroid_Ymax;
            let asteroid_Ymin;
            let player_Xmin;
            let player_Xmax;
            let player_Ymax;
            let player_Ymin;
            if (shock_on == true) {
                asteroid_Xmin = parseFloat($(this).css("left")) - ((parseFloat($(this).css("max-width")) / 2) + (parseInt($(".shockwave").css("width")) / 3))
                asteroid_Xmax = parseFloat($(this).css("left")) + ((parseFloat($(this).css("max-width")) / 2) + (parseInt($(".shockwave").css("width")) / 3))
                asteroid_Ymax = parseFloat($(this).css("top")) + ((parseFloat($(this).css("max-width")) / 2) + (parseInt($(".shockwave").css("width")) / 3))
                asteroid_Ymin = parseFloat($(this).css("top")) - ((parseFloat($(this).css("max-width")) / 2) + (parseInt($(".shockwave").css("width")) / 3))
                player_Xmin = parseFloat($(".shockwave").css("left")) - (parseInt($(".shockwave").css("width")) / 3)
                player_Xmax = parseFloat($(".shockwave").css("left")) + (parseInt($(".shockwave").css("width")) / 3)
                player_Ymax = parseFloat($(".shockwave").css("top")) + (parseInt($(".shockwave").css("width")) / 3)
                player_Ymin = parseFloat($(".shockwave").css("top")) - (parseInt($(".shockwave").css("width")) / 3)
                $("#player").css("opacity", 0.6)
            } else {
                asteroid_Xmin = parseFloat($(this).css("left")) - (parseFloat($(this).css("max-width")) / 2)
                asteroid_Xmax = parseFloat($(this).css("left")) + (parseFloat($(this).css("max-width")) / 2)
                asteroid_Ymax = parseFloat($(this).css("top")) + (parseFloat($(this).css("max-width")) / 2)
                asteroid_Ymin = parseFloat($(this).css("top")) - (parseFloat($(this).css("max-width")) / 2)
                player_Xmin = parseFloat($("#player").css("left")) - 25
                player_Xmax = parseFloat($("#player").css("left")) + 25
                player_Ymax = parseFloat($("#player").css("top")) + 25
                player_Ymin = parseFloat($("#player").css("top")) - 25
                $("#player").css("opacity", 1)
            }


            if (player_Ymax > asteroid_Ymin && player_Ymax < asteroid_Ymax) {
                // MATCH BOTTOM JOUEUR
                if (player_Xmax > asteroid_Xmin && player_Xmax < asteroid_Xmax) {
                    console.log("COLLISION DROITE BOTTOM");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
                    console.log("COLLISION GAUCHE BOTTOM");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                }
            } else if (player_Ymin < asteroid_Ymax && player_Ymin > asteroid_Ymin) {
                // MATCH TOP JOUEUR
                if (player_Xmax > asteroid_Xmin && player_Xmax < asteroid_Xmax) {
                    console.log("COLLISION DROITE TOP");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
                    console.log("COLLISION GAUCHE TOP");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                }
            } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
                // MATCH GAUCHE JOUEUR
                if (player_Ymax > asteroid_Ymin && player_Ymax < asteroid_Ymax) {
                    console.log("COLLISION GAUCHE BOTTOM");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                }
                if (player_Ymin < asteroid_Ymax && player_Ymin > asteroid_Ymin) {
                    console.log("COLLISION GAUCHE TOP");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                }
            } else if (player_Xmax > asteroid_Xmin && player_Xmax < asteroid_Xmax) {
                // MATCH DROITE JOUEUR
                if (player_Ymax > asteroid_Ymin && player_Ymax < asteroid_Ymax) {
                    console.log("COLLISION DROITE BOTTOM");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                }
                if (player_Ymin < asteroid_Ymax && player_Ymin > asteroid_Ymin) {
                    console.log("COLLISION DROITE TOP");
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
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

    setInterval(() => {
        if (shockwave_available < 3) {
            shockwave_available = shockwave_available + 0.002
            displayShockwave();
        }
    }, 20);

    $(document).mousedown(function () {
        if (shock_on == false && shockwave_available > 1) {
            shock_on = true
            shockwave_available = shockwave_available - 1;
            console.log(shockwave_available);
            displayShockwave();
            let shockwave_id = getRandomInt(100000)
            $("#game_window").append("<div class='shockwave' id='" + shockwave_id + "' style='left: " + $("#player").css("left") + "; top: " + $("#player").css("top") + "; width:5px; height:5px;'></div>")
            $("#" + shockwave_id).animate({
                width: "400px",
                height: "400px",
                opacity: 0,
            }, 800);
            setTimeout(() => {
                $("#" + shockwave_id).remove()
            }, 900);
            setTimeout(() => {
                shock_on = false
            }, 1000);
        }
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 32 && shock_on == false && shockwave_available > 1) {
            shock_on = true
            shockwave_available = shockwave_available - 1;
            console.log(shockwave_available);
            displayShockwave();
            let shockwave_id = getRandomInt(100000)
            $("#game_window").append("<div class='shockwave' id='" + shockwave_id + "' style='left: " + $("#player").css("left") + "; top: " + $("#player").css("top") + "; width:5px; height:5px;'></div>")
            $("#" + shockwave_id).animate({
                width: "400px",
                height: "400px",
                opacity: 0,
            }, 800);
            setTimeout(() => {
                $("#" + shockwave_id).remove()
            }, 900);
            setTimeout(() => {
                shock_on = false
            }, 1000);
        }
    });

});