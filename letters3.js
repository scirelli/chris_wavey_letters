(function() {
    'use strict';
    
    window.three = three;

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
    Math.degreeToRad = function degreeToRad(deg){
        return deg*Math.PI/180;
    };
    
    function queryObj(){
        return window.location.search.substr(1).split('&').reduce((acc, s)=>{
            s = s.split('=').map((s)=>{ return window.decodeURIComponent(s) });
            acc[s[0]] = s[1];
            return acc;
        }, {});
    }

    function three(phrase){
        const PHRASE = phrase || queryObj().phrase || 'Hello world!',
              FONT_SIZE = 30,
              FONT_COLOR = 'black',
              SCALE_FACTOR = 1000,
              ITERATIONS = SCALE_FACTOR;
        let letters = createLetterDivs(PHRASE),
            sin = [],
            cos = [];

        animate(letters, 0);

        function animate(letters, iterations) {
            for(let i=0,l=letters.length, c; i<l; i++){
                c = letters[i];
                
                c.position.x = c.startPosition.x + Math.cos(Math.degreeToRad(c.theta)) * c.scaleFactor.x;
                c.position.y = c.startPosition.y + Math.sin(Math.degreeToRad(c.theta)) * c.scaleFactor.y;

                c.style.top = c.position.y + 'px';
                c.style.left = c.position.x + 'px';
 
                c.theta++;
                if(--c.scaleFactor.x < 0){
                    c.scaleFactor.x = 0;
                }
                if(--c.scaleFactor.y < 0){
                    c.scaleFactor.y = 0;
                }
            }

            if(++iterations < ITERATIONS){
                window.setTimeout(function() {
                    animate(letters, iterations);
                }, 0);
            }else{
                window.setTimeout(function(){
                    removeLetters(letters);
                },1000)
            }
        }

        function createLetterDivs(phrase){
            let phraseWidth = 0,
                phraseHeight = 0,
                offset = 0,
                initPoint,
               letterElements;
             const LETTER_SPACING = 1,
                   SPACE_WIDTH = 10;

            letterElements = phrase.split('').map((c,i)=>{
                let l = document.createElement('div');
                l.innerText = c;
                l.style.fontSize = FONT_SIZE + 'px';
                l.style.color = FONT_COLOR;
                l.style.position = 'fixed';
                l.style.visibility = 'hidden';
                l.style.padding = '0';
                l.style.margin = '0';
                l.style.zIndex = 1000;
                document.body.appendChild(l);

                if(l.innerHTML.trim() === ''){
                    phraseWidth += SPACE_WIDTH;
                }
                phraseWidth += l.offsetWidth + LETTER_SPACING;
                phraseHeight = Math.max(phraseHeight, l.offsetHeight)
                return l;
            });
        
            offset = 0;
            initPoint = new Point(
               window.innerWidth/2 - phraseWidth/2,
               window.innerHeight/2 - phraseHeight/2
            );
            letterElements.forEach((l,i)=>{
                l.startPosition = new Point(0,0);
                l.position = l.startPosition.clone();
                l.startPosition.x = initPoint.x + offset;
                if(l.innerHTML.trim() === '') offset += SPACE_WIDTH;
                offset += l.offsetWidth + LETTER_SPACING;

                l.startPosition.y = initPoint.y;
                l.theta = Math.random() * 360;
                l.scaleFactor = new Point(Math.random() * SCALE_FACTOR, Math.random()*SCALE_FACTOR);
                l.position.x = l.startPosition.x + Math.cos(Math.degreeToRad(l.theta)) * l.scaleFactor.x;
                l.position.y = l.startPosition.y + Math.sin(Math.degreeToRad(l.theta)) * l.scaleFactor.y;
                l.style.top = l.position.y + 'px';
                l.style.left = l.position.x + 'px';

                l.style.visibility = 'visible';
            });

            return letterElements;
        }

        function removeLetters(letters){
            letters.forEach(l=>{
                l.remove();
            });
        }
    };
})();
