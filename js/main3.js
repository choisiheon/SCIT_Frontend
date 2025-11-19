function changeRole(role) {
    const hero = document.getElementById("heroCharacter");
    const title = document.getElementById("roleTitle");
    const desc = document.getElementById("roleDescription");

    hero.style.opacity = "0";

    setTimeout(() => {
        if (role === "attack") {
            hero.src = "assets/img/hero/attack.png";
            title.textContent = "딜러";
            desc.textContent = "빠른 공격으로 적을 제압하는 역할입니다.";
        }
        if (role === "tank") {
            hero.src = "assets/img/hero/Tanker.png";  // ⭐ 대문자 T 중요
            title.textContent = "탱커";
            desc.textContent = "아군을 보호하는 역할입니다.";
        }
        if (role === "healer") {
            hero.src = "assets/img/hero/healer.png";
            title.textContent = "서포터";
            desc.textContent = "아군을 회복시키는 지원형 역할입니다.";
        }

        hero.style.opacity = "1";
    }, 200)
}
