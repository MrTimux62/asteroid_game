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
engine.paused
let shockwave = new Audio('sound/shockwave.mp3');
shockwave.volume = 0.3;
let impact = new Audio('sound/impact.mp3');
impact.volume = 0.3;
let boost = new Audio('sound/boost.mp3');
boost.volume = 0.3;
let speed_stats = 1;
let shockwave_stats = 1;
let time_stats = 0;
let regen_stats = 0;
let boost_time = 1500;
let shockwave_width = 400;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function displayStats() {
    boost.play();
    for (let index = 1; index <= speed_stats; index++) {
        $("#speed-bar-" + index).css("background-color", "white");
    }
    for (let index = 1; index <= shockwave_stats; index++) {
        $("#onde-de-choc-bar-" + index).css("background-color", "white");
    }
    for (let index = 1; index <= time_stats; index++) {
        $("#duree-boost-bar-" + index).css("background-color", "white");
    }
    for (let index = 1; index <= regen_stats; index++) {
        $("#regen-bar-" + index).css("background-color", "white");
    }
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

    setInterval(() => {
        if (getRandomInt(100) < 60) {
            let left_boost = (getRandomInt(91) + 5) + "vw";
            let top_boost = "-5vh";
            switch (getRandomInt(4)) {
                case 0:
                    $("#game_window").append("<img class='boost' id='speed_boost' src='img/speed_boost.png' style='left:" + left_boost + ";top:" + top_boost + "'>");
                    break;
                case 1:
                    $("#game_window").append("<img class='boost' id='shockwave_boost' src='img/shockwave_boost.png' style='left:" + left_boost + ";top:" + top_boost + "'>");
                    break;
                case 2:
                    $("#game_window").append("<img class='boost' id='time_boost' src='img/time_boost.png' style='left:" + left_boost + ";top:" + top_boost + "'>");
                    break;
                case 3:
                    $("#game_window").append("<img class='boost' id='heal_boost' src='img/heal_boost.png' style='left:" + left_boost + ";top:" + top_boost + "'>");
                    break;
                default:
                    break;
            }
            $(".boost").animate({
                top: "105vh"
            }, 8000);
            setTimeout(() => {
                $(".boost").remove();
            }, 8000);
        }
    }, 10000);

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
        }
        setTimeout(() => {
            $(".wave_" + nb_wave).remove();
            nb_wave++;
        }, 7000);
    }, 7200);


    setInterval(() => { // ENNEMI DEPLACEMENTS
        for (let index = 0; index < (getRandomInt(difficulty * 2 / 4) + difficulty * 1 / 4); index++) {
            let ennemi_id = getRandomInt(9999999);
            $("#game_window").append("<img src='img/ship_1.png' id='"+ennemi_id+"' class='ennemi'>");
            switch (getRandomInt(4)) {
                case 0: // top
                    $("#" + ennemi_id).css("top", "-10vh");
                    $("#" + ennemi_id).css("left", (getRandomInt(100) + 1) + "vw");
                    $("#" + ennemi_id).animate({
                        left: (getRandomInt(100) + 1) + "vh",
                        top: "110vh",
                    }, {
                        duration: (getRandomInt(3000) + 8000),
                    });
                    break;
                case 1: // left
                    $("#" + ennemi_id).css("top", (getRandomInt(100) + 1) + "vh");
                    $("#" + ennemi_id).css("left", "-10vw");
                    $("#" + ennemi_id).animate({
                        left: "110vw",
                        top: (getRandomInt(100) + 1) + "vh",
                    }, {
                        duration: (getRandomInt(3000) + 8000),
                    });
                    break;
                case 2: // right
                    $("#" + ennemi_id).css("top", (getRandomInt(100) + 1) + "vh");
                    $("#" + ennemi_id).css("left", "110vw");
                    $("#" + ennemi_id).animate({
                        left: "-10vw",
                        top: (getRandomInt(100) + 1) + "vh",
                    }, {
                        duration: (getRandomInt(3000) + 8000),
                    });
                    break;
                case 3: // bottom
                    $("#" + ennemi_id).css("top", "110vh");
                    $("#" + ennemi_id).css("left", (getRandomInt(100) + 1) + "vh");
                    $("#" + ennemi_id).animate({
                        left: (getRandomInt(100) + 1) + "vw",
                        top: "-10vh",
                    }, {
                        duration: (getRandomInt(3000) + 8000),
                    });
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                $("#" + ennemi_id).remove();
            }, 10000);
        }
    }, 20000);

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
                if (engine.paused && (Math.abs(parseInt($("#target-player").css("left")) - parseInt($("#player").css("left"))) > 100 || Math.abs(parseInt($("#target-player").css("top")) - parseInt($("#player").css("top"))) > 100)) {
                    engine = new Audio('sound/engine.mp3');
                    engine.volume = 0.2;
                    engine.loop = true;
                    engine.play();
                    $("#player img").prop("src", "img/player_boost.png")
                }
            } else {
                if (engine.paused && (Math.abs(parseInt($("#target-player").css("left")) - parseInt($("#player").css("left"))) > 100 || Math.abs(parseInt($("#target-player").css("top")) - parseInt($("#player").css("top"))) > 100)) {
                    engine = new Audio('sound/engine_boost.mp3');
                    engine.volume = 0.2;
                    engine.loop = true;
                    engine.play();
                    $("#player img").prop("src", "img/player_boost_max.png")
                }

            }
            $("#player").stop().animate({ left: $("#target-player").css("left"), top: $("#target-player").css("top") }, player_speed);
            if (Math.abs(parseInt($("#target-player").css("left")) - parseInt($("#player").css("left"))) < 100 && Math.abs(parseInt($("#target-player").css("top")) - parseInt($("#player").css("top"))) < 100) {
                if (!engine.paused) {
                    engine.pause();
                    engine.currentTime = 0;
                }
                power_engine = false;
                $("#player img").prop("src", "img/player.png")
            }
        }
    }, 50);
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
            boost_charge = false
            boost_on = true
            engine.pause();
            /*$("#player img").prop("src", "img/player_boost_max.png")*/
            player_speed = player_speed - 100;
            $("#boost").stop().animate({ width: "0%" }, boost_time);
            setTimeout(() => {
                player_speed = player_speed + 100;
                if (player_X == 0 && player_Y == 0) {
                    $("#player img").prop("src", "img/player.png")
                } else {
                    $("#player img").prop("src", "img/player_boost.png")
                }
                boost_on = false
                engine.currentTime = 0;
                $("#boost").stop().animate({ width: "100%" }, 4500);
                setTimeout(() => {
                    boost_charge = true;
                }, 4500);
            }, boost_time);

        }

    });

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

    setInterval(() => { // Rotate player
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

        $(".ennemi").each(function (index) {
            var mouseXY = {};
            mouseXY.X = parseInt($("#player").css("left")) - 30;
            mouseXY.Y = parseInt($("#player").css("top")) - 30;

            var player = $(this);
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
        });

    }, 10);


    setInterval(() => { // ENNEMI ATTACK
        $(".ennemi").each(function (index) {
            setTimeout(() => {
                let ennemi_X = parseFloat($(this).css("left"));
                let ennemi_Y = parseFloat($(this).css("top"));
                let target_X = parseFloat($("#player").css("left"));
                let target_Y = parseFloat($("#player").css("top"));

                let random_projectile = getRandomInt(9999999);
                $("#game_window").append("<img src='img/projectile.png' class='projectile' id='projectile_" + random_projectile + "' style='left:" + ennemi_X + "px; top:" + ennemi_Y + "px'>");

                var mouseXY = {};
                mouseXY.X = parseInt($("#player").css("left")) - 30;
                mouseXY.Y = parseInt($("#player").css("top")) - 30;

                var player = $("#projectile_" + random_projectile);
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
                let laser = new Audio('sound/laser.mp3');
                laser.volume = 0.2;
                laser.play();
                $("#projectile_" + random_projectile).stop().animate({ left: target_X + "px", top: target_Y + "px" }, 2000, 'linear');
                setTimeout(() => {
                    $("#projectile_" + random_projectile).attr("src", "img/explosion.gif");
                    $("#projectile_" + random_projectile).css("width", "100px");
                    let explosion = new Audio('sound/explosion.mp3');
                    explosion.volume = 0.3;
                    explosion.play();
                    setTimeout(() => {
                        $("#projectile_" + random_projectile).remove()
                    }, 500);
                }, 2000);
            }, getRandomInt(2000) + 500);
        });
    }, 3000);

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
        impact.pause();
        impact.currentTime = 0;
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

    setInterval(() => { // REWORK COLLISION
        let player_posX = $("#player").css("left");
        let player_posY = $("#player").css("top");

        let boost_X = $(".boost").css("left");
        let boost_Y = $(".boost").css("top");
        if (Math.abs(parseFloat(player_posX) - parseFloat(boost_X)) < 50 && Math.abs(parseFloat(player_posY) - parseFloat(boost_Y)) < 50) { // BOOST COLLISION
            if ($(".boost").attr("id") == "speed_boost" && speed_stats < 5) {
                speed_stats++;
                player_speed = 350 - speed_stats * 50;
            } else if ($(".boost").attr("id") == "shockwave_boost" && shockwave_stats < 5) {
                shockwave_stats++;
                shockwave_width = 300 + shockwave_stats * 100;
            } else if ($(".boost").attr("id") == "time_boost" && time_stats < 5) {
                time_stats++;
                boost_time = 1500 + time_stats * 500
            } else if ($(".boost").attr("id") == "heal_boost" && regen_stats < 5) {
                regen_stats++;
            }
            displayStats();
            $(".boost").remove();
        }

        $(".wave_" + nb_wave).each(function (index) { // ASTEROID COLLISION
            let asteroid_posX = $(this).css("left");
            let asteroid_posY = $(this).css("top");
            let distance_asteroid;
            if (shock_on) {
                distance_asteroid = parseFloat($(this).css("width")) / 2 + parseFloat($(".shockwave").css("width")) / 2;
                player_posX = $(".shockwave").css("left");
                player_posY = $(".shockwave").css("top");
            } else {
                distance_asteroid = parseFloat($(this).css("width")) / 2 + 30;
            }
            if (Math.abs(parseFloat(player_posX) - parseFloat(asteroid_posX)) < distance_asteroid && Math.abs(parseFloat(player_posY) - parseFloat(asteroid_posY)) < distance_asteroid) {
                if (shock_on) {
                    $(this).remove();
                    asteroid_destroy++;
                    displayAsteroid();
                } else {
                    $(this).remove();
                    life = life - parseInt((parseInt($(this).css("max-width")) - 30) / (getRandomInt(4) + 3));
                    displayLife();
                    asteroid_destroy++;
                    displayAsteroid();
                }
            }
        });

        $(".projectile").each(function (index) { // PROJECTILE COLLISION
            let projectile_posX = $(this).css("left");
            let projectile_posY = $(this).css("top");
            let distance_projectile;
            if (shock_on) {
                distance_projectile = parseFloat($(this).css("width")) / 2 + parseFloat($(".shockwave").css("width")) / 2;
                player_posX = $(".shockwave").css("left");
                player_posY = $(".shockwave").css("top");
            } else {
                distance_projectile = parseFloat($(this).css("width")) / 2 + 30;
            }
            if (Math.abs(parseFloat(player_posX) - parseFloat(projectile_posX)) < distance_projectile && Math.abs(parseFloat(player_posY) - parseFloat(projectile_posY)) < distance_projectile) {
                if (shock_on) {
                    $(this).remove();
                } else {
                    let explosion = new Audio('sound/explosion.mp3');
                    explosion.volume = 0.3;
                    explosion.play();
                    $(this).remove()
                    life = life - 10;
                    displayLife();
                }
            }
        });

    }, 50);

    // ONDE DE CHOC
    setInterval(() => {
        if (shockwave_available < 3) {
            shockwave_available = shockwave_available + 0.0015
            displayShockwave();
        }
    }, 20);

    $(document).keydown(function (e) {
        if (e.keyCode == 32 && shock_on == false && shockwave_available > 1) {
            shock_on = true
            shockwave_available = shockwave_available - 1;
            displayShockwave();
            let shockwave_id = getRandomInt(100000)
            shockwave.play();
            $("#game_window").append("<div class='shockwave' id='" + shockwave_id + "' style='left: " + $("#player").css("left") + "; top: " + $("#player").css("top") + "; width:5px; height:5px;'></div>")
            $("#" + shockwave_id).animate({
                width: shockwave_width + "px",
                height: shockwave_width + "px",
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

    // EVENEMENT




    setInterval(() => {
        if (regen_stats > 0 && life >= 0) {
            if (life + regen_stats > 100) {
                life = 100;
            } else {
                life = life + regen_stats;
            }
            displayLife();
        }
    }, 5000);


});