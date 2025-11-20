function changeRole(role) {
    const hero = document.getElementById("heroCharacter");
    const title = document.getElementById("roleTitle");
    const desc = document.getElementById("roleDescription");

    hero.style.opacity = "0";

    setTimeout(() => {
        if (role === "attack") {
            hero.src = "assets/img/hero/attack.png";
            title.textContent = "딜러";
            desc.textContent = "재빠른 기동력으로 전황을 바꾸고 팀에 기회를 여는 역할입니다.";
        }
        if (role === "tank") {
            hero.src = "assets/img/hero/Tanker.png";  // ⭐ 대문자 T 중요
            title.textContent = "탱커";
            desc.textContent = "팀을 향한 위협에 맞서며 전장을 통제하는 수호 기사입니다.";
        }
        if (role === "healer") {
            hero.src = "assets/img/hero/healer.png";
            title.textContent = "서포터";
            desc.textContent = "팀을 안전하게 이끌어가는 전략적 서포트 역할입니다.";
        }

        hero.style.opacity = "1";
    }, 200)
}
//     251120
