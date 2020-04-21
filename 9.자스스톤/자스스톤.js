var 상대 = {
    영웅: document.getElementById('rival-hero'),
    덱: document.getElementById('rival-deck'),
    필드: document.getElementById('rival-cards'),
    코스트:document.getElementById('rival-cost'),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드 : null,
    선택카드data : null,
};
var 나 = { 
    영웅: document.getElementById('my-hero'),
    덱: document.getElementById('my-deck'),
    필드: document.getElementById('my-cards'),
    코스트: document.getElementById('my-cost'),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드 : null,
    선택카드data : null,
};

var 턴 = true; //true면 내 턴, false면 상대턴
var 턴버튼 = document.getElementById('turn-btn');

function 덱에서필드로(데이터, 내턴) {
    var 객체 = 내턴 ? 나 : 상대; //조건 ? 참 : 거짓
    //?는 참, :은 거짓 => 내턴일 때 참이면 나, 거짓이면 상대
    var 현재코스트 = Number(객체.코스트.textContent); //현재 써져있는 텍스트는 문자이기 때문에 숫자로 바꿔줌
    if(현재코스트 < 데이터.cost) { //현재코스트보다 크면 이 함수가 종료가 되기 때문에 
        return 'end'; //end를 리턴
    }
    var idx = 객체.덱data.indexOf(데이터); //덱data가 몇번째인지
    객체.덱data.splice(idx, 1); 
    객체.필드data.push(데이터); //필드data에 그 데이터 넣기
    필드다시그리기(객체);
    덱다시그리기(객체);
    데이터.field = true;
    객체.코스트.textContent = 현재코스트 - 데이터.cost; //뽑은 코스트 숫자를 현재코스트에서 뺀다
}
function 필드다시그리기(객체) {
    객체.필드.innerHTML = '';
    객체.필드data.forEach(function(data) {
        카드돔연결(data, 객체.필드);
    });
}
function 덱다시그리기(객체) {
    객체.덱.innerHTML = '';
    객체.덱data.forEach(function(data) {
        카드돔연결(data, 객체.덱);
    });
}
function 영웅다시그리기(객체) {
    객체.영웅.innerHTML = '';
    카드돔연결(객체.영웅data, 객체.영웅, true);
}
function 화면다시그리기(내화면) {
    var 객체 = 내화면 ? 나 : 상대;
    필드다시그리기(객체);
    덱다시그리기(객체);
    영웅다시그리기(객체);
}
function 턴액션수행(카드, 데이터, 내턴) {
    var 아군 = 내턴 ? 나 : 상대;
    var 적군 = 내턴 ? 상대 : 나;
    if (카드.classList.contains('card-turnover')) {
        return;
    }
    //적군카드면서 아군카드가 선택되어 있고 그게 턴이 끝난 카드가 아니라면
    var 적군카드 = 내턴 ? !데이터.mine : 데이터.mine;
    if (적군카드 && 아군.선택카드) { 
        데이터.hp = 데이터.hp - 아군.선택카드data.att; //상대방 카드의 체력에서 내가 선택한 카드의 공격력을 빼기
        if (데이터.hp <= 0) { //상대방 체력이 0보다 낮아지면 (카드가 죽으면)
            var 인덱스 = 적군.필드data.indexOf(데이터); //데이터가 몇번째 인덱스에 있는지 찾기
            if (인덱스 > -1) { //쫄병이 죽었을 때
                적군.필드data.splice(인덱스, 1); //splice는 중간에 있는 걸 뺄 수 있음
            } else { // 영웅이 죽었을 때
                alert('승리하셨습니다!');
                초기세팅();
              }
        }
        화면다시그리기(!내턴);
        // 공격이 끝나면 내가 선택한 카드 해제
        아군.선택카드.classList.remove('card-selected');
        아군.선택카드.classList.add('card-turnover');
        아군.선택카드 = null;
        아군.선택카드data = null;
        return;
    } else if(적군카드) { // 적군카드를 눌렀을 때
        return; // 종료
    }
    if (데이터.field) { //데이터가 필드에 있으면
        //  영웅 부모와 필드카드의 부모가 다르기때문에 document에서 모든 .card를 검색한다
        // 카드.parentNode.querySelectorAll('.card').forEach(function (card) {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('card-selected');
        });
        카드.classList.add('card-selected'); //내가 선택한 카드에만 클래스 추가
        아군.선택카드 = 카드; //내가 뭘 선택했는지 변수에 저장
        아군.선택카드data = 데이터;
    } else { //덱이 있으면
        if (덱에서필드로(데이터, 내턴) !== 'end') {
            내턴 ? 내덱생성(1) : 상대덱생성(1); //뽑고 나서 1장씩 더 생성 (계속 5장이 만들어져야함)
        }
    }
}
function 카드돔연결(데이터, 돔, 영웅) {
    var 카드 = document.querySelector('.card-hidden .card').cloneNode(true);
    //cloneNode는 기존 태그 그대로 복사, true까지 넣으면 내부태그까지 복사
    카드.querySelector('.card-cost').textContent = 데이터.cost;
    카드.querySelector('.card-att').textContent = 데이터.att;
    카드.querySelector('.card-hp').textContent = 데이터.hp;
    if (영웅) {
        카드.querySelector('.card-cost').style.display = 'none'; // 영웅은 코스트 x
        var 이름 = document.createElement('div');
        이름.textContent = '영웅';
        카드.appendChild(이름);
    }
    카드.addEventListener('click', function(card) { //클릭시
        턴액션수행(카드, 데이터, 턴);
    });
    돔.appendChild(카드);
}
function 상대덱생성(개수) {
    for (var i = 0; i < 개수; i++){ //카드를 5개까지 늘리기
        상대.덱data.push(카드공장());
    }
    덱다시그리기(상대);
}
function 내덱생성(개수) {
    for (var i = 0; i < 개수; i++){
        나.덱data.push(카드공장(false, true)); //영웅은 아니지만, 내 카드
    }
    덱다시그리기(나);
}
function 내영웅생성() {
    나.영웅data = 카드공장(true, true); //영웅이고, 내카드
    카드돔연결(나.영웅data, 나.영웅, true);
}
function 상대영웅생성() {
    상대.영웅data = 카드공장(true);
    카드돔연결(상대.영웅data, 상대.영웅, true);
}
function Card(영웅, 내카드) {
    if(영웅) {
        this.att = Math.ceil(Math.random() * 2); //공격 1~2
        this.hp = Math.ceil(Math.random() * 5) + 25; // 체력 1~5까지 숫자에 25를 더함 (최대 30까지 나옴)
        this.hero = true;
        this.field = true;
    } else { //영웅이 아니면
        //ceil = 소수점 이하 올림. 1~5까지 숫자 랜덤
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        // att와 hp를 더한 숫자에서 2로 나누고 정수화
        this.cost = Math.floor((this.att + this.hp) / 2); 
    }
    if(내카드) {
        this.mine = true;
    }
}
function 카드공장(영웅, 내카드) {
    return new Card(영웅, 내카드);
}
function 초기세팅() {  
    [상대, 나].forEach(function (item) {
        item.덱data = [];
        item.영웅data = [];
        item.필드data = [];
        item.선택카드 = [];
        item.선택카드data = [];
      });
    상대덱생성(5);
    내덱생성(5);
    내영웅생성();
    상대영웅생성();
    화면다시그리기(true); //상대화면
    화면다시그리기(false); //내화면
}
턴버튼.addEventListener('click', function() {
    var 객체 = 턴 ? 나 : 상대;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    필드다시그리기(객체);
    영웅다시그리기(객체);
    턴 = !턴; // 턴이 true(내 턴)이면 false로, false(상대턴)이면 true로
    if(턴) { // 자기 턴이 돌아올 때 코스트를 10으로 다시 채우기
        나.코스트.textContent = 10;
    } else {
        상대.코스트.textContent = 10;
    }
});
초기세팅();