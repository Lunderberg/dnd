function stat_bonus(stat_score) {
    return Math.floor((stat_score-10)/2);
}

function define_stat_watcher(input_name, output_name) {
    var input = document.getElementById(input_name)
    var output = document.getElementById(output_name)

    function callback() {
        var bonus = stat_bonus(input.value);
        output.innerHTML = bonus;
    }

    input.addEventListener("change", callback);
}

function die_roll(n_sides) {
    return 1 + Math.floor(Math.random() * n_sides);
}

function stat_roll() {
    var sum = 0;
    var worst_roll = 6;
    for(var i=0; i<4; i++){
        var roll = die_roll(6);
        worst_roll = Math.min(worst_roll, roll);
        sum += roll;
    }
    return sum - worst_roll;
}

function roll_all_stats() {
    var score_names = ["str-score","dex-score","con-score",
                       "int-score","wis-score","cha-score"];
    for(var i=0; i<score_names.length; i++){
        var score_name = score_names[i];
        var bonus_name = score_name.replace("score","bonus");
        var score = document.getElementById(score_name);
        var bonus = document.getElementById(bonus_name);
        score.value = stat_roll();
        bonus.innerHTML = stat_bonus(score.value);
    }
}

define_stat_watcher("str-score", "str-bonus");
define_stat_watcher("dex-score", "dex-bonus");
define_stat_watcher("con-score", "con-bonus");
define_stat_watcher("int-score", "int-bonus");
define_stat_watcher("wis-score", "wis-bonus");
define_stat_watcher("cha-score", "cha-bonus");

document.getElementById("roll-stats").addEventListener("click",roll_all_stats);
