var tbody = document.querySelector('#table tbody'); // tbody를 함수밖으로 불러냄(나중에 사용)
var dataset = []; //dataset 빈 배열을 만든다 (나중에 사용)
var 중단플래그 = false; // 코드의 흐름을 제어하는 변수 = 플래그
var 열은칸 = 0; //몇 칸을 열었는지 기록하는 변수 선언
var 코드표 = {
    연칸: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,
};

document.querySelector('#exec').addEventListener('click', function(){
     // 실행버튼 클릭시 내부 초기화
    tbody.innerHTML = '';
    중단플래그 = false;
    document.querySelector('#result').textContent='';
    dataset = [];
    열은칸 = 0;
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);

    //지뢰 위치 뽑기
    var 후보군 = Array(hor * ver) // hor * ver 배열을 후보군에 넣기
        .fill() //배열값을 undifind로 채우기
        .map(function (요소, 인덱스){ // 요소와 인덱스를 맵핑하는 함수
            return 인덱스; //인덱스를 리턴해서 값을 받는다
        });
    var 셔플 = []; //셔플이란 빈 배열을 만들고
    while(후보군.length > hor * ver - mine){ //후보군 배열의 개수가 0보다 크면 반복문 실행
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
        //splice는 배열에서 숫자를 뽑는 것. 배열로 나오기 때문에 배열 인덱스를 뽑기 위해서 [0] 사용
        셔플.push(이동값); //셔플배열에 이동값을 넣는다. 때문에 셔플배열에 값이 하나씩 참
    }
console.log(셔플);

    // 지뢰 테이블 만들기

    for (var i = 0; i < ver; i += 1){ // i를 ver값 만큼 1씩 증가
        var arr = []; // arr 빈 배열을 만든다
        var tr = document.createElement('tr'); // 네모칸을 만들기 위해 tr객체를 만든다
        dataset.push(arr); // dataset 배열에 arr배열을 넣어 2차원 배열을 만든다 dataset[arr[]]
        for(var j = 0; j < hor; j += 1){ // j를 hor값 만큼 1씩 증가
            arr.push(코드표.보통칸); // arr배열에 0 넣고 for문 돌림 arr[0,0,0,0, ....]
            var td = document.createElement('td'); //네모칸을 만들기 위해 td를 만든다
            td.addEventListener('contextmenu', function(e){ //contextmenu는 오른쪽 클릭을 의미
                e.preventDefault(); //이벤트 값 초기화
                if (중단플래그) {
                    return; // 리턴으로 함수 실행을 끝낼 수 있음
                }
                var 부모tr = e.currentTarget.parentNode // 오른쪽 마우스로 클릭을 어디로 했는지 값 반환 후 그의 부모노드 찾기 = 부모tr
                var 부모tbody = e.currentTarget.parentNode.parentNode; //값 반환 후 그의 부모의 부모노드찾기 = tbody
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                // 배열이 아닌 유사배열에 배열의 메서드(indexOf)를 사용하기 위해 prototype 사용
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') { //만약 누른 곳이 빈칸이면
                    e.currentTarget.textContent = '!'; // 느낌표
                    e.currentTarget.classList.add('flag');
                    if (dataset[줄][칸] === 코드표.지뢰) {
                        dataset[줄][칸] = 코드표.깃발지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.깃발;
                    }
                } else if (e.currentTarget.textContent === '!'){ //누른곳이 느낌표면
                    e.currentTarget.textContent = '?'; // 물음표 
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if (dataset[줄][칸] === 코드표.깃발지뢰) {
                        dataset[줄][칸] = 코드표.물음표지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.물음표;
                    }
                } else if (e.currentTarget.textContent === '?'){ //누른곳이 물음표면 한번 더 검사하기
                    e.currentTarget.classList.remove('question');
                    if (dataset[줄][칸] === 코드표.물음표지뢰) { //데이터는 기본값이 1이면 (여기서 기본값은 빈칸)
                        e.currentTarget.textContent = 'X'; //X로 바꾸기
                        dataset[줄][칸] = 코드표.지뢰;
                    } else  { //데이터 값이 X면
                        e.currentTarget.textContent = ''; // 빈칸으로 바꾸기
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });
            td.addEventListener('click', function(e){ //그냥 클릭
                if (중단플래그) {
                    return; // 리턴으로 함수 실행을 끝낼 수 있음
                }
                var 부모tr = e.currentTarget.parentNode // 오른쪽 마우스로 클릭을 어디로 했는지 값 반환 후 그의 부모노드 찾기 = 부모tr
                var 부모tbody = e.currentTarget.parentNode.parentNode; //값 반환 후 그의 부모의 부모노드찾기 = tbody
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                if ([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸])) {
                    return;
                }
                //클릭했을 때 주변 지뢰 개수 보여주기
                e.currentTarget.classList.add('opened'); // classList를 써서 td태그에 접근 후 add / remove로 추가 삭제
                열은칸 += 1; // 클릭시 열은 칸 + 1
                if (dataset[줄][칸] === 코드표.지뢰) { //줄칸의 데이터가 x면(지뢰면)
                    e.currentTarget.textContent = '펑'; //펑 남기기
                    document.querySelector('#result').textContent='실패ㅠㅠ';
                    중단플래그 = true;
                } else { // 지뢰가 아니면 그 주변 8칸 배열 찾는 방법
                    var 주변 = [ // 먼저 양 옆 배열을 찾아 변수 '주변'에 넣기
                        dataset[줄][칸-1],dataset[줄][칸+1]
                    ];
                    if (dataset[줄-1]) {
                        주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
                        /*concat은 배열과 배열을 합쳐 ^새로운^ 배열을 만듦
                        -> '주변'배열과 위에 부분 배열을 합침*/
                    } if (dataset[줄+1]) {
                        주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
                        // 아래 부분 배열을 합침
                    }
                    var 주변지뢰개수 = 주변.filter(function(v){ //배열 요소가 X인 것을 필터링해서
                        return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v) //반환한 v가 x면
                    }).length; //그곳에 갯수 남기기
                    e.currentTarget.textContent = 주변지뢰개수 || ''; // 주변지뢰개수가 거짓인 값(0, null, undefined 등)이면 빈칸 남기기
                    dataset[줄][칸] = 코드표.연칸; // 열었을 때 값을 1로 바꿈
                    if (주변지뢰개수 === 0) { //주변 지뢰개수가 0이면 그 주변 8칸을 열어야함
                        //주변 8칸 동시 오픈
                        var 주변칸 = [];
                        if (tbody.children[줄-1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 - 1].children[칸 - 1],
                                tbody.children[줄 - 1].children[칸],
                                tbody.children[줄 - 1].children[칸 + 1],
                            ]);
                        }
                            주변칸 = 주변칸.concat([
                                tbody.children[줄].children[칸 - 1],
                                tbody.children[줄].children[칸 + 1],
                            ]);  
                        if (tbody.children[줄+1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 + 1].children[칸 - 1],
                                tbody.children[줄 + 1].children[칸],
                                tbody.children[줄 + 1].children[칸 + 1],
                            ]);
                        }
                        주변칸.filter(function(v){
                            return !!v; //undefined, null, 0등 빈 문자열 제거하는 코드(부정의 부정)
                        }).forEach(function(옆칸){
                            var 부모tr = 옆칸.parentNode
                            var 부모tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            if (dataset[옆칸줄][옆칸칸] !== 코드표.연칸){
                            옆칸.click(); //클릭시 또 위에 함수 실행(재귀함수)
                            }
                        });
                    }
                }
                if(열은칸 === hor * ver - mine) { //가로 세로 곱한 것에 지뢰 개수 뺀 것이 열은칸과 같다면 
                    중단플래그 = true; // 중단하고 
                    document.querySelector('#result').textContent='승리!'; //승리 텍스트 
                }
            });
            tr.appendChild(td); // 아까 만든 tr은 td를 자식으로 붙이기
        }
        tbody.appendChild(tr); // tr은 tbody의 자식 -> tbody-tr-td
    }
    // 지뢰 심기
    for(var k = 0; k < 셔플.length; k++){ // k를 셔플배열의 갯수만큼 돌린다 -> 만약 셔플[k]값이 60이라면
        var 세로 = Math.floor(셔플[k] / ver); // 60 / 10 = 6
        var 가로 = 셔플[k] % ver; // 60 % 10 = 0
        // 따라서 5번째 줄, 0번째 칸 (0부터 세기 때문에)
        console.dir(tbody);
        tbody.children[세로].children[가로].textContent = 'X'; // tbody의 자식은 tr, tr의 자식은 td에 x를 넣는다
        dataset[세로][가로] = 코드표.지뢰;
    } 
    console.log(dataset);
});
