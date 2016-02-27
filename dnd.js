"use strict";

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

var Stat = function(name) {
    this.name = name;
    this.score = 10;
}

Object.defineProperty(Stat.prototype, "bonus", {
    get: function bonus() {
        var output = Math.floor((this.score-10)/2);
        if(output >= 0){
            output = "+" + output;
        }
        return output;
    }
});

var Character = function() {
    this.stats = new Array();
    var stat_names = ["STR","DEX","CON","INT","WIS","CHA"];
    for(var i=0; i<stat_names.length; i++){
        var name = stat_names[i];
        this.stats[name] = new Stat(name);
    }
}

Character.prototype.rollAllStats = function() {
    for(var statname in this.stats){
        if(this.stats.hasOwnProperty(statname)){
            var stat = this.stats[statname];
            stat.score = stat_roll();
        }
    }
}

var char = new Character();

function define_stat_watcher(stat) {
    var input_name = stat.toLowerCase() + "-score";
    var input = document.getElementById(input_name)

    function callback() {
        char.stats[stat].score = input.value;
        update_all();
    }

    input.addEventListener("change", callback);
}

function roll_all_stats() {
    char.rollAllStats();
    update_all();
}

function update_all() {
    for(var statname in char.stats){
        if(char.stats.hasOwnProperty(statname)){
            var stat = char.stats[statname];
            var score_name = stat.name.toLowerCase() + "-score";
            var bonus_name = stat.name.toLowerCase() + "-bonus";
            var score = document.getElementById(score_name);
            var bonus = document.getElementById(bonus_name);
            score.value = stat.score;
            bonus.innerHTML = stat.bonus;
        }
    }
}

define_stat_watcher("STR");
define_stat_watcher("DEX");
define_stat_watcher("CON");
define_stat_watcher("INT");
define_stat_watcher("WIS");
define_stat_watcher("CHA");

document.getElementById("roll-stats").addEventListener("click",roll_all_stats);
