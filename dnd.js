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

var EventEmitter = function() {
    this.events = {};
}

EventEmitter.prototype.on = function(signal, callback) {
    var callbacks = this.events[signal];
    if(callbacks === undefined) {
        callbacks = [];
        this.events[signal] = callbacks;
    }
    callbacks.push(callback);
}

EventEmitter.prototype.emit = function(signal) {
    var callbacks = this.events[signal];
    if(callbacks !== undefined) {
        var args = Array.prototype.slice.call(arguments,1);
        callbacks.forEach(function(callback) {
            callback.apply(callback, args);
        });
    }
}

var Stat = function(name) {
    this.name = name;
    this._score = 10;
    this.events = new EventEmitter();
}

Object.defineProperty(Stat.prototype, "score", {
    get: function() {
        return this._score;
    },
    set: function(value) {
        this._score = value;
        this.events.emit("change", this);
    }
});

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
    this.stats = {};
    var events = new EventEmitter();
    this.events = events;
    var stat_names = ["STR","DEX","CON","INT","WIS","CHA"];
    for(var i=0; i<stat_names.length; i++){
        var name = stat_names[i];
        var stat = new Stat(name);
        stat.events.on("change", function(stat) {
            events.emit("stat-change", stat);
        });
        this.stats[name] = stat;
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

function onStatChange(stat) {
    var score_name = stat.name.toLowerCase() + "-score";
    var bonus_name = stat.name.toLowerCase() + "-bonus";
    var score = document.getElementById(score_name);
    var bonus = document.getElementById(bonus_name);
    score.value = stat.score;
    bonus.innerHTML = stat.bonus;
}

char.events.on("stat-change",onStatChange);

["STR","DEX","CON","INT","WIS","CHA"].forEach(function(statname) {
    var input = document.getElementById(statname.toLowerCase() + "-score");
    var stat = char.stats[statname];
    input.addEventListener("change", function() {
        stat.score = input.value;
    });
});

document.getElementById("roll-stats").addEventListener(
    "click",char.rollAllStats.bind(char));
