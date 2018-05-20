(function() {
    'use strict';
    
    window.one = one;

    function one(){
        const PHRASE = 'Hello world!',
              FONT_SIZE = 30,
              FONT_COLOR = 'black',
              SCALE_FACTOR = 10;
        let letters = createLetterDivs(PHRASE);
        
        animate(letters, 0, 0);

        function animate(letters, theta, count) {
            for(let i=0,l=letters.length, c; i<l; i++){
                c = letters[i];

                //c.position.x = c.startPosition.x + Math.cos(theta) * SCALE_FACTOR;
                c.position.y = c.startPosition.y + Math.sin(theta) * SCALE_FACTOR;
                theta++;
                c.style.top = c.position.y + 'px';
                c.style.left = c.position.x + 'px';
            }
            count++; 

            if(count < 20){
                window.setTimeout(function() {
                    animate(letters, theta, count);
                }, 50);
            }else{
                count=0;
                removeLetters(letters);
            }
        }
        
        function degreeToRad(deg){
            return deg*Math.PI/180;
        }

        function createLetterDivs(phrase){
            let phraseWidth = 0,
                phraseHeight = 0,
                offset = 0,
                initPoint,
                letterElements;
             const LETTER_SPACING = 2;

            letterElements = phrase.split('').map((c,i)=>{
                let l = document.createElement('div');
                l.innerText = c;
                l.style.fontSize = FONT_SIZE + 'px';
                l.style.color = FONT_COLOR;
                l.style.position = 'fixed';
                l.style.top = -1000 + 'px';
                l.style.left = -1000 + 'px';
                l.style.zIndex = 1000;
                document.body.appendChild(l);
                l.startPosition = new Point(0,0);
                l.position = l.startPosition.clone();
                phraseWidth += LETTER_SPACING*3;
                if(c === ' ') phraseWidth + FONT_SIZE;
                phraseHeight = Math.max(phraseHeight, l.offsetHeight)

                return l;
            });
        
            offset = 0;
            initPoint = new Point(
               window.innerWidth/2 - phraseWidth/2,
               window.innerHeight/2 - phraseHeight
            );
            letterElements.forEach((l,i)=>{
                l.startPosition.x = initPoint.x + offset;
                if(l.innerText.trim() === '') offset += LETTER_SPACING*3;
                l.startPosition.y = initPoint.y;
                l.position = l.startPosition.clone();
                l.style.top = l.position.y + 'px';
                l.style.left = l.position.x + 'px';
                offset += l.offsetWidth + LETTER_SPACING;
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
