const fs = require('fs');

const file = './src/pages/roles/ConsumerDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// Dashboard main background
content = content.replace(
  /<main className="dashboard-main light-bg" style={{ background: 'radial-gradient\(circle, #f0fdf4 0%, #ffffff 100%\)' }}>/g,
  '<main className="dashboard-main" style={{ background: "black", color: "white" }}>'
);

// Card backgrounds 
content = content.replace(/background:\s*'var\(--color-cream\)'/g, "background: '#111'");
content = content.replace(/background:\s*'#f0fdf4'/g, "background: '#111'");
content = content.replace(/background:\s*'#f8fafc'/g, "background: '#111'");
content = content.replace(/background:\s*'#ffffff'/g, "background: '#111'");

// Text colors to white / light gray
content = content.replace(/color:\s*'#1e293b'/g, "color: 'white'");
content = content.replace(/color:\s*'#1a202c'/g, "color: 'white'");
content = content.replace(/color:\s*'#1a1a1a'/g, "color: 'white'");
content = content.replace(/color:\s*'#4a5568'/g, "color: '#ccc'");
content = content.replace(/color:\s*'#666'/g, "color: '#aaa'");
content = content.replace(/color:\s*'#374151'/g, "color: 'white'");
content = content.replace(/color:\s*'#166534'/g, "color: '#4ade80'");

// Fix repeating color: '#1e293b', color: '#1e293b',
content = content.replace(/color:\s*'white',\s*color:\s*'white',/g, "color: 'white',");

// Input boxes background
content = content.replace(/background:\s*'#f1f5f9'/g, "background: '#222'");
content = content.replace(/color:\s*'#0a0a0a'/g, "color: 'white'");

fs.writeFileSync(file, content, 'utf8');
console.log('Updated ConsumerDashboard.jsx');
