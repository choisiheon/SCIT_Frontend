(function(){
    const btn = document.getElementById('langBtn');
    const dropdown = document.getElementById('langDropdown');

    btn.addEventListener('click', e=>{
        const open = dropdown.classList.toggle('show');
        btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', e=>{
        if (!btn.contains(e.target) && !dropdown.contains(e.target)){
            dropdown.classList.remove('show');
            btn.setAttribute('aria-expanded','false');
        }
    });

    // 언어 선택 처리(예: 선택 시 페이지 로케일 변경 로직 연결)
    dropdown.addEventListener('click', e=>{
        const btnLang = e.target.closest('button[data-lang]');
        if(!btnLang) return;
        const lang = btnLang.dataset.lang;
        // 실제 로직: 쿠키/로컬스토리지 또는 서버 호출로 언어 변경 구현
        console.log('선택된 언어:', lang);
        // 버튼 텍스트 갱신
        btn.querySelector('span:nth-child(2)').textContent = btnLang.textContent;
        dropdown.classList.remove('show');
        btn.setAttribute('aria-expanded','false');
    });
})();