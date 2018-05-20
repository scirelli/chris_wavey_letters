(function() {
    'use strict';
    
    window.two = two;

    function two(){
        const PHRASE = 'Hello world!',
              FONT_SIZE = 30,
              FONT_COLOR = 'black',
              SCALE_FACTOR = 10,
              ITERATIONS = 360;
        let letters = createLetterDivs(PHRASE),
            sin = [],
            cos = [];

        animate(letters, ITERATIONS);

        function animate(letters, theta) {
            for(let i=0,l=letters.length, c; i<l; i++){
                c = letters[i];
                
                
                c.position.x = c.startPosition.x + Math.cos(Math.degreeToRad(c.theta.x)) * c.theta.x;
                c.position.y = c.startPosition.y + Math.sin(Math.degreeToRad(c.theta.y)) * c.theta.y;

                c.theta.x--;
                c.theta.y--
                if(c.theta.x < 0) c.theta.x=0;
                if(c.theta.y < 0) c.theta.y=0;

                c.style.top = c.position.y + 'px';
                c.style.left = c.position.x + 'px';
               
            }
            theta--;
            if(theta >= 0){
                window.setTimeout(function() {
                    animate(letters, theta);
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
                l.scaleFactor = new Point(Math.random() * 1000, Math.random()*1000);
                l.theta = new Point(~~(Math.random() * 360), ~~(Math.random() * 360));
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
                l.position.x = l.startPosition.x + Math.cos(Math.degreeToRad(l.theta.x)) * l.theta.x;
                l.position.y = l.startPosition.y + Math.sin(Math.degreeToRad(l.theta.y)) * l.theta.y;
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
