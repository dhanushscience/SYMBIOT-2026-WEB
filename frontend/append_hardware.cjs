const fs = require('fs');

const content = fs.readFileSync('src/ShortlistedTeams.tsx', 'utf-8');
const match = content.match(/const shortlistedTeams: ShortlistedTeam\[\] = \[([\s\S]*?)\];/);

if (!match) {
  console.error("No array match");
  process.exit(1);
}

const rawArray = eval('[' + match[1] + ']');
const existingSet = new Set(rawArray.map(t => `${t.teamName.trim().toLowerCase()}|${t.leader.trim().toLowerCase()}`));

const newTeamsRaw = [
{ teamName: "Amplifiers", leader: "Shreeharsha D S" },
{ teamName: "idea forge", leader: "shriya srinivas" },
{ teamName: "Yugmatech", leader: "Ananya Anilkumar" },
{ teamName: "Code4Cure", leader: "Chandan S" },
{ teamName: "Dose Track", leader: "Prithvik Raju Naik" },
{ teamName: "4_bit", leader: "Girish MP" },
{ teamName: "Project HERA", leader: "Nahida Firdous" },
{ teamName: "Techives", leader: "Shiva Prasad M B" },
{ teamName: "Team conquerors", leader: "C N PRATHAM" },
{ teamName: "Ai avengers", leader: "PUNYASHREE" },
{ teamName: "3Bytes", leader: "Devan Arya" },
{ teamName: "BitVeda", leader: "Sujith" },
{ teamName: "DOMINATORS", leader: "SHUSHANTH RAJ K" },
{ teamName: "Short Circuit", leader: "Keerthana BL" },
{ teamName: "Quadron", leader: "Adarsh M B" },
{ teamName: "Innovators", leader: "Tanny ub" },
{ teamName: "TrustiX", leader: "H B Shivani" },
{ teamName: "Team Bravo", leader: "Katte Harshitha" },
{ teamName: "CareNet", leader: "Bhavani M" },
{ teamName: "MedMatrix", leader: "Dheeraj Achar H" },
{ teamName: "Team Virus", leader: "MAHESHA M" },
{ teamName: "NatureX", leader: "SAMARTH S" },
{ teamName: "ODNMS", leader: "Nandan SV" },
{ teamName: "Quadsync", leader: "Monish P" },
{ teamName: "INFINITE IGNITY", leader: "Impana H N" },
{ teamName: "RescueX", leader: "Yashwanth N" },
{ teamName: "infinite solutions", leader: "Anush Rao D" },
{ teamName: "Agrobot", leader: "Swathi Vishwanath" },
{ teamName: "ROAD_BREEZE", leader: "Prajwal Maths" },
{ teamName: "PeaceOps", leader: "Akshath Acharya N" },
{ teamName: "Chanukya's", leader: "Chandana S Gowda" },
{ teamName: "CTRLELITE", leader: "Anurag Rawat" },
{ teamName: "Guardian Medics", leader: "Deepikashree KR" },
{ teamName: "The Mind Mesh", leader: "Sanjay A" },
{ teamName: "AURALIS", leader: "Dhanush R" },
{ teamName: "Lumina", leader: "Hema Rashmi S" }
];

let addedCount = 0;
for (const t of newTeamsRaw) {
  const tObj = { ...t, domain: 'HARDWARE', status: 'SHORTLISTED' };
  const key = `${tObj.teamName.trim().toLowerCase()}|${tObj.leader.trim().toLowerCase()}`;
  if (!existingSet.has(key)) {
    rawArray.push(tObj);
    existingSet.add(key);
    addedCount++;
  } else {
    console.log(`Skipped duplicate: ${tObj.teamName} - ${tObj.leader}`);
  }
}

console.log(`Successfully added ${addedCount} Hardware teams.`);

let resultStr = 'const shortlistedTeams: ShortlistedTeam[] = [\n';
rawArray.forEach((t, i) => {
  // Properly escape single quotes if they exist (like Chanukya's)
  const escapedName = t.teamName.replace(/'/g, "\\'");
  const escapedLeader = t.leader.replace(/'/g, "\\'");
  resultStr += `  { teamName: '${escapedName}', leader: '${escapedLeader}', domain: '${t.domain}', status: '${t.status}' }${i < rawArray.length - 1 ? ',' : ''}\n`;
});
resultStr += '];';

const newContent = content.replace(match[0], resultStr);
fs.writeFileSync('src/ShortlistedTeams.tsx', newContent);
