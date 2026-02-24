export default class DownloadManager {
    constructor() {
        this.totalBytes = 0;
        this.downloadedDisplay = document.getElementById('downloaded-mb');
        this.tableBody = document.getElementById('file-list');

        // Крошечный фейковый PDF (весит около 460 байт), зашитый прямо в код
        const dummyPDF = 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAwALJMLY31jBQsTAz1LBSKUrnCtRTyuQIVDA0UzFVwGWkARXkH/gplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjQ0CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL1BhcmVudCA0IDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pj4+L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgo0IDAgb2JqCjw8L1R5cGUvUGFnZXMvQ291bnQgMS9LaWRzWzEgMCBSXT4+CmVuZG9iagoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKCjYgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSPj4KZW5kb2JqCgplbmRvYmoKCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDE2MSAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAxNDAgMDAwMDAgbiAKMDAwMDAwMDI2NiAwMDAwMCBuIAowMDAwMDAwMzIzIDAwMDAwIG4gCjAwMDAwMDA0MTEgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDcvUm9vdCA2IDAgUj4+CnN0YXJ0eHJlZgo0NjAKJSVFT0YK';

        this.files = [
            { name: 'JavaScript_for_Beginners.pdf', tableSize: '5.2 MB', data: dummyPDF },
            { name: 'React_in_Action.pdf', tableSize: '12.8 MB', data: dummyPDF },
            { name: 'Clean_Code_Overview.pdf', tableSize: '3.1 MB', data: dummyPDF }
        ];

        this.init();
    }

    init() {
        this.renderTable();
    }

    renderTable() {
        this.tableBody.innerHTML = '';
        this.files.forEach(file => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${file.name}</td>
        <td>${file.tableSize}</td>
        <td><a href="${file.data}" download="${file.name}" class="download-link">Скачать</a></td>
      `;

            const link = tr.querySelector('.download-link');

            // Слушаем клик по кнопке "Скачать"
            link.addEventListener('click', () => {
                // 1. Отрезаем "data:application/pdf;base64," чтобы получить чистый код файла
                const base64str = file.data.split(',')[1];

                // 2. Считаем РЕАЛЬНЫЙ вес скачанного файла в байтах (декодируем base64)
                const bytes = atob(base64str).length;

                // 3. Добавляем к общей сумме
                this.totalBytes += bytes;

                // 4. Переводим байты в Мегабайты (1 MB = 1024 * 1024 байт)
                const mb = this.totalBytes / (1024 * 1024);

                // Обновляем счетчик на экране (оставляем 5 знаков после запятой, т.к. файл крошечный)
                this.downloadedDisplay.textContent = mb.toFixed(5);
            });

            this.tableBody.appendChild(tr);
        });
    }
}