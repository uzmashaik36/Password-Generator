const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const generateBtn = document.getElementById("generateBtn");
const strengthText = document.getElementById("strength");

const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+~{}[]<>?/|";

function generatePassword() {
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  let length = lengthSlider.value;
  let charPool = "";
  let password = "";

  if (includeUpper) charPool += upperSet;
  if (includeLower) charPool += lowerSet;
  if (includeNumbers) charPool += numberSet;
  if (includeSymbols) charPool += symbolSet;

  if (charPool.length === 0) {
    alert("Select at least one option!");
    return;
  }

  for (let i = 0; i < length; i++) {
    password += charPool[Math.floor(Math.random() * charPool.length)];
  }

  passwordField.value = password;
  updateStrength(password);
}

// Update strength indicator
function updateStrength(password) {
  let strength = "Weak";

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSym = /[!@#$%^&*]/.test(password);

  let score = hasUpper + hasLower + hasNum + hasSym;

  if (score === 4 && password.length >= 12) strength = "Strong";
  else if (score >= 3) strength = "Medium";
  else strength = "Weak";

  strengthText.textContent = `Strength: ${strength}`;
}

// Update length display
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Copy password
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordField.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});

// Generate button
generateBtn.addEventListener("click", generatePassword);

// Generate on load
generatePassword();
