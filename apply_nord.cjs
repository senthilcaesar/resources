const fs = require('fs');

function replaceAll(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // Solarized -> Nord
    content = content.replace(/#002b36/g, '#2e3440'); // bg
    content = content.replace(/#073642/g, '#3b4252'); // surface
    content = content.replace(/#839496/g, '#eceff4'); // text primary
    content = content.replace(/#586e75/g, '#4c566a'); // borders
    content = content.replace(/#93a1a1/g, '#d8dee9'); // text secondary
    content = content.replace(/#2aa198/g, '#88c0d0'); // accent 1
    content = content.replace(/#268bd2/g, '#81a1c1'); // accent 2
    content = content.replace(/rgba\(38, 139, 210, 0\.2\)/g, 'rgba(136, 192, 208, 0.15)'); // transparent accent
    content = content.replace(/rgba\(0,43,54,0\.6\)/g, 'rgba(46, 52, 64, 0.6)'); // shadow

    fs.writeFileSync(filepath, content);
}

replaceAll('/Users/senthilpalanivelu/resources/src/main.jsx');
replaceAll('/Users/senthilpalanivelu/resources/src/App.jsx');
replaceAll('/Users/senthilpalanivelu/resources/src/components/TableCard.jsx');

console.log("Nord applied!");
