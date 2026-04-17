const fs = require('fs');

const content = fs.readFileSync('src/ShortlistedTeams.tsx', 'utf-8');
const match = content.match(/const shortlistedTeams: ShortlistedTeam\[\] = \[([\s\S]*?)\];/);

if (!match) {
  console.error("No array match");
  process.exit(1);
}

const rawArray = eval('[' + match[1] + ']');

const waitlistedTeams = [
  { teamName: "Quadcore titans", leader: "Vineeth Kumar" },
  { teamName: "vvcians", leader: "R Shreya" },
  { teamName: "Neural Ninjas", leader: "VINAY M" },
  { teamName: "Kaizen", leader: "Chiranthan M S" },
  { teamName: "VoltNexus", leader: "Mohamed Arif M" },
  { teamName: "Think Quest", leader: "Punith" },
  { teamName: "Vision Coders", leader: "Priyanka S K" },
  { teamName: "NeuroFlex", leader: "Granthini CA" },
  { teamName: "DebugLeaf", leader: "Karthik M" },
  { teamName: "Rookies", leader: "Prajwal Goni" },
  { teamName: "pink panthers", leader: "SINDHU H M" },
  { teamName: "Binary brains", leader: "Sanjana K G" },
  { teamName: "Spark Igniters", leader: "Pushpa dc" },
  { teamName: "SquadBytes", leader: "GNANA RAVANDUR PRAKASH" },
  { teamName: "Team404", leader: "Dhanush urs" },
  { teamName: "Phoenix A*", leader: "Madhukeshwar Shripad Hegde" },
  { teamName: "Data dynamos", leader: "Anirudh Pai" },
  { teamName: "Herb_Ledger", leader: "Pranamya R" },
  { teamName: "Curly Braces", leader: "Tarun S G" }
];

let added = 0;
let updated = 0;
let skipped = 0;

for (const wt of waitlistedTeams) {
  const key = wt.teamName.trim().toLowerCase();
  const existingIdx = rawArray.findIndex(t => t.teamName.trim().toLowerCase() === key && t.domain === 'SOFTWARE');

  if (existingIdx !== -1) {
    if (rawArray[existingIdx].status === 'SHORTLISTED') {
      console.log(`Skipped (already SHORTLISTED): ${wt.teamName} - ${wt.leader}`);
      skipped++;
    } else {
      rawArray[existingIdx].status = 'WAITLISTED';
      rawArray[existingIdx].leader = wt.leader; // update leader name to latest
      console.log(`Updated status to WAITLISTED: ${wt.teamName}`);
      updated++;
    }
  } else {
    rawArray.push({ teamName: wt.teamName, leader: wt.leader, domain: 'SOFTWARE', status: 'WAITLISTED' });
    added++;
    console.log(`Added new: ${wt.teamName} - ${wt.leader}`);
  }
}

console.log(`\nSummary: Added ${added}, Updated ${updated}, Skipped ${skipped}`);

let resultStr = 'const shortlistedTeams: ShortlistedTeam[] = [\n';
rawArray.forEach((t, i) => {
  const escapedName = t.teamName.replace(/'/g, "\\'");
  const escapedLeader = t.leader.replace(/'/g, "\\'");
  resultStr += `  { teamName: '${escapedName}', leader: '${escapedLeader}', domain: '${t.domain}', status: '${t.status}' }${i < rawArray.length - 1 ? ',' : ''}\n`;
});
resultStr += '];';

const newContent = content.replace(match[0], resultStr);
fs.writeFileSync('src/ShortlistedTeams.tsx', newContent);
console.log('Saved successfully.');
