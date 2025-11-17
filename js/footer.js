(function () {
    function getHTML() {
        return `
              <div class="wrap">
                <div class="top">
                  <div class="col">
                    <div class="title">문의하기</div>
                    <ul class="list">
                      <li class="item">
                        <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <span>LINE</span>
                      </li>
                      <li class="item">
                        <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.5v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        <span>@LoveType16</span>
                      </li>
                      <li class="item">
                        <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
                        <span>@LoveType16</span>
                      </li>
                    </ul>
                  </div>
                  <div class="col" style="flex:2;"></div>
                </div>
        
                <div class="sep"></div>
        
                <div class="bottom">
                  <a href="/privacy">개인정보처리방침</a>
                </div>
              </div>
            `;
    }

    function getCSS() {
        return `
              #site-footer { display:block; background:#eef9f6; color:#2f4b4a; font-family: Arial, Helvetica, sans-serif; }
              #site-footer .wrap { max-width:1100px; margin:0 auto; padding:48px 24px; }
              #site-footer .top { display:flex; gap:40px; align-items:flex-start; }
              #site-footer .col { flex:1; min-width:220px; }
              #site-footer .title { font-weight:700; font-size:20px; margin-bottom:18px; }
              #site-footer .list { list-style:none; padding:0; margin:0; }
              #site-footer .item { display:flex; gap:12px; align-items:center; padding:10px 0; color:#2f4b4a; font-size:16px; }
              #site-footer .icon { width:20px; height:20px; fill:none; stroke:#2f4b4a; stroke-width:1.6; }
              #site-footer .sep { height:1px; background:rgba(0,0,0,0.06); margin:28px 0; }
              #site-footer .bottom { text-align:center; padding-bottom:24px; color:#2f4b4a; }
              #site-footer a { color:inherit; text-decoration:none; }
            `;
    }

    function renderFooter(targetSelector = 'body') {
        if (document.getElementById('site-footer')) return; // 중복 방지
        const host = document.querySelector(targetSelector) || document.body;
        const el = document.createElement('div');
        el.id = 'site-footer';

        const style = document.createElement('style');
        style.textContent = getCSS();

        el.appendChild(style);
        el.insertAdjacentHTML('beforeend', getHTML());

        host.appendChild(el);
    }

    // 전역으로 노출 (수동 호출 가능)
    window.renderFooter = renderFooter;

    // 자동 삽입: DOM 준비되면 body 끝에 추가
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => renderFooter());
    } else {
        renderFooter();
    }
})();