var 가로 = 4;
var 세로 = 3;
var 색깔들 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink']
var 색깔후보 = 색깔들.slice(); // slice가 없으면 복사가 되기 때문
var 색깔 = [];
var 클릭플래그 = true; //클릭 방지하는 플래그변수
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;
//색깔 섞기
function 셔플() {
    for (var i = 0; 색깔후보.length > 0; i += 1) {
        색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length),1));
        //색깔후보 중에 하나씩 뽑은 걸 새로운 배열에 넣고 그걸 다시 색깔 배열에 넣기 (concat = 문자열 합치기)
    }
}
function 카드세팅(가로, 세로) {
    클릭플래그 = false; //false인 동안은 클릭x
    for (var i = 0; i < 가로 * 세로; i += 1) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = 색깔[i]; // 색깔을 섞은 색깔 배열에서 i에 해당하는 색 입히기
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(c) {
            card.addEventListener('click', function() {
                if(클릭플래그 && !완성카드.includes(c)) { //클릭플래그가 true고, 완성카드가 아닐 때 실행
                    c.classList.toggle('flipped'); //toggle은 flipped클래스를 표시하거나 숨기거나 (카드를 클릭시 토글 실행)
                    클릭카드.push(c);
                    if(클릭카드.length === 2) { //클릭한 두개의 색깔이 같은지 판단
                        if(클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor) {
                           
                            
                            // 클래스를 찾아 적용한 스타일을 찾아낼 수 있음 
                            완성카드.push(클릭카드[0]); //완성카드 배열에 클릭한 카드들을 넣기
                            완성카드.push(클릭카드[1]);
                            클릭카드 = []; // 담아놓은 배열요소 초기화
                            if (완성카드.length === 가로 * 세로) {
                                var 끝시간 = new Date();
                                alert('성공! 축하합니다!' + (끝시간 - 시작시간) / 1000 + '초 걸렸습니다.');
                                //초기화
                                document.querySelector('#wrapper').innerHTML = ''; // 초기화를 위해 내부 태그 다 지우기
                                색깔후보 = 색깔들.slice();
                                색깔 = [];
                                완성카드 = [];
                                시작시간 = null;
                                셔플();
                                카드세팅(가로, 세로);
                            }
                        } else { // 두 카드의 색이 다르면
                            클릭플래그 = false;
                            setTimeout(function() {
                                클릭카드[0].classList.remove('flipped');
                                클릭카드[1].classList.remove('flipped');
                                클릭플래그 = true;
                                클릭카드 = []; 
                            }, 1000); // 1초 뒤에 닫아버리기
                            
                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }
    document.querySelectorAll('.card').forEach(function(card ,index){ // foreach는 배열 반복문
        setTimeout(function() {
            card.classList.add('flipped'); //card에 flipped 클래스를 추가하고 
        }, 1000 + 100 * index); // index마다 다른 시간 부여하기
    });
    setTimeout(function() {
        document.querySelectorAll('.card').forEach(function(card ,index){
            card.classList.remove('flipped'); //flipped클래스 지우기
        });
        클릭플래그 = true;
        시작시간 = new Date();
    }, 5000); // 5초후에 실행
}
셔플();
카드세팅(가로, 세로);