(function() {
    'use strict';
 
    Math.degreeToRad = function degreeToRad(deg){
        return deg*Math.PI/180;
    };

    if (!Math.randRangeInt) {
        Math.randRangeInt = function(min, max) {
            return Math.floor((Math.random() * (max - min)) + min);
        }
    }
})();
