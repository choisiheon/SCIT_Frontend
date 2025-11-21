document.addEventListener("DOMContentLoaded", () => {
    initCharacterSelect();
});

/* -----------------------------------------
   1) 캐릭터 데이터
------------------------------------------*/
function initCharacterSelect() {
const characters = [
  {
    id: "Paladin",
    name: "성기사",
    code: "EPFA",
    desc: "#동기부여 #성장지원 #우유부단",
    bg: "./assets/img/char/Paladin_bg.png",
    img: "./assets/img/char/Paladin_portrait.png"   // ⬅ 누끼 PNG로 바꿔도 됨

  },
  {
    id: "Rogue / Thief",
    name: "도적",
    code: "EPRA",
    desc: "#자유로운발상 #에너자이저 #즉흥적 #산만함",
    bg: "./assets/img/char/rogue_bg.png",
    img: "./assets/img/char/rogue_por.png"
  },
  {
    id: "Warrior",
    name: "전사",
    code: "EPFC",
    desc: "#리더십 #추진력 #결과중심 #꼰대",
    bg: "./assets/img/char/Warrior_bg.png",
    img: "./assets/img/char/Warrior_portrait.png"
  },
  {
    id: "Ninja",
    name: "닌자",
    code: "EPRC",
    desc: "#창의적 #임기응변 #변덕 #쌈닭",
    bg: "./assets/img/char/Ninja_bg.png",
    img: "./assets/img/char/Ninja_portrait.png"
  },
  {
    id: "Hunter",
    name: "사냥꾼",
    code: "ESFA",
    desc: "#팀워크 #협력 #사기진작 #유리멘탈",
    bg: "./assets/img/char/Hunter_bg.png",
    img: "./assets/img/char/Hunter_portrait.png"
  },
  {
    id: "Dragoon",
    name: "창술사",
    code: "ESRA",
    desc: "#활력 #즐거움 #즉각적 #용두사미",
    bg: "./assets/img/char/Dragoon_bg.png",
    img: "./assets/img/char/Dragoon_portrait.png"
  },
  {
    id: "Sniper",
    name: "저격수",
    code: "ESFC",
    desc: "#효율적 #관리 #규율 #꼰대",
    bg: "./assets/img/char/Sniper_bg.png",
    img: "./assets/img/char/Sniper_portrait.png"
  },
  {
    id: "Monk",
    name: "격투가",
    code: "ESRC",
    desc: "#순발력 #현실적 #행동대장 #충동적",
    bg: "./assets/img/char/Monk_bg.png",
    img: "./assets/img/char/Monk_portrait.png"
  },
  {
    id: "Astrologian",
    name: "점성술사",
    code: "IPFA",
    desc: "#중재자 #심리파악 #신중함 #번아웃",
    bg: "./assets/img/char/Astrologian_bg.png",
    img: "./assets/img/char/Astrologian_portrait.png"
  },
  {
    id: "Healer",
    name: "힐러",
    code: "IPRA",
    desc: "#통찰력 #이상주의 #창의성 #유리멘탈",
    bg: "./assets/img/char/Healer_bg.png",
    img: "./assets/img/char/Healer_portrait.png"
  },
  {
    id: "Black Mage",
    name: "흑마법사",
    code: "IPFC",
    desc: "#전략가 #분석적 #비판적 #효율적",
    bg: "./assets/img/char/BlackMage_bg.png",
    img: "./assets/img/char/BlackMage_portrait.png"
  },
  {
    id: "Scholar",
    name: "학자",
    code: "IPRC",
    desc: "#논리적 #분석적 #실행력부족 #도파민중독",
    bg: "./assets/img/char/Scholar_bg.png",
    img: "./assets/img/char/Scholar_portrait.png"
  },
  {
    id: "Summoner",
    name: "소환사",
    code: "ISFA",
    desc: "#지원 #정리 #배려 #갈등회피",
    bg: "./assets/img/char/Summoner_bg.png",
    img: "./assets/img/char/Summoner_portrait.png"
  },
  {
    id: "Dancer",
    name: "무도가",
    code: "ISRA",
    desc: "#몰입 #미적감각 #분위기메이커 #우유부단",
    bg: "./assets/img/char/Dancer_bg.png",
    img: "./assets/img/char/Dancer_portrait.png"
  },
  {
    id: "Knight",
    name: "기사",
    code: "ISFC",
    desc: "#계획적 #책임감 #안정성 #고집불통",
    bg: "./assets/img/char/Knight_bg.png",
    img: "./assets/img/char/Knight_portrait.png"
  },
  {
    id: "Samurai",
    name: "사무라이",
    code: "ISRC",
    desc: "#실용적 #위기대처 #이기주의 #독선적",
    bg: "./assets/img/char/samurai_bg.png",
    img: "./assets/img/char/samurai_portrait.png"
  }
];

/* -----------------------------------------
   2) 캐릭터 리스트 생성
------------------------------------------*/
const listEl = document.getElementById("charList");

characters.forEach((ch, i) => {
  const btn = document.createElement("div");
  btn.className = "char-item" + (i === 0 ? " active" : "");
  btn.dataset.id = ch.id;

  const img = document.createElement("img");
  img.src = ch.img;
  img.alt = ch.name;

  btn.appendChild(img);

  btn.addEventListener("click", () => selectCharacter(ch.id));
  listEl.appendChild(btn);
});

/* -----------------------------------------
   3) 캐릭터 선택 시 UI 업데이트
------------------------------------------*/
function selectCharacter(charId) {
  const c = characters.find(x => x.id === charId);
  if (!c) return;

  // 텍스트 변경
  document.getElementById("charName").textContent = c.name;
  document.getElementById("charDesc").textContent = c.desc;

// 배경 = 캐릭터별 배경 + 그라데이션 오버레이
document.getElementById("visualBg").style.backgroundImage =
    `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0)),
     url(${c.bg})`;

  // active 테두리
  document.querySelectorAll(".char-item").forEach(el => {
    el.classList.toggle("active", el.dataset.id === charId);
  });

  // ⭐ "자세히 보기" 링크 동적으로 변경
  const btn = document.getElementById("btnDetail")
  btn.href = `pages/characterInfo.html?code=${c.code}`;
}

/* -----------------------------------------
   4) 기본 첫 캐릭터 선택
------------------------------------------*/
selectCharacter(characters[0].id);


//     251120

}
