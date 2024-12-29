
function animateCounter(element, endValue) {
	const duration = 1000; 
	const steps = 30; 
	const stepValue = endValue / steps;
	let currentStep = 0;
	
	const timer = setInterval(() => {
			currentStep++;
			const currentValue = Math.min(stepValue * currentStep, endValue);
			element.textContent = Math.floor(currentValue).toLocaleString();
			
			if (currentStep >= steps) {
					clearInterval(timer);
					element.textContent = endValue.toLocaleString();
			}
	}, duration / steps);
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					if (entry.target.classList.contains('stat-number')) {
							const target = parseInt(entry.target.dataset.target);
							animateCounter(entry.target, target);
							observer.unobserve(entry.target);
					}
			}
	});
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
	observer.observe(stat);
});

let currentLang = 'en';

function setLanguage(lang) {
	currentLang = lang;
	document.documentElement.lang = lang;
	document.querySelector('.current-lang').textContent = lang.toUpperCase();
	updateTranslations();
	localStorage.setItem('preferred-language', lang);
}

function updateTranslations() {
	document.querySelectorAll('[data-translate]').forEach(element => {
			const keys = element.dataset.translate.split('.');
			let value = translations[currentLang];
			for (const key of keys) {
					value = value[key];
			}
			if (value) {
					element.textContent = value;
			}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const savedLang = localStorage.getItem('preferred-language');
	const browserLang = navigator.language.split('-')[0];
	const initialLang = savedLang || (translations[browserLang] ? browserLang : 'en');
	
	setLanguage(initialLang);

	document.querySelectorAll('.lang-option').forEach(option => {
			option.addEventListener('click', () => {
					setLanguage(option.dataset.lang);
			});
	});
});