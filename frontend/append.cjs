const fs = require('fs');

const content = fs.readFileSync('src/ShortlistedTeams.tsx', 'utf-8');
const match = content.match(/const shortlistedTeams: ShortlistedTeam\[\] = \[([\s\S]*?)\];/);

if (!match) {
  console.error("No array match");
  process.exit(1);
}

const rawArray = eval('[' + match[1] + ']');

const newSoftwareTeams = [
  { teamName: 'JACKCODERS', leader: 'Neil Mascaren', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Hashiras', leader: 'Mohamed Man', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Genz innovator', leader: 'Rachana P', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'GEC CHAMARAJ', leader: 'Ishank Mourya M', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Medirush', leader: 'Swati B Parshi', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Neural Ninjas', leader: 'Vinay M', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Kaizen', leader: 'Chiranthan M S', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'VoltNexus', leader: 'Mohamed Arif M', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Think Quest', leader: 'Punith', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Vision Coders', leader: 'Priyanka S K', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'NeuroFlex', leader: 'Granthini CA', domain: 'SOFTWARE', status: 'WAITLISTED' },
  { teamName: 'Vinland', leader: 'Akshay Nadig', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'CipherVault', leader: 'Dhruva M', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'Apexminds', leader: 'Yukthashree S', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'NEXUS 4.0', leader: 'Varun Gowda', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'Zenith', leader: 'Thanmayi M', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'VVCE Iron Squad', leader: 'Thaha Ahmed', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'AlgoRangers', leader: 'Ayush N P', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Devsquad', leader: 'Harshan H B', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Code Aeternum', leader: 'Mohammed Za', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'GenCodez', leader: 'Rithvik S', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Dev titans', leader: 'Madan B R', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'ByteX', leader: 'Shreyas SH', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'TradeMint', leader: 'Satvik D B', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'PrivacyX', leader: 'Vikas BU', domain: 'SOFTWARE', status: 'SHORTLISTED' }
];

let finalArray = rawArray.concat(newSoftwareTeams);

let resultStr = 'const shortlistedTeams: ShortlistedTeam[] = [\n';
finalArray.forEach((t, i) => {
  resultStr += `  { teamName: '${t.teamName}', leader: '${t.leader}', domain: '${t.domain}', status: '${t.status}' }${i < finalArray.length - 1 ? ',' : ''}\n`;
});
resultStr += '];';

const newContent = content.replace(match[0], resultStr);
fs.writeFileSync('src/ShortlistedTeams.tsx', newContent);
console.log('Saved');
