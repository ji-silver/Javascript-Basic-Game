var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

var 비동기콜백 = function(이벤트){
    console.log(이벤트.target);
    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode); // 줄들의 부모 타겟(테이블)을 몇줄에 대입
    console.log('몇줄', 몇줄);
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target); // 칸들 배열 중 몇줄의 타겟을 몇칸에 대입
    console.log('몇칸', 몇칸);

    if (칸들[몇줄][몇칸].textContent !== '') { //만약 칸들배열의 몇줄 몇칸 안에 있는 텍스트가 빈칸이면
        console.log('빈칸 아닙니다'); 
    }else {
        console.log('빈칸입니다.');
        칸들[몇줄][몇칸].textContent = 턴; //칸들배열의 몇줄 몇칸 안에 있는 텍스트를 턴(x)으로 바꾼다

        //세칸 다 채워졌나?
    var 다참 = false;
    //가로줄 검사
    if (
        칸들[몇줄][0].textContent === 턴 && 
        칸들[몇줄][1].textContent === 턴 &&
        칸들[몇줄][2].textContent === 턴
    ) {
        다참 = true;
    }
    //세로줄 검사
    if (
        칸들[0][몇칸].textContent === 턴 &&
        칸들[1][몇칸].textContent === 턴 &&
        칸들[2][몇칸].textContent === 턴
    ) {
        다참 = true;
    }
    //대각선 검사
    if (몇줄 - 몇칸 === 0) {
        if (
            칸들[0][0].textContent === 턴 &&
            칸들[1][1].textContent === 턴 &&
            칸들[2][2].textContent === 턴
        ) {
            다참 = true;
        }
    }
    if (Math.abs(몇줄 + 몇칸) === 2) {
        if (
            칸들[0][2].textContent === 턴 &&
            칸들[1][1].textContent === 턴 &&
            칸들[2][0].textContent === 턴
        ) {
            다참 = true;
        }
    }
    //다 찼으면
    if (다참) {
        결과.textContent = 턴 + '님이 승리!'
        턴 = 'X';
        칸들.forEach(function (줄) {
            줄.forEach(function (칸){
                칸.textContent = '';
            });
        });
    } else { //다 안 찼으면
        if(턴 === 'X'){ //만약 턴이 x라면
            턴 = 'O'; //턴 바꾸기
        }else{
            턴 = 'X';
        }
    }  
    }
};
for (var i = 1; i <= 3; i  += 1){
    var 줄 = document.createElement('tr'); // i가 1씩 증가할 때 마다 줄이 생김
    줄들.push(줄); // 줄들 배열에 줄을 차례대로 채워넣기
    칸들.push([]); // 칸들 배열에 2차원배열? 생성
    for (var j = 1; j <= 3; j += 1){ //j가 1씩 증가할 때 마다 (j가 다 돌아가면 i로 다시)
        var 칸 = document.createElement('td'); //칸 생성
        칸.addEventListener('click', 비동기콜백); //칸 클릭시 비동기콜백 함수 실행
        칸들[i-1].push(칸); // (컴퓨터는 0부터) 칸들 배열에 칸을 차례대로 채워넣기
        줄.appendChild(칸); // 줄의 자식을 칸으로 생성 
    }
    테이블.appendChild(줄); //테이블의 자식을 줄로 생성
}
바디.appendChild(테이블); // 바디의 자식을 테이블로 생성 --> 바디->테이블->줄->칸
바디.appendChild(결과);
console.log('줄들', 줄들, '칸들', 칸들);