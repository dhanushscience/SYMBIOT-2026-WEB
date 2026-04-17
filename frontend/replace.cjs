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
  { teamName: 'Spark', leader: 'G Rohan', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'Nirmaan', leader: 'Sanjana K S', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'Neural Nexus', leader: 'Ashith Shetty AM', domain: 'SOFTWARE', status: 'NOT SELECTED' },
  { teamName: 'TCA', leader: 'Shravani D', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'DSE', leader: 'Prajwal M A', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CODE BREAK', leader: 'Srivalli S S H', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Jungly Bill', leader: 'Zidane Contract M', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Alive', leader: 'D S Chirag', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Algorythm', leader: 'Tushar M V', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Pulse_X', leader: 'Arjun M', domain: 'SOFTWARE', status: 'SHORTLISTED' }
];

newArray = newArray.concat(newSoftwareTeams);

let resultStr = 'const shortlistedTeams: ShortlistedTeam[] = [\n';
newArray.forEach((t, i) => {
  resultStr += `  { teamName: '${t.teamName}', leader: '${t.leader}', domain: '${t.domain}', status: '${t.status}' }${i < newArray.length - 1 ? ',' : ''}\n`;
});
resultStr += '];';

const newContent = content.replace(match[0], resultStr);
fs.writeFileSync('src/ShortlistedTeams.tsx', newContent);
console.log('Saved');
