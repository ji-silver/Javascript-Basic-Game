var 테이블 = document.getElementById('table');
var 데이터 = [];
var 점수표 = document.getElementById('score');

function 초기화() { //4*4 배열 만들기
    var fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
        var 열데이터 = [];
        데이터.push(열데이터); //열데이터 배열을 데이터배열에 넣기
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function () {
            열데이터.push(0); //열데이터에 0넣기
            var td = document.createElement('td');
            tr.appendChild(td); //tr안에 td 넣기
        });
        fragment.appendChild(tr);
    });
    테이블.appendChild(fragment);
}
function 랜덤생성() {
    var 빈칸배열 = [];
    데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
            if (!행데이터) { //행데이터가 아니면
                빈칸배열.push([i, j]); //빈칸배열에 [i,j] 넣기
            }
        });
    });
    if (빈칸배열.length === 0) {
        alert('게임오버: ' + 점수표.textContent);
        테이블.innerHTML = '';
        초기화();
    } else {
        var 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
        // 0 ~ 15까지의 배열을 랜덤으로 뽑아 랜덤칸에 넣기
        // ex) 빈칸배열에서 15를 뽑았으면 [3,3]을 랜덤칸에 넣기
        데이터[랜덤칸[0]][랜덤칸[1]] = 2;
        //데이터배열의 인덱스가 [0][1]인 칸에 2넣기
        //ex) 랜덤칸[3,3] = 랜덤칸[0] = 3, 랜덤칸[1] = 3
        그리기();
    }
}

function 그리기() {
    데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
            if (행데이터 > 0) { //0보다 큰 숫자만 화면에 표시
                테이블.children[i].children[j].textContent = 행데이터; //몇행 몇열인지 찾고 td에 행데이터 값 넣기
            } else {
                테이블.children[i].children[j].textContent = ''; //0이면 빈칸
            }
        });
    });
}

초기화();
랜덤생성();
그리기();

var 드래그시작 = false;
var 드래그중 = false;
var 시작좌표;
var 끝좌표;
window.addEventListener('mousedown', function (이벤트) { //마우스 누를 때 
    드래그시작 = true;
    시작좌표 = [이벤트.clientX, 이벤트.clientY];
});
window.addEventListener('mousemove', function (이벤트) { //마우스 움직일 때
    if (드래그시작) {
        드래그중 = true;
    }
});
window.addEventListener('mouseup', function (이벤트) { // 마우스 뗄 때
    끝좌표 = [이벤트.clientX, 이벤트.clientY];
    if (드래그중) { //true일 때 실행
        var 방향;
        var x차이 = 끝좌표[0] - 시작좌표[0];
        // 끝좌표, 시작좌표 배열안엔 [x.y]가 있기 때문에 x값을 얻기 위해 인덱스[0]을 넣기
        // x차이가 +가 나오면 오른쪽, -가 나오면 왼쪽으로 드래그
        var y차이 = 끝좌표[1] - 시작좌표[1];
        // 끝좌표, 시작좌표 배열안엔 [x.y]가 있기 때문에 y값을 얻기 위해 인덱스[0]을 넣기
        // y차이가 -가 나오면 위, +가 나오면 아래
        if (x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
            //x차이가 -이거나 위아래로 드래그를 안 했을 때(위아래로 드래그시 y차이가 더 크기 때문에 결과는 -)
            방향 = '왼쪽';
        } else if (x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1) { //x차이가 +이거나 위아래로 드래그를 안 했을 때
            방향 = '오른쪽';
        } else if (y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
            방향 = '아래';
        } else if (y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
            방향 = '위';
        }
        console.log(x차이, y차이, 방향);
    }
    드래그시작 = false;
    드래그중 = false;

    switch (방향) {
        //맞는 방향만 실행
        case '왼쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ]; //새데이터 안에 4개의 빈배열 넣기
            데이터.forEach(function (열데이터, i) {
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) { //행데이터는 내 데이터
                        if (새데이터[i][새데이터[i].length - 1] && 새데이터[i][새데이터[i].length - 1] === 행데이터) {
                            //내 전에 있는 데이터랑 내 데이터랑 같으면 실행
                            새데이터[i][새데이터[i].length - 1] *= 2; // 데이터 * 2
                            var 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[i][새데이터[i].length - 1];
                        } else {
                            새데이터[i].push(행데이터); //그게 아니면 그냥 뒤에 붙이기
                        }
                    }
                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (열데이터, i) {
                [1, 2, 3, 4].forEach(function (행데이터, j) {
                    데이터[i][j] = 새데이터[i][j] || 0;
                });
            });
            break;
        case '오른쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function (열데이터, i) {
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) { 
                        if (새데이터[i][0] && 새데이터[i][0] === 행데이터) {
                            새데이터[i][0] *= 2;
                            var 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[i][0];
                        } else {
                            새데이터[i].unshift(행데이터);
                        }
                    }
                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (열데이터, i) {
                [1, 2, 3, 4].forEach(function (행데이터, j) {
                    데이터[i][3 - j] = 새데이터[i][j] || 0;
                });
            });
            break;
        case '위':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ]; 
            데이터.forEach(function (열데이터, i) {
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) { 
                        if (새데이터[j][새데이터[j].length - 1] && 새데이터[j][새데이터[j].length - 1] === 행데이터) {
                            새데이터[j][새데이터[j].length - 1] *= 2;
                            var 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1];
                        } else {
                            새데이터[j].push(행데이터);
                        }
                    }
                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (열데이터, i) {
                [1, 2, 3, 4].forEach(function (행데이터, j) {
                    데이터[j][i] = 새데이터[i][j] || 0;
                });
            });
            break;
        case '아래':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function (열데이터, i) {
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) {
                        if (행데이터) { 
                            if (새데이터[j][0] && 새데이터[j][0] === 행데이터) {
                                새데이터[j][0] *= 2;
                                var 현점수 = parseInt(점수표.textContent, 10);
                                점수표.textContent = 현점수 + 새데이터[j][0];
                            } else {
                                새데이터[j].unshift(행데이터);
                            }
                        }
                    }
                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (열데이터, i) {
                [1, 2, 3, 4].forEach(function (행데이터, j) {
                    데이터[3 - j][i] = 새데이터[i][j] || 0;
                });
            });
            break;

    }
    그리기();
    랜덤생성();
});