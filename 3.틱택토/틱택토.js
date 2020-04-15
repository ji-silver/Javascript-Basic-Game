var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

function 결과체크(몇줄, 몇칸) {
    //세칸 다 채워졌나?
    var 승리여부 = false;
    //가로줄 검사
    if (
        칸들[몇줄][0].textContent === 턴 &&
        칸들[몇줄][1].textContent === 턴 &&
        칸들[몇줄][2].textContent === 턴
    ) {
        승리여부 = true;
    }
    //세로줄 검사
    if (
        칸들[0][몇칸].textContent === 턴 &&
        칸들[1][몇칸].textContent === 턴 &&
        칸들[2][몇칸].textContent === 턴
    ) {
        승리여부 = true;
    }
    //대각선 검사
    if (
        칸들[0][0].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][2].textContent === 턴
    ) {
        승리여부 = true;
    }
    if (
        칸들[0][2].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][0].textContent === 턴
    ) {
        승리여부 = true;
    }
    return 승리여부;
}
function 초기화(무승부) {
    if (무승부) {
        결과.textContent = '무승부';
    } else { 
        결과.textContent = 턴 + '님이 승리!';
    }
    setTimeout(function() {
        결과.textContent = '';
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                칸.textContent = '';
            });
        });
        턴 = 'X';
    }, 1000);
}

var 비동기콜백 = function (이벤트) { //칸 클릭시
    if (턴 === 'O') { // 컴퓨터의 턴일 때 내가 클릭하지 않도록
        return;
    } 
    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode); // 줄들의 부모 타겟(테이블)을 몇줄에 대입
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target); // 칸들 배열 중 몇줄의 타겟을 몇칸에 대입
    

    if (칸들[몇줄][몇칸].textContent !== '') { //만약 칸들배열의 몇줄 몇칸 안에 있는 텍스트가 빈칸이 아니면
        console.log('빈칸 아닙니다');
    } else { //빈칸이면
        console.log('빈칸입니다.');
        칸들[몇줄][몇칸].textContent = 턴; //칸들배열의 몇줄 몇칸 안에 있는 텍스트를 턴(x)으로 바꾼다
        var 승리여부 = 결과체크(몇줄, 몇칸);
        //모든 칸이 다 찼는지 검사
        var 후보칸 = [];
                칸들.forEach(function (줄) {
                  줄.forEach(function (칸) {
                        후보칸.push(칸);
                    });
                });
                후보칸 = 후보칸.filter(function (칸) { return !칸.textContent }); //textcontent가 false값이 아닌 true면 걸러내기
        if (승리여부) {
           초기화(false);
        } else if (후보칸.length === 0) {//칸을 더 이상 선택할 수 없음
            초기화(true);
        } else { //다 안 찼으면   
            if (턴 === 'X') { //만약 턴이 x라면
                턴 = 'O'; //턴 바꾸기
            }
            setTimeout(function () {
                console.log('컴퓨터의 턴입니다.');
                //빈 칸 중 하나를 고른다
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                선택칸.textContent = 턴;
                //컴퓨터가 승리했는지 체크
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 승리여부 = 결과체크(몇줄, 몇칸);
                //다 찼으면
                if (승리여부) {
                    초기화();
                }
                턴 = 'X'; //턴을 나한테 넘긴다.
            }, 1000);
        }
    }
};
for (var i = 1; i <= 3; i += 1) { //tr,td를 3*3으로 만드는 과정
    var 줄 = document.createElement('tr'); // i가 1씩 증가할 때 마다 줄이 생김
    줄들.push(줄); // 줄들 배열에 줄을 차례대로 채워넣기
    칸들.push([]); // 칸들 배열에 2차원배열? 생성
    for (var j = 1; j <= 3; j += 1) { //j가 1씩 증가할 때 마다 (j가 다 돌아가면 i로 다시)
        var 칸 = document.createElement('td'); //칸 생성
        칸.addEventListener('click', 비동기콜백); //칸 클릭시 비동기콜백 함수 실행
        칸들[i - 1].push(칸); // (컴퓨터는 0부터) 칸들 배열에 칸을 차례대로 채워넣기
        줄.appendChild(칸); // 줄의 자식을 칸으로 생성 
    }
    테이블.appendChild(줄); //테이블의 자식을 줄로 생성
}
바디.appendChild(테이블); // 바디의 자식을 테이블로 생성 --> 바디->테이블->줄->칸
바디.appendChild(결과);
console.log('줄들', 줄들, '칸들', 칸들);