// 문서가 완전히 로드된 후에 실행되도록 설정 (안전장치)
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ 자바스크립트 파일(test2.js)이 정상적으로 로드되었습니다!");

    // ++====== 설정 값 ======++
    const TOTAL_PAGES = 4; // 총 페이지 수
    const QUESTIONS_PER_PAGE = 4; // 페이지당 문항 수
    const TOTAL_QUESTIONS = TOTAL_PAGES * QUESTIONS_PER_PAGE; // 총 문항 수 (16)

    // 사용자의 응답을 저장할 객체
    const quizData = {};

    // ====== HTML 요소 선택 ======
    const pages = document.querySelectorAll('.quiz-page');
    const nextButton = document.querySelector('.btn-next');
    const progressFill = document.querySelector('.progress-fill');
    // 모든 라디오 버튼 선택
    const allRadios = document.querySelectorAll('input[type="radio"]');

    // ====== 상태 변수 ======
    let currentPageIndex = 0; // 현재 페이지 (0 ~ 3)

    // ---------------------------------------------------------
    // [함수 1] 진행률 바 업데이트 및 데이터 수집
    // ---------------------------------------------------------
    function updateProgressAndCollectData() {
        // 1. 체크된 문항 개수 세기
        const checkedRadioNames = new Set();

        allRadios.forEach(radio => {
            if (radio.checked) {
                checkedRadioNames.add(radio.name); // 예: 'q0', 'q1' ...
                quizData[radio.name] = radio.value; // 데이터 저장 (예: q0 = 'E')
            }
        });

        const answeredCount = checkedRadioNames.size;

        // 2. 진행률 계산 (%)
        const progress = (answeredCount / TOTAL_QUESTIONS) * 100;

        // 3. 화면 업데이트
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        // ⭐ 여기를 수정합니다! (퍼센트만 표시) ⭐
        const progressPercentSpan = document.querySelector('.progress-percent');
        if (progressPercentSpan) {
            progressPercentSpan.textContent = `${Math.round(progress)}%`;
        }

        // 4. '다음' 버튼 활성화/비활성화 체크
        const isCurrentPageComplete = checkCurrentPageAnswers(currentPageIndex);
        if (nextButton) {
            nextButton.disabled = !isCurrentPageComplete;
        }
    }

    // ---------------------------------------------------------
    // [함수 2] 현재 페이지의 모든 문항에 답했는지 확인
    // ---------------------------------------------------------
    function checkCurrentPageAnswers(pageIndex) {
        if (!pages[pageIndex]) return false;

        // 현재 페이지 안의 모든 질문 카드 찾기
        const currentQuestions = pages[pageIndex].querySelectorAll('.question-card');
        let answeredCountInPage = 0;

        currentQuestions.forEach(card => {
            // 카드 안에 체크된 라디오 버튼이 있는지 확인
            if (card.querySelector('input[type="radio"]:checked')) {
                answeredCountInPage++;
            }
        });

        // 질문 개수(4개)와 답변 개수가 같으면 true
        return answeredCountInPage === QUESTIONS_PER_PAGE;
    }

    // ---------------------------------------------------------
    // [함수 3] 최종 결과 계산 및 페이지 이동
    // ---------------------------------------------------------
    function calculateResult() {
        let E = 0, P = 0, R = 0, C = 0;

        // quizData에 저장된 값('E', 'I', 'P'...)을 카운트
        for (let key in quizData) {
            const val = quizData[key];
            if (val === 'E') E++;
            if (val === 'P') P++;
            if (val === 'R') R++;
            if (val === 'C') C++;
        }

        // 4문항 중 3개 이상이면 해당 성향, 아니면 반대 성향
        // (동점일 경우의 로직은 여기서 3개 미만은 반대 성향으로 처리됨)
        const resultType =
            (E >= 3 ? 'E' : 'I') +
            (P >= 3 ? 'P' : 'S') +
            (R >= 3 ? 'R' : 'F') +
            (C >= 3 ? 'C' : 'A');

        console.log("최종 결과:", resultType);
//        // 나중에 없앨거
//        alert(`축하합니다! 당신은 ${resultType} 유형입니다!!`);

        // 결과 페이지로 이동
        // 주의: results 폴더 안에 해당 HTML 파일(예: EPRA.html)이 있어야 합니다.
        window.location.href = `characterInfo.html?code=${resultType}`;
    }

    // ---------------------------------------------------------
    // [이벤트 1] '다음 페이지' 버튼 클릭 시
    // ---------------------------------------------------------
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            // 한번 더 확인 (강제 클릭 방지)
            if (!checkCurrentPageAnswers(currentPageIndex)) {
                alert('모든 문항에 체크해주세요!');
                return;
            }

            // 마지막 페이지가 아니라면 -> 다음 페이지로 이동
            if (currentPageIndex < TOTAL_PAGES - 1) {
                // 현재 페이지 숨김
                pages[currentPageIndex].style.display = 'none';
                // 인덱스 증가
                currentPageIndex++;
                // 다음 페이지 표시
                pages[currentPageIndex].style.display = 'block';

                // 만약 마지막 페이지에 도달했다면 버튼 글씨 변경
                if (currentPageIndex === TOTAL_PAGES - 1) {
                    nextButton.textContent = '결과 확인하기 📜';
                }

                // 페이지가 바뀌었으니 진행률 바 텍스트 등 업데이트
                updateProgressAndCollectData();
                // 상단으로 스크롤 이동 (선택 사항)
                window.scrollTo(0, 0);
            }
            // 마지막 페이지라면 -> 결과 계산
            else {
                calculateResult();
            }
        });
    }

    // ---------------------------------------------------------
    // [이벤트 2] 라디오 버튼 변경 감지
    // ---------------------------------------------------------
    allRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateProgressAndCollectData();
        });
    });

    // ---------------------------------------------------------
    // [초기화] 시작 시 첫 페이지만 보이기
    // ---------------------------------------------------------
    pages.forEach((page, index) => {
        if (index === 0) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    });

    // 초기 상태 업데이트
    updateProgressAndCollectData();
});