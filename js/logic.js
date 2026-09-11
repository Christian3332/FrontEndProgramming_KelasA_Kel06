export function nyawa(hati) {
  const hatis = document.querySelectorAll(".life-icon");
  const pegang = document.getElementById("lives-display");

  if (hati === 0) {
    pegang.style.display = "none";
  }

  hatis.forEach((icon, index) => {
    if (index < hati) {
      icon.style.display = "inline";
    } else {
      icon.style.display = "none";
    }
  });
}

export function score(skors){
    skors = skors + 100;
    return skors;
}