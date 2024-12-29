const translations = {
	en: {
			title: "Optixio",
			subtitle: "Transform your images instantly",
			features: {
					speed: {
							title: "Lightning Fast",
							desc: "Convert in milliseconds"
					},
					privacy: {
							title: "100% Private",
							desc: "Browser-only conversion"
					},
					quality: {
							title: "High Quality",
							desc: "Lossless conversion"
					}
			},
			drop: {
					title: "Drop your image here",
					subtitle: "or click to select",
					formats: "Supports PNG, JPG, WEBP, GIF, PDF, SVG, ICO"
			},
			convert: "Convert",
			error: {
					title: "Error"
			},
			footer: "Made with ♥ by Optixio"
	},
	de: {
			title: "Optixio",
			subtitle: "Transformiere deine Bilder sofort",
			features: {
					speed: {
							title: "Blitzschnell",
							desc: "Konvertierung in Millisekunden"
					},
					privacy: {
							title: "100% Privat",
							desc: "Nur im Browser"
					},
					quality: {
							title: "Hohe Qualität",
							desc: "Verlustfreie Konvertierung"
					}
			},
			drop: {
					title: "Bild hier ablegen",
					subtitle: "oder klicken zum Auswählen",
					formats: "Unterstützt PNG, JPG, WEBP, GIF, PDF, SVG, ICO"
			},
			convert: "Konvertieren",
			error: {
					title: "Fehler"
			},
			footer: "Mit ♥ erstellt von Optixio"
	},
	fr: {
			title: "Optixio",
			subtitle: "Transformez vos images instantanément",
			features: {
					speed: {
							title: "Ultra Rapide",
							desc: "Conversion en millisecondes"
					},
					privacy: {
							title: "100% Privé",
							desc: "Conversion dans le navigateur"
					},
					quality: {
							title: "Haute Qualité",
							desc: "Conversion sans perte"
					}
			},
			drop: {
					title: "Déposez votre image ici",
					subtitle: "ou cliquez pour sélectionner",
					formats: "Supporte PNG, JPG, WEBP, GIF, PDF, SVG, ICO"
			},
			convert: "Convertir",
			error: {
					title: "Erreur"
			},
			footer: "Fait avec ♥ par Optixio"
	},
	ja: {
			title: "Optixio",
			subtitle: "画像を瞬時に変換",
			features: {
					speed: {
							title: "超高速",
							desc: "ミリ秒単位の変換"
					},
					privacy: {
							title: "100%プライバシー",
							desc: "ブラウザ内で変換"
					},
					quality: {
							title: "高品質",
							desc: "ロスレス変換"
					}
			},
			drop: {
					title: "ここに画像をドロップ",
					subtitle: "またはクリックして選択",
					formats: "PNG、JPG、WEBP、GIF、PDF、SVG、ICOに対応"
			},
			convert: "変換",
			error: {
					title: "エラー"
			},
			footer: "Optixioが♥を込めて制作"
	},
	es: {
			title: "Optixio",
			subtitle: "Transforma tus imágenes al instante",
			features: {
					speed: {
							title: "Ultra Rápido",
							desc: "Conversión en milisegundos"
					},
					privacy: {
							title: "100% Privado",
							desc: "Conversión en el navegador"
					},
					quality: {
							title: "Alta Calidad",
							desc: "Conversión sin pérdidas"
					}
			},
			drop: {
					title: "Suelta tu imagen aquí",
					subtitle: "o haz clic para seleccionar",
					formats: "Soporta PNG, JPG, WEBP, GIF, PDF, SVG, ICO"
			},
			convert: "Convertir",
			error: {
					title: "Error"
			},
			footer: "Hecho con ♥ por Optixio"
	}
};

function getTranslation(key, lang) {
	return key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]) || key;
}

function setLanguage(lang) {
	if (!translations[lang]) {
			console.warn(`Language ${lang} not found, falling back to English`);
			lang = 'en';
	}

	document.documentElement.lang = lang;
	
	const elements = document.querySelectorAll('[data-i18n]');
	elements.forEach(element => {
			const key = element.getAttribute('data-i18n');
			const translation = getTranslation(key, lang);
			if (translation) {
					element.textContent = translation;
			}
	});
}

function initLanguage() {
	const browserLang = navigator.language.split('-')[0];
	const defaultLang = translations[browserLang] ? browserLang : 'en';
	
	const languageSelect = document.getElementById('language-select');
	languageSelect.value = defaultLang;
	setLanguage(defaultLang);

	languageSelect.addEventListener('change', (e) => {
			setLanguage(e.target.value);
	});
}