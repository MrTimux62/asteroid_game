let ambiant = new Audio('sound/ambiant.mp3');

$(document).mousemove(function (e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    $("#player").css("top", e.clientY + "px");
    $("#player").css("left", e.clientX + "px");
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

$(document).ready(function () {
    let nb_wave = 1;
    setInterval(() => {
        for (let index = 0; index < (getRandomInt(5) + 2); index++) {
            let a_num = getRandomInt(10000);
            $("#game_window").append("<img class='asteroid wave_" + nb_wave + "' id='" + nb_wave + "_" + a_num + "' src='img/asteroid1.png' style='max-width: " + (getRandomInt(75) + 25) + "px; transform: rotate(" + getRandomInt(360) + "deg);'>");
            switch (getRandomInt(4)) {
                case 0: // top
                    $("#" + nb_wave + "_" + a_num).css("top", "-50vh");
                    $("#" + nb_wave + "_" + a_num).css("left", (getRandomInt(100) + 1) + "vw");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: (getRandomInt(100) + 1) + "vh",
                        top: "150vh",
                    }, 9000);
                    break;
                case 1: // left
                    $("#" + nb_wave + "_" + a_num).css("top", (getRandomInt(100) + 1) + "vh");
                    $("#" + nb_wave + "_" + a_num).css("left", "-50vw");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: "150vw",
                        top: (getRandomInt(100) + 1) + "vh",
                    }, 9000);
                    break;
                case 2: // right
                    $("#" + nb_wave + "_" + a_num).css("top", (getRandomInt(100) + 1) + "vh");
                    $("#" + nb_wave + "_" + a_num).css("left", "150vw");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: "-50vw",
                        top: (getRandomInt(100) + 1) + "vh",
                    }, 9000);
                    break;
                case 3: // bottom
                    $("#" + nb_wave + "_" + a_num).css("top", "150vh");
                    $("#" + nb_wave + "_" + a_num).css("left", (getRandomInt(100) + 1) + "vh");
                    $("#" + nb_wave + "_" + a_num).animate({
                        left: (getRandomInt(100) + 1) + "vw",
                        top: "-50vh",
                    }, 9000);
                    break;
                default:
                    break;
            }
            $("#" + nb_wave + "_" + a_num).css("top",)
        }
        setTimeout(() => {
            $("." + nb_wave).remove();
        }, 9500);
        nb_wave++;
    }, 10000);

});