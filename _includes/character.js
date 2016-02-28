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
