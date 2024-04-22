const fs = require('fs');
const path = require('path');

let packageJson;
try {
	packageJson = JSON.parse(fs.readFileSync(path.join(process.env.MAIN_REPO_PATH, 'package.json')));
} catch (err) {
	console.error('package.json not found or is not valid JSON');
	process.exit(1);
}
const approvedLibraries = JSON.parse(fs.readFileSync(path.join(process.env.PRIVATE_WORKFLOW_FILE_PATH, 'approved-libraries.json')));

const badLibraries = [];
for (const [name, version] of Object.entries(packageJson.dependencies || {})) {
	// Later we may want a more sophisticated test involving version as well
	if (!approvedLibraries[name]) {
		badLibraries.push(name);
	}
}

console.log('Dependency check complete.');
if (badLibraries.length > 0) {
	console.error(`Bad libraries found: ${badLibraries.join(', ')}`);
	process.exit(1);
}
