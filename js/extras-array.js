(function() {
  'use strict';

  if (!Array.prototype.choose) {
    Array.prototype.choose = function() {
      return this[randRangeInt(0, this.length)];
    }
  }

  if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
      for (var i = 0, l = this.length, r, tmp; i < l; i++) {
        r = randRangeInt(0, l);
        tmp = this[i];
        this[i] = this[r];
        this[r] = tmp;
      }

      return this;
    }
  }

  function randRangeInt(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  }
})();
