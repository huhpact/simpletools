function formatFileSize(bytes) {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getCompatibleFormats(file) {
	const format = file.type.split('/')[1].toLowerCase();
	const allFormats = ['png', 'jpg', 'webp', 'gif', 'pdf', 'svg', 'ico'];
	

	if (format === 'svg+xml') return ['png', 'jpg', 'webp', 'pdf'];
	if (format === 'gif') return ['png', 'jpg', 'webp'];
	
	return allFormats.filter(f => f !== format);
}