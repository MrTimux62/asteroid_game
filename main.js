let life = 100;
let secondesplayed = 0;
let minutesplayed = 0;
let hoursplayed = 0;
let shock_on = false;
let asteroid_destroy = 0;
let shockwave_available = 3;
let player_X = 0;
let player_Y = 0;
let canvas = $("#line-target");
let player_speed = 300;
let boost_on = false;
let power_engine = false;
let difficulty = 4;
let boost_charge = true;
let play = false;
let nb_wave = 1;
let countdown = -7;
let engine = new Audio('sound/engine.mp3');
let shockwave = new Audio('sound/shockwave.mp3');
shockwave.volume = 0.3;
let impact = new Audio('sound/impact.mp3');
impact.volume = 0.3;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

$("#play").click(function (e) {
    e.preventDefault();
    $("#MENU").stop().animate({ top: "-100vh" }, 2000);
    setTimeout(() => {
        play = true;
        setTimeout(() => {
            $("#tutorial").stop().animate({ opacity: 0 }, 1000);
        }, 6000);
        $("#MENU").remove();

        var ambiant = new Audio('sound/ambient-space-sound.mp3');
        ambiant.loop = true;
        ambiant.volume = 0.1;
        ambiant.play();
    }, 2000);
    setInterval(() => { // ASTEROID DEPLACEMENTS
        for (let index = 0; index < (getRandomInt(difficulty * 2) + difficulty * 1); index++) {
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
        if (play == true) {
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
            }
        }
    }, 1000);
});

