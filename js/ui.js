export function cekLevel(level){
    if(level > 1 && dataSoal[level - 1].status){
        return true;
    }
    return false;
}

export function unlockLevel(dataSoal, tombolLevel){
    tombolLevel.forEach(cek => {
        const level = cek.dataset.level;
        const status = dataSoal[level - 1].status;
        if(status === false){
            cek.classList.add("locked");
            cek.disabled = true;
        }else{
            cek.classList.remove("locked");
            cek.disabled = false;
        }
    });
}



