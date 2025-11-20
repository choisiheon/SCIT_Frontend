(function () {
    function getFooterCSS() {
        return `
            .site-footer {
                background-color: #000; /* 검정 배경 */
                color: #fff;            /* 흰색 글씨 */
                padding: 25px 0 25px 0;        /* 위아래 여백을 줄여서 슬림하게 (헤더의 절반 정도) */
                font-size: 12px;        /* 글씨 크기도 작게 */
                text-align: center;
                font-family: "Pretendard", "Malgun Gothic", sans-serif;
                border-top: 1px solid rgba(255, 255, 255, 0.1); /* 아주 연한 위쪽 테두리 */
            }

            .footer-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 4px; /* 요소 간 간격 */
            }

            /* 제작자 텍스트 */
            .footer-label {
                font-weight: 400;
                color: #ccc; /* '제작자 :' 부분은 살짝 연하게 */
                margin-right: 6px;
            }

            /* 링크 스타일 */
            .footer-link {
                color: #fff;
                text-decoration: none;
                cursor: pointer;
                transition: color 0.2s;
            }

            .footer-link:hover {
                color: #057a4a; /* 마우스 올리면 헤더와 같은 초록색으로 포인트 */
                font-weight: bold;
                text-decoration: underline;
            }

            /* 구분선(|) 스타일 */
            .footer-sep {
                color: #555; /* 구분선은 눈에 덜 띄게 */
                margin: 0 6px;
                font-size: 10px;
            }
        `;
    }

    function getFooterHTML() {
        // 이동할 페이지 주소를 href="#" 부분에 채워주세요
        return `
            <footer class="site-footer">
                <div class="footer-content">
                    <span class="footer-label">제작자 : </span>
                    
                    <a href="./pages/characterInfo.html?code=ESFA" class="footer-link">김혜진</a>
                    <span class="footer-sep">|</span>
                    
                    <a href="./pages/characterInfo.html?code=ESRA" class="footer-link">이하늘</a>
                    <span class="footer-sep">|</span>
                    
                    <a href="./pages/characterInfo.html?code=IPCR" class="footer-link">조유정</a>
                    <span class="footer-sep">|</span>
                    
                    <a href="./pages/characterInfo.html?code=ISRA" class="footer-link">최시헌</a>
                    <span class="footer-sep">|</span>
                </div>
            </footer>
        `;
    }

    function renderFooter() {
        if (document.getElementById('site-footer-style')) return;

        const style = document.createElement('style');
        style.id = 'site-footer-style';
        style.textContent = getFooterCSS();
        document.head.appendChild(style);

        // body의 맨 끝에 추가
        document.body.insertAdjacentHTML('beforeend', getFooterHTML());
    }

    // 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderFooter);
    } else {
        renderFooter();
    }
})();