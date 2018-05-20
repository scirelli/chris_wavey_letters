(function() {
    'use strict';
    
    window.Point = Point;

    function Point(x,y){
        this.x = x;
        this.y = y;
    }
    Point.prototype.clone = function clone(){
        return new Point(this.x, this.y);
    };
    Point.prototype.copy = function copy(p){
        this.x = p.x;
        this.y = p.y;
        return this;
    };
})();
