var 스크린 = document.querySelector('#screen');
var 결과 = document.querySelector('h1');
스크린.append(결과);
var 시작시간;
var 끝시간; //호출스택으로 인해 전역변수로 써줌 (호출스택은 실행하면 날아감)
var 기록 = []; //끝시간 - 시작시간 기록을 배열에 담기 위해
var 타임아웃;

스크린.addEventListener('click', function() {
    if (스크린.classList.contains('waiting')) { //classList.contains로 현재 클래스 파악 가능
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        결과.textContent = '초록색이 되면 클릭하세요.';
        타임아웃 = setTimeout(function() {
            시작시간 = new Date(); //시각이 저장됨
            스크린.click();
        }, Math.floor(Math.random() * 1000) + 2000); //2000 ~ 3000 사이 수
    } else if (스크린.classList.contains('ready')) {
        if(!시작시간) { //시작시간이 없으면 부정 클릭 (!는 true -> fasle, false -> true)
            clearTimeout(타임아웃); //settimeout 취소
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
            결과.textContent = '너무 성급하시군요!';
        } else {
            스크린.classList.remove('ready');
            스크린.classList.add('now');
            결과.textContent = '클릭하세요!';
        }
        
    } else if (스크린.classList.contains('now')) {
        끝시간 = new Date();
        기록.push(끝시간 - 시작시간);
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        결과.innerHTML = 끝시간 - 시작시간 + 'ms' + '<br/><em>다시하려면 클릭하세요.</em>';
        시작시간 = null; //게임이 끝나면 초기화
        끝시간 = null;
    }
});