class PasswordGenerator {
  constructor() {
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    this.letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  generate(options) {
    const { length, includeNumbers, includeSymbols, includeLetters, words } = options;
    
    let chars = '';
    if (includeNumbers) chars += this.numbers;
    if (includeSymbols) chars += this.symbols;
    if (includeLetters) chars += this.letters;
    
    let password = '';
    

    if (words.length > 0) {
      const word = words[Math.floor(Math.random() * words.length)];
      password = word; 
    }
    

    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      password += randomChar;
    }
    
    return password;
  }

  calculateStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 12) {
      strength += 25;
      feedback.push('Good length');
    } else if (password.length >= 8) {
      strength += 15;
      feedback.push('Decent length');
    } else {
      feedback.push('Too short');
    }
    

    if (/[0-9]/.test(password)) {
      strength += 25;
      feedback.push('Has numbers');
    }
    if (/[a-z]/.test(password)) {
      strength += 25;
      feedback.push('Has lowercase');
    }
    if (/[A-Z]/.test(password)) {
      strength += 25;
      feedback.push('Has uppercase');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 25;
      feedback.push('Has symbols');
    }
    
    return {
      score: Math.min(100, strength),
      feedback
    };
  }
}