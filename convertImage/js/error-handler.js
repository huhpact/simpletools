function showError(message) {
	const popup = document.getElementById('error-popup');
	const messageEl = document.getElementById('error-message');
	messageEl.textContent = message;
	popup.classList.add('show');
}

function closeError() {
	const popup = document.getElementById('error-popup');
	popup.classList.remove('show');
}