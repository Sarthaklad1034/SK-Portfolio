const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'src/components/ui/card.jsx',
    'src/components/admin/Dashboard.jsx'
];

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.error(`Missing required file: ${file}`);
        process.exit(1);
    }
});

console.log('All required files exist');