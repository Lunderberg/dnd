---
layout: empty
---

"use strict";

{% include dice.js %}
{% include event_emitter.js %}
{% include character.js %}

var char = new Character();

function onStatChange(stat) {
    var score_name = stat.name + "-score";
    var bonus_name = stat.name + "-bonus";
    var score = document.getElementById(score_name);
    var bonus = document.getElementById(bonus_name);
    score.value = stat.score;
    bonus.innerHTML = stat.bonus;
}

char.events.on("stat-change",onStatChange);

function temp() { }

["STR","DEX","CON","INT","WIS","CHA"].forEach(function(statname) {
    var input = document.getElementById(statname + "-score");
    var stat = char.stats[statname];
    input.addEventListener("change", function() {
        stat.score = input.value;
    });
});

document.getElementById("roll-stats").addEventListener(
    "click",char.rollAllStats.bind(char));
