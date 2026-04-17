const fs = require('fs');

const content = fs.readFileSync('e:/Symbiot Web final 2april 26/SYMBIOT-2026-WEB/frontend/src/ShortlistedTeams.tsx', 'utf-8');
const match = content.match(/const shortlistedTeams: ShortlistedTeam\[\] = \[([\s\S]*?)\];/);

if (!match) {
  console.error("No array match");
  process.exit(1);
}

const rawArray = eval('[' + match[1] + ']');

// Clean up
rawArray.forEach(t => {
  t.teamName = t.teamName.trim();
  t.leader = t.leader.trim();
  
  // Title case processing
  t.teamName = t.teamName.split(' ').map(word => {
     // Apply if word is full lower or full upper
     if (word === word.toLowerCase() || word === word.toUpperCase()) {
         return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
     }
     return word;
  }).join(' ');

  t.leader = t.leader.split(' ').map(word => {
     if (word === word.toLowerCase() || word === word.toUpperCase()) {
         return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
     }
     return word;
  }).join(' ');
});

const priority = {
  'SHORTLISTED': 1,
  'WAITLISTED': 2,
  'NOT SELECTED': 3
};

const uniqueTeamsMap = new Map();

rawArray.forEach(t => {
  const key = t.teamName.toLowerCase() + '|' + t.leader.toLowerCase();
  
  if (uniqueTeamsMap.has(key)) {
     const existing = uniqueTeamsMap.get(key);
     if (priority[t.status] < priority[existing.status]) {
        uniqueTeamsMap.set(key, t);
     }
  } else {
     uniqueTeamsMap.set(key, t);
  }
});

let finalArray = Array.from(uniqueTeamsMap.values());

// Sort software teams (and keep others at start if any, but let's sort all by domain then status)
finalArray.sort((a, b) => {
   if (a.domain !== b.domain) return a.domain.localeCompare(b.domain);
   return priority[a.status] - priority[b.status];
});

let resultStr = 'const shortlistedTeams: ShortlistedTeam[] = [\n';
finalArray.forEach((t, i) => {
  resultStr += `  { teamName: '${t.teamName}', leader: '${t.leader}', domain: '${t.domain}', status: '${t.status}' }${i < finalArray.length - 1 ? ',' : ''}\n`;
});
resultStr += '];\n';

fs.writeFileSync('e:/Symbiot Web final 2april 26/SYMBIOT-2026-WEB/frontend/cleaned_data.txt', resultStr);
console.log('Saved to cleaned_data.txt');
