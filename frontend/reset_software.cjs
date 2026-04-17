const fs = require('fs');

const content = fs.readFileSync('src/ShortlistedTeams.tsx', 'utf-8');
const match = content.match(/const shortlistedTeams: ShortlistedTeam\[\] = \[([\s\S]*?)\];/);

if (!match) {
  console.error("No array match");
  process.exit(1);
}

const rawArray = eval('[' + match[1] + ']');

let newArray = rawArray.filter(t => t.domain !== 'SOFTWARE');

const newSoftwareTeams = [
  { teamName: "AlgoRangers", leader: "Ayush N P" },
  { teamName: "Devsquad", leader: "Harshan H B" },
  { teamName: "Code Aeternum", leader: "Mohammed Zayid Khan" },
  { teamName: "GenCodez", leader: "Rithvik S" },
  { teamName: "Dev titans", leader: "MADAN B R" },
  { teamName: "ByteX", leader: "Shreyas SH" },
  { teamName: "TradeMint", leader: "Satvik D B" },
  { teamName: "PrivacyX", leader: "Vikas BU" },
  { teamName: "CodeVeda", leader: "SRUSHTI SHASHIKANT PATIL" },
  { teamName: "The Devdragons", leader: "V Mathan Kumar" },
  { teamName: "Vikings", leader: "Aditya" },
  { teamName: "Elites", leader: "Abhishek G Rao" },
  { teamName: "EcoLogic", leader: "Gagan K S" },
  { teamName: "CodeX", leader: "Ravikumar Hugar" },
  { teamName: "FutureMinds", leader: "Rachitha Kamath" },
  { teamName: "HackOrbit", leader: "Thejas Bk" },
  { teamName: "Hack Dominators", leader: "Milan Raj" },
  { teamName: "Connected creators", leader: "Sneha G C" },
  { teamName: "CodeCreators", leader: "POORNIMA N" },
  { teamName: "CodeRed", leader: "SNEHA R" },
  { teamName: "Aura Setters", leader: "Ganavi KP" },
  { teamName: "Nexa", leader: "Chandana NM" },
  { teamName: "HacktoWin", leader: "Hemalatha L" },
  { teamName: "AlgoRiders", leader: "Sufiyan Saleem ahmed" },
  { teamName: "Herb Trace", leader: "Raksha A R" },
  { teamName: "Codebase", leader: "Nithin D" },
  { teamName: "GOALDTECH", leader: "Dhanushiya S" },
  { teamName: "Vision Stack", leader: "Varnika EC" },
  { teamName: "InnovX", leader: "Aimanz Sarwad Sarwad" },
  { teamName: "TCA", leader: "Shravani D" },
  { teamName: "DSE", leader: "PRAJWAL MATHS" },
  { teamName: "CODE BREAKERS", leader: "SRIVALLI S SHARMA" },
  { teamName: "Jungly Billi", leader: "Zidane Contractor" },
  { teamName: "Alive", leader: "D S Chirag" },
  { teamName: "Algorythm", leader: "TUSHAR MV" },
  { teamName: "Pulse_X", leader: "Arjun M" },
  { teamName: "ESTATESYNC", leader: "Vikas P Vishwakarma" },
  { teamName: "team syntax addicts", leader: "Ahmed Faraaz" },
  { teamName: "neural forge", leader: "ahmed faraaz" },
  { teamName: "TECHNO SQUAD", leader: "Dhanush R S" },
  { teamName: "Infra Sentinel", leader: "Chinmay C P CP" },
  { teamName: "JACKCODERS", leader: "Neil Mascarenhas" },
  { teamName: "Hashiras", leader: "Mohamed mansoor khateeb" },
  { teamName: "Genz innovators", leader: "Rachana P" },
  { teamName: "GEC CHAMARAJAN", leader: "Ishank Mourya Mourya" },
  { teamName: "Medirush", leader: "Swati B parshi" }
].map(t => ({...t, domain: 'SOFTWARE', status: 'SHORTLISTED'}));

newArray = newArray.concat(newSoftwareTeams);

let resultStr = 'const shortlistedTeams: ShortlistedTeam[] = [\n';
newArray.forEach((t, i) => {
  const escapedName = t.teamName.replace(/'/g, "\\'");
  const escapedLeader = t.leader.replace(/'/g, "\\'");
  resultStr += `  { teamName: '${escapedName}', leader: '${escapedLeader}', domain: '${t.domain}', status: '${t.status}' }${i < newArray.length - 1 ? ',' : ''}\n`;
});
resultStr += '];';

const newContent = content.replace(match[0], resultStr);
fs.writeFileSync('src/ShortlistedTeams.tsx', newContent);
console.log('Saved');
