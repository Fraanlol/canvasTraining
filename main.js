
// Una clase para las particulas
// Una clase para el canvas

class CanvasClass{
    constructor(id, particles, colIn = 0) {
        this.canvasElement = document.getElementById(id)
        this.canvasContext = this.canvasElement.getContext('2d');
        this.hue = colIn;
        this.particleArray = [];
        this.particlesInfo = particles;
    }
    set width(value){
        this.canvasElement.width = value;
    }
    get width(){
        return this.canvasElement.width;
    }
    set height(value){
        this.canvasElement.height = value;
    }
    get height(){
        return this.canvasElement.height;
    }

    initParticles(){
        for(let i = 0; i < 100; i++){
            this.particleArray.push(new Particle(this, this.particlesInfo))
        }
    }

    handleParticles(){
        this.particleArray.forEach((k) => {
            k.update();
            k.draw();
            if(k.size <= 0.3){
                this.particleArray.splice(this.particleArray.indexOf(k),1);
            }
        })
    }


    updateFrames(){
        while(this.particleArray.length < 100){
            this.particleArray.push(new Particle(this, this.particlesInfo));
        }
        this.canvasContext.fillStyle = 'rgba(0,0,0,0.2)'
        this.canvasContext.fillRect(0,0,this.canvasElement.width,this.canvasElement.height);
        this.handleParticles();
        this.hue++;
    }
}

class Particle{
    constructor(canv, particlesInfo) {
        this.canvas = canv.canvasElement;
        this.ctx = canv.canvasContext;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 8 + particlesInfo.maxSize
        this.speedX = Math.random() * 3 - particlesInfo.maxSpeedX;
        this.speedY = Math.random() * 3 - particlesInfo.maxSpeedY;
        this.hue = canv.hue;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > this.canvas.width){
            this.speedX = this.speedX*-1;
        }else if(this.y > this.canvas.height){
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
        this.ctx.fillStyle = `hsl(${this.hue},100%,50%)`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size,0,Math.PI * 2);
        this.ctx.fill()
    }
}

let can1 = new CanvasClass('canvas1', {maxSize:3,maxSpeedX:8,maxSpeedY:0});
let can2 = new CanvasClass('canvas2', {maxSize: 30, maxSpeedX:1.5, maxSpeedY:1.5}, 180);


function resizeWin() {
    can1.canvasElement.width = window.innerWidth;
    can1.canvasElement.height = window.innerHeight;
    can2.canvasElement.height = can1.canvasElement.height / 2;
    can2.canvasElement.width = can1.canvasElement.height / 2;
    let tposi = (can1.canvasElement.height - can2.canvasElement.offsetHeight) / 2;
    let wposi = (can1.canvasElement.width - can2.canvasElement.offsetWidth) / 2;
    can2.canvasElement.style.left = `${wposi}px`;
    can2.canvasElement.style.top = `${tposi}px`;
}


resizeWin();
can1.initParticles();
can2.initParticles();
function runAnimations(){
    can1.updateFrames();
    can2.updateFrames();
    let cancontext = can1.canvasContext;
    let xpos = (can1.canvasElement.width - can2.canvasElement.offsetWidth) / 2;
    let ypos = (can1.canvasElement.height - can2.canvasElement.offsetHeight) / 2;
    let y2pos = can1.canvasElement.height - (can2.canvasElement.height / 2);

    cancontext.beginPath()
    cancontext.moveTo(xpos-7.5,ypos-7.5)
    cancontext.lineWidth = 15;
    cancontext.lineTo(xpos-7.5,y2pos+7.5)
    cancontext.lineTo(xpos+can2.canvasElement.offsetWidth+7.5,y2pos+7.5)
    cancontext.lineTo(xpos+can2.canvasElement.offsetWidth+7.5, ypos-7.5)
    cancontext.lineTo(xpos-15, ypos-7.5)
    cancontext.strokeStyle = 'wheat'
    cancontext.stroke()
    requestAnimationFrame(runAnimations)
}
runAnimations()



window.addEventListener('resize', resizeWin)



