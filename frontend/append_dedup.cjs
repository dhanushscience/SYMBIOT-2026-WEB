const fs = require('fs');

const content = fs.readFileSync('src/ShortlistedTeams.tsx', 'utf-8');
const match = content.match(/const shortlistedTeams: ShortlistedTeam\[\] = \[([\s\S]*?)\];/);

if (!match) {
  console.error("No array match");
  process.exit(1);
}

const rawArray = eval('[' + match[1] + ']');

const existingSet = new Set(rawArray.map(t => `${t.teamName.trim().toLowerCase()}|${t.leader.trim().toLowerCase()}`));

const newTeams = [
  // Block 1
  { teamName: 'CodeVeda', leader: 'Srushti Sha', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'The Devdragor', leader: 'V Mathan Kumar', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Vikings', leader: 'Aditya', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Elites', leader: 'Abhishek G Ra', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'EcoLogic', leader: 'Gagan K S', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CodeX', leader: 'Ravikumar Huc', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'FutureMinds', leader: 'Rachitha Kama', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'HackOrbit', leader: 'Thejas Bk', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Hack Dominators', leader: 'Milan Raj', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Connected Crew', leader: 'Sneha G C', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CodeCreators', leader: 'Poornima N', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CodeRed', leader: 'Sneha R', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Aura Setters', leader: 'Ganavi KP', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Nexa', leader: 'Chandana NM', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'HacktoWin', leader: 'Hemalatha L', domain: 'SOFTWARE', status: 'SHORTLISTED' },

  // Block 2
  { teamName: 'AlgoRiders', leader: 'Sufiyan Saleem', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Herb Trace', leader: 'Raksha A R', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Codebase', leader: 'Nithin D', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'GOALDTECH', leader: 'Dhanushiya S', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Vision Stack', leader: 'Varnika EC', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'InnovX', leader: 'Aimanz Sarwar', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Team404', leader: 'Dhanush U', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Phoenix A*', leader: 'Madhukeshwar M', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Data dynamos', leader: 'Anirudh Pai', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Herb_Ledger', leader: 'Pranamya R', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Curly Braces', leader: 'Tarun S G', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Rookies', leader: 'Prajwal Goni', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Pink Panthers', leader: 'Sindhu H M', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Binary Brains', leader: 'Sanjana K G', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Spark Igniters', leader: 'Pushpa DC', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'SquadBytes', leader: 'Gnana Rava', domain: 'SOFTWARE', status: 'WAITLISTED' }
];

let addedCount = 0;
for (const t of newTeams) {
  const key = `${t.teamName.trim().toLowerCase()}|${t.leader.trim().toLowerCase()}`;
  if (!existingSet.has(key)) {
    rawArray.push(t);
    existingSet.add(key);
    addedCount++;
  } else {
    console.log(`Skipped duplicate: ${t.teamName} - ${t.leader}`);
  }
}

console.log(`Successfully added ${addedCount} new teams.`);

let resultStr = 'const shortlistedTeams: ShortlistedTeam[] = [\n';
rawArray.forEach((t, i) => {
  resultStr += `  { teamName: '${t.teamName}', leader: '${t.leader}', domain: '${t.domain}', status: '${t.status}' }${i < rawArray.length - 1 ? ',' : ''}\n`;
});
resultStr += '];';

const newContent = content.replace(match[0], resultStr);
fs.writeFileSync('src/ShortlistedTeams.tsx', newContent);
