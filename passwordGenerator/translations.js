const translations = {
	en: {
			strengthTitle: "Password Strength",
			strengthDesc: "Mix symbols, numbers, and words for stronger passwords",
			securityTitle: "Security Tips",
			securityDesc: "Never share your password with anyone",
			lengthTitle: "Length Matters",
			lengthDesc: "Longer passwords are harder to crack",
			passwordLength: "Password Length:",
			includeWords: "Include Words (comma-separated):",
			numbers: "Numbers",
			symbols: "Symbols",
			letters: "Letters",
			generate: "Generate Password",
			copy: "Copy",
			footer: "Created with ❤️ for secure passwords"
	},
	de: {
			strengthTitle: "Passwortstärke",
			strengthDesc: "Mischen Sie Symbole, Zahlen und Wörter für stärkere Passwörter",
			securityTitle: "Sicherheitstipps",
			securityDesc: "Teilen Sie Ihr Passwort niemals mit anderen",
			lengthTitle: "Länge ist wichtig",
			lengthDesc: "Längere Passwörter sind schwieriger zu knacken",
			passwordLength: "Passwortlänge:",
			includeWords: "Wörter einschließen (durch Kommas getrennt):",
			numbers: "Zahlen",
			symbols: "Symbole",
			letters: "Buchstaben",
			generate: "Passwort generieren",
			copy: "Kopieren",
			footer: "Erstellt mit ❤️ für sichere Passwörter"
	},
	fr: {
			strengthTitle: "Force du mot de passe",
			strengthDesc: "Mélangez symboles, chiffres et mots pour des mots de passe plus forts",
			securityTitle: "Conseils de sécurité",
			securityDesc: "Ne partagez jamais votre mot de passe",
			lengthTitle: "La longueur compte",
			lengthDesc: "Les mots de passe plus longs sont plus difficiles à pirater",
			passwordLength: "Longueur du mot de passe:",
			includeWords: "Inclure des mots (séparés par des virgules):",
			numbers: "Chiffres",
			symbols: "Symboles",
			letters: "Lettres",
			generate: "Générer le mot de passe",
			copy: "Copier",
			footer: "Créé avec ❤️ pour des mots de passe sécurisés"
	},
	es: {
			strengthTitle: "Fortaleza de la contraseña",
			strengthDesc: "Mezcle símbolos, números y palabras para contraseñas más fuertes",
			securityTitle: "Consejos de seguridad",
			securityDesc: "Nunca comparta su contraseña",
			lengthTitle: "La longitud importa",
			lengthDesc: "Las contraseñas más largas son más difíciles de descifrar",
			passwordLength: "Longitud de la contraseña:",
			includeWords: "Incluir palabras (separadas por comas):",
			numbers: "Números",
			symbols: "Símbolos",
			letters: "Letras",
			generate: "Generar contraseña",
			copy: "Copiar",
			footer: "Creado con ❤️ para contraseñas seguras"
	},
	jp: {
			strengthTitle: "パスワードの強度",
			strengthDesc: "記号、数字、単語を組み合わせてより強力なパスワードを",
			securityTitle: "セキュリティのヒント",
			securityDesc: "パスワードは誰とも共有しないでください",
			lengthTitle: "長さが重要",
			lengthDesc: "長いパスワードは解読が困難です",
			passwordLength: "パスワードの長さ:",
			includeWords: "単語を含める（カンマ区切り）:",
			numbers: "数字",
			symbols: "記号",
			letters: "文字",
			generate: "パスワードを生成",
			copy: "コピー",
			footer: "安全なパスワードのために❤️で作成"
	}
};

let currentLanguage = 'en';

function changeLanguage(lang) {
	currentLanguage = lang;
	updateTranslations();
}

function updateTranslations() {
	const elements = document.querySelectorAll('[data-i18n]');
	elements.forEach(element => {
			const key = element.getAttribute('data-i18n');
			if (translations[currentLanguage][key]) {
					element.textContent = translations[currentLanguage][key];
			}
	});
}