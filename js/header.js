(function () {
    function getLinkElement(href, rel = "stylesheet") {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        return link;
    }

    function getHTML() {
        return `
            <div class="site-header">
                <div class="header-inner">
                    <a class="logo" href="#">LoveType16</a>
            
                    <nav class="nav" aria-label="주요">
                        <a href="#">연애 진단 테스트</a>
                        <a href="#">Love Type 16에 대해</a>
                        <a href="#">이념</a>
                        <a href="#">캐릭터 소개</a>
                        <a href="#">문의하기</a>
                    </nav>
            
                    <div class="lang-wrap">
                        <button class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false">
                            <span class="globe">🌐</span>
                            <span>한국어</span>
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M1 1L6 6L11 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
            
                        <div class="lang-dropdown" id="langDropdown" role="menu" aria-label="언어 선택">
                            <button type="button" role="menuitem" data-lang="ko">한국어</button>
                            <button type="button" role="menuitem" data-lang="en">English</button>
                            <button type="button" role="menuitem" data-lang="jp">日本語</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function getCSS() {
        return `
            :root {
                --green: #057a4a;
                --text: #111;
            }

            body {
                margin: 0;
                font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
            }

            .site-header {
                border-bottom: 1px solid rgba(0, 0, 0, 0.04);
                padding: 18px 32px;
            }

            .header-inner {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 24px;
            }

            /* 로고 */
            .logo {
                font-family: 'Great Vibes', cursive;
                font-size: 34px;
                color: var(--text);
                text-decoration: none;
            }

            /* 네비 메뉴: 가운데 영역처럼 보이도록 여유주기 */
            .nav {
                display: flex;
                align-items: center;
                gap: 28px;
                margin-left: auto; /* 로고 뒤로 밀어냄 */
                margin-right: 24px;
            }

            .nav a {
                color: var(--text);
                text-decoration: none;
                font-weight: 500;
                white-space: nowrap;
            }

            /* 우측 언어 버튼 */
            .lang-wrap {
                position: relative;
            }

            .lang-btn {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                background: var(--green);
                color: #fff;
                padding: 8px 14px;
                border-radius: 28px;
                border: none;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
            }

            .lang-btn .globe {
                font-size: 16px
            }

            /* 드롭다운 */
            .lang-dropdown {
                position: absolute;
                right: 0;
                top: calc(100% + 8px);
                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.08);
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
                border-radius: 8px;
                min-width: 160px;
                display: none;
                padding: 8px 0;
                z-index: 20;
            }

            .lang-dropdown.show {
                display: block;
            }

            .lang-dropdown button {
                width: 100%;
                text-align: left;
                background: none;
                border: none;
                padding: 9px 16px;
                cursor: pointer;
                font-size: 14px;
            }

            .lang-dropdown button:hover {
                background: rgba(0, 0, 0, 0.02)
            }

            /* 반응형: 좁아지면 메뉴 숨김, 필요시 햄버거로 대체 가능 */
            @media (max-width: 780px) {
                .nav {
                    display: none
                }
            }
        `;
    }

    function renderHeader(targetSelector = 'body') {
        if (document.getElementById('site-header')) return; // 중복 방지
        const host = document.querySelector(targetSelector) || document.body;
        const el = document.createElement('div');
        el.id = 'site-header';

        // Inject font stylesheet
        const fontLink = getLinkElement('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        document.head.appendChild(fontLink);

        const style = document.createElement('style');
        style.textContent = getCSS();

        el.appendChild(style);
        el.insertAdjacentHTML('beforeend', getHTML());

        host.insertBefore(el, host.firstChild);

        // 언어 선택 드롭다운 토글
        const langBtn = el.querySelector('#langBtn');
        const langDropdown = el.querySelector('#langDropdown');

        langBtn.addEventListener('click', () => {
            const expanded = langBtn.getAttribute('aria-expanded') === 'true' || false;
            langBtn.setAttribute('aria-expanded', !expanded);
            langDropdown.classList.toggle('show');
        });

        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener('click', (event) => {
            if (!el.contains(event.target)) {
                langDropdown.classList.remove('show');
                langBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 전역으로 노출 (수동 호출 가능)
    window.renderHeader = renderHeader;

    // 자동 삽입: DOM 준비되면 body 시작 부분에 추가
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => renderHeader());
    } else {
        renderHeader();
    }
})();