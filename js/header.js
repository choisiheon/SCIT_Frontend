(function () {


    // ---------------------------------------------------------
    // 2. HTML 구조 반환 (심플한 텍스트 버전)
    // ---------------------------------------------------------
    function getHTML() {
        return `
            <div class="site-header">
                <div class="header-inner">
                    <div class="simple-countdown" id="simpleCountdown">
                        <span style="color: gray; font-size: 0.8em"> 수료까지, </span>
                        <span class="time-unit"><strong id="cd-days">00</strong> 일</span>
                        <span class="time-unit"><strong id="cd-hours">00</strong> 시간</span>
                        <span class="time-unit"><strong id="cd-mins">00</strong> 분</span>
                        <span class="time-unit"><strong id="cd-secs">00</strong> 초</span>
                    </div>

<!--            언어 변경 미구현-->
<!--                    <div class="lang-wrap">-->
<!--                        <button class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false">-->
<!--                            <span class="globe">🌐</span>-->
<!--                            <span>한국어</span>-->
<!--                            <svg width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">-->
<!--                                <path d="M1 1L6 6L11 1" stroke="white" stroke-width="1.6" stroke-linecap="round"stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </button>-->
<!--            -->
<!--                        <div class="lang-dropdown" id="langDropdown" role="menu" aria-label="언어 선택">-->
<!--                            <button type="button" role="menuitem" data-lang="ko" id="lang-btn">한국어</button>-->
<!--                            <button type="button" role="menuitem" data-lang="jp" id="lang-btn">日本語</button>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>
        `;
    }

    // ---------------------------------------------------------
    // 3. CSS 스타일 반환
    // ---------------------------------------------------------
    function getCSS() {
        return `
            .lang-btn{ font-family: 'Heir of Light';}
            :root {
                --green: #057a4a;
                --text: #fff;
            }

            body {
                margin: 0;
                font-family: 'Heir of Light', sans-serif;
            }

            .site-header {
                border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* 검정 배경에 어울리는 연한 테두리 */
                padding: 16px 32px;
                background: #000;
            }

            .header-inner {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center; /* 화면 중앙 정렬 */
                gap: 40px; /* 카운트다운과 언어버튼 사이 간격 */
            }

            /* --- Simple Text Countdown CSS --- */
            .simple-countdown {
                display: flex;
                gap: 16px; /* 날짜 단위 사이 간격 */
                font-size: 21px;
                color: #fff; /* 단위 텍스트 색상 */
                align-items: baseline;
                font-weight: border;
                
            }

            .simple-countdown .time-unit {
                display: inline-flex;
                align-items: baseline;
                gap: 4px;
            }

            .simple-countdown strong {
                font-size: 22px; /* 숫자 크기 키움 */
                font-weight: 1000;
                color: var(--green); /* 숫자는 초록색 강조 */
                min-width: 28px; /* 숫자가 바뀌어도 덜덜거리지 않게 최소 너비 확보 */
                text-align: right;
            }
            /* --- End Simple Text Countdown --- */

            /* 우측 언어 버튼 */
            .lang-wrap {
                position: relative;
                flex-shrink: 0;
                
            }

            .lang-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: var(--green);
                color: #333;
                padding: 8px 14px;
                border-radius: 28px;
                border: none;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                
                color: #ffffff !important;
            }

            .lang-btn .globe { font-size: 16px }

            /* 드롭다운 */
            .lang-dropdown {
                position: absolute;
                right: 0;
                top: calc(100% + 8px);
                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.08);
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
                border-radius: 8px;
                min-width: 140px;
                display: none;
                padding: 8px 0;
                z-index: 20;
            }

            .lang-dropdown.show { display: block; }

            .lang-dropdown button {
                width: 100%;
                text-align: left;
                background: none;
                border: none;
                padding: 9px 16px;
                cursor: pointer;
                font-size: 14px;
            }

            .lang-dropdown button:hover { background: rgba(0, 0, 0, 0.02) }

            /* 반응형: 모바일에서는 폰트 크기 조금 줄임 */
            @media (max-width: 600px) {
                .header-inner {
                    flex-direction: column;
                    gap: 16px;
                }
                .simple-countdown {
                    font-size: 14px;
                }
                .simple-countdown strong {
                    font-size: 18px;
                }
            }
        `;
    }

    // ---------------------------------------------------------
    // 4. 카운트다운 로직
    // ---------------------------------------------------------
    function initCountdown() {
        const now = new Date();
        let targetYear = now.getFullYear();

        // 월은 0부터 시작 (3 = 4월)
        let targetDate = new Date(targetYear, 3, 30, 0, 0, 0);

        if (now > targetDate) {
            targetDate = new Date(targetYear + 1, 3, 30, 0, 0, 0);
        }

        // DOM 요소 미리 캐싱
        const elDays = document.getElementById('cd-days');
        const elHours = document.getElementById('cd-hours');
        const elMins = document.getElementById('cd-mins');
        const elSecs = document.getElementById('cd-secs');

        if (!elDays || !elHours || !elMins || !elSecs) return;

        const updateTime = () => {
            const current = new Date();
            const diff = targetDate - current;

            if (diff <= 0) return;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / 1000 / 60) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            // 텍스트 업데이트
            elDays.innerText = String(days).padStart(2, '0');
            elHours.innerText = String(hours).padStart(2, '0');
            elMins.innerText = String(mins).padStart(2, '0');
            elSecs.innerText = String(secs).padStart(2, '0');
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    // ---------------------------------------------------------
    // 5. 메인 렌더링 함수
    // ---------------------------------------------------------
    function renderHeader(targetSelector = 'body') {
        if (document.getElementById('site-header')) return;
        const host = document.querySelector(targetSelector) || document.body;
        const el = document.createElement('div');
        el.id = 'site-header';

        const style = document.createElement('style');
        style.textContent = getCSS();

        el.appendChild(style);
        el.insertAdjacentHTML('beforeend', getHTML());

        host.insertBefore(el, host.firstChild);

        // 카운트다운 시작
        initCountdown();

        const langBtn = el.querySelector('#langBtn');
        const langDropdown = el.querySelector('#langDropdown');

        langBtn.addEventListener('click', () => {
            const expanded = langBtn.getAttribute('aria-expanded') === 'true' || false;
            langBtn.setAttribute('aria-expanded', !expanded);
            langDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!el.contains(event.target)) {
                langDropdown.classList.remove('show');
                langBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    window.renderHeader = renderHeader;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => renderHeader());
    } else {
        renderHeader();
    }
//     251120

})();
