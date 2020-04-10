var 후보군 = Array(45)
    .fill() //배열을 같은요소로 채우기
    .map (function(요소, 인덱스){ //매핑?
    return 인덱스 + 1; //0부터 시작하기 때문에
});
console.log(후보군);

var 셔플 = [];
while (후보군.length > 0) {
    var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0]; //splice는 배열에서 숫자를 뽑는 것. 배열로 나오기 때문에 배열 인덱스를 뽑기 위해서 [0] 사용
    셔플.push(이동값);
}
console.log(셔플);

var 보너스 = 셔플[셔플.length -1];
var 당첨숫자들 = 셔플.slice(0,6);
console.log('당첨숫자들', 당첨숫자들.sort(function(p,c){return p-c;}), '보너스', 보너스);

var 결과창 = document.querySelector('#결과창');
    function 공색칠하기(숫자, 결과창) {
        var 공 = document.createElement('div');
        공.textContent = 숫자;
        공.style.display = 'inline-block';
        공.style.border = '2px solid black';
        공.style.borderRadius = '50%';
        공.style.width = '30px';
        공.style.height = '30px';
        공.style.textAlign = 'center';
        공.style.fontSize = '20px';
        공.style.marginRight = '10px';
        var 배경색;
        if(숫자 <= 10) {
            배경색 = '#ef5350'; //빨
        }else if(숫자 <= 20) { 
            배경색 = '#ffb74d'; //주
        }else if(숫자 <= 30) {
            배경색 = '#ffee58'; //노
        }else if(숫자 <= 40) {
            배경색 = '#03a9f4'; //파
        }else {
            배경색 = '#4caf50'; //초
        }
        공.style.background = 배경색;
        결과창.appendChild(공);
}
/*
    setTimeout(function 콜백함수() {
        공색칠하기(당첨숫자들[0], 결과창);
    },1000); //밀리초 1000밀리초 = 1초
    setTimeout(function 비동기콜백함수() {
        공색칠하기(당첨숫자들[1], 결과창);
    },2000);
    setTimeout(function 비동기콜백함수() {
        공색칠하기(당첨숫자들[2], 결과창);
    },3000);
    setTimeout(function 비동기콜백함수() {
        공색칠하기(당첨숫자들[3], 결과창);
    },4000);
    setTimeout(function 비동기콜백함수() {
        공색칠하기(당첨숫자들[4], 결과창);
    },5000);
    setTimeout(function 비동기콜백함수() {
        공색칠하기(당첨숫자들[5], 결과창);
    },6000);
    */

   for (var i = 0; i < 당첨숫자들.length; i++) {
	(function(j) {
		setTimeout(function 비동기콜백함수() {
			공색칠하기(당첨숫자들[j], 결과창);
		}, (j + 1) * 1000);
	})(i);
}

setTimeout(function 비동기콜백함수() {
	var 칸 = document.getElementsByClassName('보너스')[0];
	공색칠하기(보너스, 칸);
}, 7000);

//다른부분은 매개변수로 겹치는 부분은 함수로!