$(document).ready(function () {

    function displayDifficulty() {
        if (difficulty <= 4) {
            $("#difficulty").html("Difficulté : Très Facile");
            $("#difficulty-over").html("Difficulté : Très Facile");
        } else if (difficulty <= 6) {
            $("#difficulty").html("Difficulté : Facile");
            $("#difficulty-over").html("Difficulté : Facile");
        } else if (difficulty <= 8) {
            $("#difficulty").html("Difficulté : Normal");
            $("#difficulty-over").html("Difficulté : Normal");
        } else if (difficulty <= 10) {
            $("#difficulty").html("Difficulté : Assez Dur");
            $("#difficulty-over").html("Difficulté : Assez Dur");
        } else if (difficulty <= 12) {
            $("#difficulty").html("Difficulté : Difficile");
            $("#difficulty-over").html("Difficulté : Difficile");
        } else if (difficulty <= 14) {
            $("#difficulty").html("Difficulté : Très Difficile");
            $("#difficulty-over").html("Difficulté : Très Difficile");
        } else if (difficulty <= 16) {
            $("#difficulty").html("Difficulté : Hardcore");
            $("#difficulty-over").html("Difficulté : Hardcore");
        } else if (difficulty >= 18) {
            $("#difficulty").html("Difficulté : Impossible");
            $("#difficulty-over").html("Difficulté : Impossible");
        }
    }

    setInterval(() => {
        if (play == true) {
            difficulty = difficulty + 2;
            displayDifficulty();
        }
    }, 45000);

    $(document).click(function (e) {
        e.preventDefault();
        if (boost_charge == true && play == true) {
            engine = new Audio('sound/engine_boost.mp3');
            engine_sound_on = true;
            engine.volume = 0.2;
            engine.loop = true;
            engine.play();
            boost_charge = false
            boost_on = true
            $("#player img").prop("src", "img/player_boost_max.png")
            player_speed = 200;
            $("#boost").stop().animate({ width: "0%" }, 1500);
            setTimeout(() => {
                player_speed = 300;
                $("#player img").prop("src", "img/player_boost.png")
                boost_on = false
                engine.pause();
                engine.currentTime = 0;
                $("#boost").stop().animate({ width: "100%" }, 4500);
            }, 1500);
            setTimeout(() => {
                boost_charge = true;
            }, 6000);
        }

    });

    setInterval(() => {
        if (parseInt($("#target-player").css("left")) - parseInt($("#player").css("left")) > 2) {
            player_X = 1;
        } else if (parseInt($("#target-player").css("left")) - parseInt($("#player").css("left")) < -2) {
            player_X = -1;
        } else {
            player_X = 0;
        }
        if (parseInt($("#target-player").css("top")) - parseInt($("#player").css("top")) > 2) {
            player_Y = 1;
        } else if (parseInt($("#target-player").css("top")) - parseInt($("#player").css("top")) < -2) {
            player_Y = -1;
        } else {
            player_Y = 0;
        }
    }, 10);

    setInterval(() => {
        if (player_X != 0 || player_Y != 0) {
            power_engine = true
            if (boost_on != true) {
                $("#player img").prop("src", "img/player_boost.png")
                if (engine.paused) {
                    engine = new Audio('sound/engine.mp3');
                    engine.volume = 0.2;
                    engine.loop = true;
                    engine.play();
                }
            } else {
                $("#player img").prop("src", "img/player_boost_max.png")
            }
            $("#player").stop().animate({ left: $("#target-player").css("left"), top: $("#target-player").css("top") }, player_speed);
            if (Math.abs(parseInt($("#target-player").css("left")) - parseInt($("#player").css("left"))) < 100 && Math.abs(parseInt($("#target-player").css("top")) - parseInt($("#player").css("top"))) < 100) {
                engine.pause();
                engine.currentTime = 0;
                power_engine = false;
                $("#player img").prop("src", "img/player.png")
            }
        }
    }, 50);

    function getPixelRatio(context) { // CANVAS RATIO
        dpr = window.devicePixelRatio || 1,
            bsr = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return dpr / bsr;
    }

    setInterval(() => {
        var canvas = document.getElementById("line-target");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let player_posX = parseInt($("#player").css("left"));
        let player_posY = parseInt($("#player").css("top"));
        let target_posX = parseInt($("#target-player").css("left"));
        let target_posY = parseInt($("#target-player").css("top"));
        var pixelRatio = getPixelRatio(ctx);
        var initialWidth = canvas.clientWidth * pixelRatio;
        var initialHeight = canvas.clientHeight * pixelRatio;
        var width = initialWidth * pixelRatio;
        var height = initialHeight * pixelRatio;
        if (width != ctx.canvas.width)
            ctx.canvas.width = width;
        if (height != ctx.canvas.height)
            ctx.canvas.height = height;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.beginPath();
        ctx.moveTo(player_posX, player_posY);
        ctx.lineTo(target_posX, target_posY);
        ctx.setLineDash([5, 15]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();
    }, 10);

    setInterval(() => {
        if (power_engine == true) {
            var mouseXY = {};
            mouseXY.X = parseInt($("#target-player").css("left")) - 30;
            mouseXY.Y = parseInt($("#target-player").css("top")) - 30;

            var player = $("#player");
            var prevXY = { X: null, Y: null };
            if (prevXY.Y != mouseXY.Y || prevXY.X != mouseXY.X && (prevXY.Y != null || prevXY.X != null)) {

                var cowXY = player.position();
                var diffX = cowXY.left - mouseXY.X;
                var diffY = cowXY.top - mouseXY.Y;
                var tan = diffY / diffX;

                var atan = Math.atan(tan) * 180 / Math.PI;;
                if (diffY > 0 && diffX > 0) {
                    atan += 180;
                }
                else if (diffY < 0 && diffX > 0) {
                    atan -= 180;
                }

                prevXY.X = mouseXY.X;
                prevXY.Y = mouseXY.Y;
                atan = atan + 90;
                player.css({ transform: "rotate(" + atan + "deg) translate(-50%, -50%)" });
            }
        }
    }, 10);

    $(document).mousemove(function (e) {
        // values: e.clientX, e.clientY, e.pageX, e.pageY
        $("#target-player").css("top", e.clientY + "px");
        $("#target-player").css("left", e.clientX + "px");
    });

    $("#restart-over").click(function (e) {
        e.preventDefault();
        location.reload();
    });

    function displayLife() {
        impact.play();
        if (life <= 0) {
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

    setInterval(() => {
        if (play == true) {
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
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
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
                    if (shock_on == false) {
                        life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3))
                        displayLife();
                    } else {
                        asteroid_destroy++;
                        displayAsteroid();
                    }
                    $(this).remove()
                } else if (player_Xmin < asteroid_Xmax && player_Xmin > asteroid_Xmin) {
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
            shockwave_available = shockwave_available + 0.0015
            displayShockwave();
        }
    }, 20);
    /*
        $(document).mousedown(function () {
            if (shock_on == false && shockwave_available > 1) {
                shock_on = true
                shockwave_available = shockwave_available - 1;
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
        });*/

    $(document).keydown(function (e) {
        if (e.keyCode == 32 && shock_on == false && shockwave_available > 1) {
            shock_on = true
            shockwave_available = shockwave_available - 1;
            displayShockwave();
            let shockwave_id = getRandomInt(100000)
            shockwave.play();
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