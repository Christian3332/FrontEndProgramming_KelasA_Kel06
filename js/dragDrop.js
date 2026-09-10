export function initDragAndDrop(onDropCallback) {
    // Mengambil elemen DOM
    const draggables = document.querySelectorAll('.draggable-item');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Interaksi pada kartu jawaban (saat ditarik)
    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            item.classList.add('dragging'); 
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });