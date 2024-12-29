let selectedFormat = null;

function setupConverter() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const convertButton = document.getElementById('convert-button');

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        handleFile(e.dataTransfer.files[0]);
    });

    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    convertButton.addEventListener('click', () => {
        if (selectedFormat) {
            convertImage();
        }
    });
}

function handleFile(file) {
    if (!file) {
        showError('Please select a file');
        return;
    }

    if (!file.type.startsWith('image/')) {
        showError('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('preview-img').src = e.target.result;
        document.getElementById('image-info').innerHTML = 
            `Original format: ${file.type.split('/')[1].toUpperCase()}<br>` +
            `Size: ${formatFileSize(file.size)}`;
        document.getElementById('preview-container').hidden = false;
        updateFormatOptions(file);
    };
    reader.onerror = () => {
        showError('Error reading file');
    };
    reader.readAsDataURL(file);
}

function updateFormatOptions(file) {
    const formatGrid = document.getElementById('format-grid');
    formatGrid.innerHTML = '';
    
    getCompatibleFormats(file).forEach(format => {
        const option = document.createElement('div');
        option.className = 'format-option';
        option.textContent = format.toUpperCase();
        option.addEventListener('click', () => selectFormat(format, option));
        formatGrid.appendChild(option);
    });
}

function selectFormat(format, element) {
    document.querySelectorAll('.format-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedFormat = format;
    document.getElementById('convert-button').disabled = false;
}

function convertImage() {
    const img = document.getElementById('preview-img');
    
    try {
        if (selectedFormat === 'pdf') {
            convertToPdf(img);
        } else {
            convertToImage(img);
        }
    } catch (error) {
        showError('Error converting image: ' + error.message);
    }
}

function convertToPdf(img) {
    const { jsPDF } = window.jspdf;
    
    try {
        const pdf = new jsPDF({
            orientation: img.naturalWidth > img.naturalHeight ? 'l' : 'p',
            unit: 'px',
            format: [img.naturalWidth, img.naturalHeight]
        });

        pdf.addImage(
            img.src,
            'JPEG',
            0,
            0,
            img.naturalWidth,
            img.naturalHeight
        );
        
        pdf.save('converted.pdf');
    } catch (error) {
        showError('Error creating PDF: ' + error.message);
    }
}

function convertToImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    
    canvas.toBlob((blob) => {
        if (!blob) {
            showError('Error converting image');
            return;
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `optixio-converted.${selectedFormat}`;
        link.click();
        URL.revokeObjectURL(url);
    }, `image/${selectedFormat}`);
}