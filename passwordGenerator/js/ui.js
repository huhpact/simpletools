class UI {
  constructor() {
    this.passwordGenerator = new PasswordGenerator();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelector('.generate-btn').addEventListener('click', () => this.generatePassword());
    document.querySelector('.copy-btn').addEventListener('click', () => this.copyPassword());
    

    document.getElementById('passwordOutput').addEventListener('input', (e) => {
      this.updateStrengthMeter(e.target.value);
    });

 
    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        const settingCard = input.closest('.setting-card');
        if (settingCard) {
          settingCard.style.transform = 'scale(1.02)';
          setTimeout(() => {
            settingCard.style.transform = 'scale(1)';
          }, 200);
        }
      });
    });
  }

  generatePassword() {
    const options = {
      length: parseInt(document.getElementById('length').value),
      includeNumbers: document.getElementById('numbers').checked,
      includeSymbols: document.getElementById('symbols').checked,
      includeLetters: document.getElementById('letters').checked,
      words: document.getElementById('words').value
        .split(',')
        .map(word => word.trim())
        .filter(word => word)
    };
    
    if (!this.validateOptions(options)) return;
    
    const password = this.passwordGenerator.generate(options);
    this.showPassword(password);
    this.updateStrengthMeter(password);

   
    const resultContainer = document.querySelector('.password-result');
    resultContainer.style.transform = 'scale(1.02)';
    setTimeout(() => {
      resultContainer.style.transform = 'scale(1)';
    }, 200);
  }

  validateOptions(options) {
    if (!options.includeNumbers && !options.includeSymbols && 
        !options.includeLetters && options.words.length === 0) {
      this.showError('Please select at least one option or add words');
      return false;
    }
    return true;
  }

  showPassword(password) {
    const resultContainer = document.querySelector('.password-result');
    resultContainer.classList.add('visible');
    document.getElementById('passwordOutput').value = password;
  }

  updateStrengthMeter(password) {
    const { score, feedback } = this.passwordGenerator.calculateStrength(password);
    
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthLabel = document.querySelector('.strength-label');
    
    strengthMeter.style.width = `${score}%`;
    
    let strengthText = this.getStrengthText(score);
    let strengthColor = this.getStrengthColor(score);
    
    strengthMeter.style.background = strengthColor;
    strengthLabel.innerHTML = `
      <span>Strength: ${strengthText}</span>
      <span>${score}%</span>
    `;
  }

  getStrengthText(score) {
    if (score < 50) return 'Weak';
    if (score < 75) return 'Good';
    return 'Strong';
  }

  getStrengthColor(score) {
    if (score < 50) return 'var(--gradient-1)';
    if (score < 75) return 'linear-gradient(135deg, #ff9f0a 0%, #ffd60a 100%)';
    return 'linear-gradient(135deg, #30d158 0%, #30db5b 100%)';
  }

  copyPassword() {
    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.select();
    document.execCommand('copy');
    
    this.showCopyFeedback();
  }

  showCopyFeedback() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalContent = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyBtn.style.background = 'linear-gradient(135deg, #30d158 0%, #30db5b 100%)';
    
    setTimeout(() => {
      copyBtn.innerHTML = originalContent;
      copyBtn.style.background = '';
    }, 2000);
  }

  showError(message) {
    const toast = document.createElement('div');
    toast.className = 'toast error';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--gradient-1);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: var(--glow);
      animation: slideIn 0.3s ease-out;
    `;
    
    toast.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}