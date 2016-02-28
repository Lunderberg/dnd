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
