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

    // Interaksi untuk area soal (saat kartu diletakkan)
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!zone.classList.contains('correct')) {
                zone.classList.add('hovered');
            }
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hovered');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('hovered');

            if (zone.classList.contains('correct')) return;

            const draggedId = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(draggedId);

            if (onDropCallback && draggedElement) {
                onDropCallback(draggedElement, zone);
            }
        });
    });
}