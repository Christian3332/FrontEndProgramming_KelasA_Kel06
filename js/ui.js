const overlay = document.querySelector(".overlay");
const popupMenang = document.querySelector(".popup-menang");
const popupKalah = document.querySelector(".popup-kalah")

export function cekLevel(level){
    if(level > 1 && dataSoal[level - 1].status){
        return true;
    }
    return false;
}

export function unlockLevel(dataSoal, tombolLevel){
  tombolLevel.forEach(cek => {
    const levelIndex = parseInt(cek.dataset.level, 10) - 1;
    const status = dataSoal[levelIndex].status;

    if (!status) {
      cek.classList.add("locked");
      cek.disabled = true;
    } else {
      cek.classList.remove("locked");
      cek.disabled = false;
    }
  });
}


export function tampilScreenAwal() {
  const gameScreen = document.getElementById("game-screen");
  const startScreen = document.getElementById("level-select-screen");

  gameScreen.style.display = "none";
  startScreen.style.display = "block";
}

export function tampilPopup(popup) {
    overlay.classList.add("active");
    popup.classList.add("show");
}

export function tutupPopup() {
    overlay.classList.remove("active");
    popupMenang.classList.remove("show");
    popupKalah.classList.remove("show");
}




