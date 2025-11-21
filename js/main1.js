// window.open() 대신 현재 창에서 이동하도록 수정
function pgTest() {
    // ./pages/test_jp.html 경로로 현재 창에서 이동합니다.
    window.location.href = "./pages/test_jp.html";
}

function pgChar1() {
    // ./pages/character1.html 경로로 현재 창에서 이동합니다.
    window.location.href = "./pages/character1.html";
}


// main1 시작
document.addEventListener('DOMContentLoaded', () => {
    // '스캔 승인 [Y]' 버튼에 연결된 pgTest() 함수는
    // HTML의 onclick='pgTest()'를 통해 실행되므로,
    // 해당 함수는 이 스크립트 파일 또는 다른 전역 스크립트 파일에 정의해야 합니다.

    // 이 파일은 현재 비어있지만, 추후 다른 동적인 기능이 필요할 때 사용하시면 됩니다.
});
//     251120

// main1용 끝