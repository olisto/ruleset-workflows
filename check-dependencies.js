const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync(path.join(process.env.MAIN_REPO_PATH, 'package.json')));
const approvedPackages = JSON.parse(fs.readFileSync(path.join(process.env.TEST_REPO_PATH, 'approved-libraries.json')));

const badLibraries = [];
for (const [name, version] of Object.entries(package.dependencies || {})) {
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
