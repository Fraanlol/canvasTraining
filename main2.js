const asd = document.querySelector('#canvas2')

// Handle canvas positioning

asd.height = canvas.height/2;
asd.width = canvas.height/2;
let tposi = (canvas.height - asd.offsetHeight ) / 2;
let wposi = (canvas.width - asd.offsetWidth) / 2;
asd.style.left = `${wposi}px`;
asd.style.top = `${tposi}px`;



const rrrt = asd.getContext('2d');

let ttrewq = [];
Huse = 0;


class Particleq{
    constructor() {
        this.x = Math.random() * asd.width;
        this.y = Math.random() * asd.height;
        this.size = Math.random() * 8 + 2
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > asd.width){
            this.speedX = this.speedX*-1;
        }else if(this.y > asd.height){
            this.speedY = this.speedY*-1;
        }
        if(this.x < 0){
            this.speedX = this.speedX*-1;
        }else if(this.y < 0){
            this.speedY = this.speedY*-1;
        }
        if(this.size > 0.2){
            this.size -= 0.1;
        }
    }

    draw(){
        rrrt.fillStyle = `hsl(${Huse},100%,50%)`;
        rrrt.beginPath();
        rrrt.arc(this.x, this.y, this.size,0,Math.PI * 2);
        rrrt.fill()
    }
}

function sghuytre(){
    for(let i = 0; i < 700; i++){
        ttrewq.push(new Particleq())
    }
}

function rrtttuuuuyy(){
    ttrewq.forEach((k) => {
        k.update();
        k.draw();
        if(k.size <= 0.3){
            ttrewq.splice(ttrewq.indexOf(k),1);
        }
    })
}


function kkkoooiip(){
    while(ttrewq.length < 700){
        ttrewq.push(new Particleq());
    }
    rrrt.fillStyle = 'rgba(0,0,0,0.2)'
    rrrt.fillRect(0,0,asd.width,asd.height);
    //rrrt.clearRect(0,0,asd.width,asd.height);
    rrtttuuuuyy();
    Huse--;
    requestAnimationFrame(kkkoooiip);
}

sghuytre()
kkkoooiip()