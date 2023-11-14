var canvas = document.getElementById('canvas') /// <canvas class="canvas" id="canvas"></canvas>의 위치
var ctx = canvas.getContext('2d'); ///고정
canvas.width = 500;
canvas.height = 400; ///캔버스 크기


var pika = [];

var img_pika1 = new Image();  ///캐릭터 이미지
img_pika1.src = 'pika1.png';
pika.push(img_pika1);
var img_pika2 = new Image();
img_pika2.src = 'pika2.png';
pika.push(img_pika2);
var img_pika3 = new Image();
img_pika3.src = 'pika3.png';
pika.push(img_pika3);
var img_pika4 = new Image();
img_pika4.src = 'pika4.png';
pika.push(img_pika4);

var dino = {   ///우리 캐릭터
    x : 30,    ///위치
    y : 200,  
    width:20,  ///크기
    height:20,
    draw(frame){     ///그리기
        //ctx.fillStyle = 'red'
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(pika[frame%4], this.x, this.y);
    }
}
class Cactus{   ///붕어빵 틀
    constructor(){
        this.x = 400;
        this.y = 200;
        this.width = 20;
        this.height = 20;   ///만들게 될 붕어빵 속성
    }
    draw(){   ///붕어빵 만들기
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
var frame = 0;
var cactus_list = [];
var jump_timer=0;
var score = 0;
var ani = 0;
function play(){
    frame += 1;
    animation = requestAnimationFrame(play);   ///1초에 60번 반복
    ctx.clearRect(0,0, canvas.width, canvas.height)  

    if(frame%180 == 1){      ///3초마다 새로운 선인장 만들기
        var cactus = new Cactus();
        cactus_list.push(cactus);  /// 만든거 리스트에 넣기
    }

    cactus_list.forEach((a, i, o)=>{   ///리스트의 값들을 하나씩 선택
        if(a.x < 0){      ///선인장의 x좌표가 0보다 잡으면
            o.splice(i,1);   ///리스트에서 없앤다
        }
        a.x -= 1;
        a.draw();
        collision(dino, a)   ///ㅁ

    })
    if(jump==true){     ///점프
        dino.y -= 1.5;
        jump_timer += 1;
    }else{        ///떨어짐
        if(dino.y >= 200){  ///지면 밑x
            dino.y = 200;
            jump_timer = 0
        }else{
            dino.y += 1.5;
        }
    }


    if(jump_timer >= 60){
        jump = false
    }
    score+=1;
    ctx.fillStyle = 'black'
    ctx.fillText('Score : '+score, 400, 20);
    if(frame%10 == 0){
        ani +=1;
    }
    dino.draw(ani);  
}
play();

var jump = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jump = true;
    }
})
function collision(dino,cactus){
    var x_len =cactus.x - (dino.x + dino.width);
    var y_len = cactus.y - (dino.y+dino.height);

    if (x_len < 0 && y_len < 0 ){
        if (x_len + (cactus.width + dino.width) > 0)
            cancelAnimationFrame(animation);
    }
}