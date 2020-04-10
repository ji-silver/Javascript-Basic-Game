var 이미지좌표 = '0';
var 가위바위보 = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};
console.log(Object.entries(가위바위보)); //객체를 베열모양으로 바꿔줌
function 컴퓨터의선택(이미지좌표) {
    return Object.entries(가위바위보).find(function(y) { //배열.find는 반복문이지만 원하는 것을 찾고 멈춤(return이 true면) 
        return y[1]/*가위바위보 배열에서 좌표(px)가 1에 들어있기 때문에*/ === 이미지좌표;
    })[0]; //2차원 배열의 첫번째를 갖고오기
}

var 인터벌;
function 인터벌메이커() {
    clearInterval(인터벌);
    인터벌 = setInterval(function () { //0.1초 마다 계속 실행 settimeout=> 0.1초만 실행
        if (이미지좌표 === 가위바위보.바위) {
            이미지좌표 = 가위바위보.가위;
        } else if (이미지좌표 === 가위바위보.가위) {
            이미지좌표 = 가위바위보.보;
        } else {
            이미지좌표 = 가위바위보.바위;
        }
        document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + 이미지좌표 +' 0';
    }, 100);
}

인터벌메이커();

var 점수표 = {
    가위: 1,
    바위: 0,
    보: -1,
};

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        clearInterval(인터벌); //클릭 이벤트 실행시 인터벌이 멈춤
        setTimeout(function() {
            인터벌메이커();
        },1000);
        var 나의선택 = this.textContent;
        var 나의점수 = 점수표[나의선택];
        var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
        var 점수차 = 나의점수 - 컴퓨터점수;
        
        if (점수차 === 0) {
            console.log('비겼습니다.');
        } else if ([-1, 2].includes(점수차)) {
            // ||<- 또는 관계일 때 includes를 사용해 배열로 줄일 수 있음
            console.log('이겼습니다!');
        } else {
            console.log('졌습니다ㅜ');
        }
    });
});