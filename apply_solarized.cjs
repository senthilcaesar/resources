const fs = require('fs');

function globalReplace(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    if (filepath.includes('main.jsx')) {
        content = content.replace("bg: props.colorMode === 'dark' ? '#0f172a' : '#f3eadc',", "bg: props.colorMode === 'dark' ? '#002b36' : '#f3eadc',");
        content = content.replace("color: props.colorMode === 'dark' ? '#f1f5f9' : '#2e2218',", "color: props.colorMode === 'dark' ? '#839496' : '#2e2218',");
    }

    // Solarized replacements for dark mode strings created in the earlier plain theme conversion
    content = content.replace(/colorMode === 'dark' \? 'rgba\(255,255,255,0\.05\)'/g, "colorMode === 'dark' ? '#073642'");
    content = content.replace(/colorMode === 'dark' \? 'rgba\(255,255,255,0\.22\)'/g, "colorMode === 'dark' ? '#586e75'");
    content = content.replace(/colorMode === 'dark' \? '#e2e8f0'/g, "colorMode === 'dark' ? '#2aa198'");
    content = content.replace(/colorMode === 'dark' \? '#f1f5f9'/g, "colorMode === 'dark' ? '#93a1a1'");
    content = content.replace(/colorMode === 'dark' \? '#ffffff'/g, "colorMode === 'dark' ? '#268bd2'");
    content = content.replace(/colorMode === 'dark' \? 'rgba\(255,255,255,0\.1\)'/g, "colorMode === 'dark' ? 'rgba(38, 139, 210, 0.2)'");
    content = content.replace(/colorMode === 'dark' \? '#cbd5e1'/g, "colorMode === 'dark' ? '#839496'");
    content = content.replace(/colorMode === 'dark' \? '#0f172a'/g, "colorMode === 'dark' ? '#073642'");

    // TableCard specifically
    content = content.replace(/colorMode === 'dark' \? 'rgba\(255,255,255,0\.02\)'/g, "colorMode === 'dark' ? '#073642'");
    content = content.replace(/colorMode === 'dark' \? 'rgba\(255,255,255,0\.04\)'/g, "colorMode === 'dark' ? '#073642'");
    content = content.replace(/colorMode === 'dark' \? 'rgba\(255,255,255,0\.06\)'/g, "colorMode === 'dark' ? '#073642'");
    content = content.replace(/colorMode === 'dark' \? 'rgba\(255,255,255,0\.12\)'/g, "colorMode === 'dark' ? '#586e75'");

    // TableCard box shadows etc.
    content = content.replace(/colorMode === 'dark' \? 'rgba\(0,0,0,0\.4\)'/g, "colorMode === 'dark' ? 'rgba(0,43,54,0.6)'");

    fs.writeFileSync(filepath, content);
}

globalReplace('/Users/senthilpalanivelu/resources/src/main.jsx');
globalReplace('/Users/senthilpalanivelu/resources/src/App.jsx');
globalReplace('/Users/senthilpalanivelu/resources/src/components/TableCard.jsx');
console.log("Solarized Dark applied!");
