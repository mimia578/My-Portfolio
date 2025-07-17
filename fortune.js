//array, constant is used so that variable is not changed unlike let 
// null= clear value of variable, vairbale is usually undefined. eg let name; here name is undefined 
const fortunes = [
  "True wisdom comes not from knowledge, but from understanding.",
  "You will discover something delightful today.",
  "Great changes are coming—embrace them.",
  "An unexpected event will brighten your week.",
  "Happiness is closer than you think.",
  "A small gesture will bring great rewards.",
  "Keep going—success is just around the corner.",
  "Someone is silently cheering for you.",
  "Your creativity will inspire others.",
  "Be bold. Your courage will be rewarded."
];

// nested object, object literal, keys=style1,style2...., value= inside {  }
const stylePresets = {
  style1: {
    textColor: "#724622",
    bgColor: "#f9e7b3",
    borderColor: "#724622",
    fontFamily: "Georgia",
    fontSize: "1.5rem"
  },
  style2: {
    textColor: "#880e4f",
    bgColor: "#fce4ec",
    borderColor: "#ad1457",
    fontFamily: "Verdana",
    fontSize: "1.3rem"
  },
  style3: {
    textColor: "#2e7d32",
    bgColor: "#e8f5e9",
    borderColor: "#1b5e20",
    fontFamily: "'Courier New'",
    fontSize: "1.6rem"
  },
  style4: {
    textColor: "#4a148c",
    bgColor: "#ede7f6",
    borderColor: "#6a1b9a",
    fontFamily: "Tahoma",
    fontSize: "1.4rem"
  }
};

window.onload = function () {
  const fortuneText = document.getElementById("fortuneText");
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  fortuneText.textContent = fortunes[randomIndex];

  // Apply last saved style
  const savedStyle = localStorage.getItem("selectedStyle");
  if (savedStyle && stylePresets[savedStyle]) {
    applyStyle(savedStyle);
  }
};

// Apply and save selected style
function applyStyle(styleKey) {
  const style = stylePresets[styleKey];
  if (!style) return;

  const box = document.getElementById("fortuneBox");
  const text = document.getElementById("fortuneText");

  text.style.color = style.textColor;
  box.style.backgroundColor = style.bgColor;
  box.style.borderColor = style.borderColor;
  text.style.fontFamily = style.fontFamily;
  text.style.fontSize = style.fontSize;

  localStorage.setItem("selectedStyle", styleKey);
}
