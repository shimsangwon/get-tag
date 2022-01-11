const core = require('@actions/core');

const VERSION = 'version';
const REFS = 'refs'

try {
  const manuallyVersion = core.getInput(VERSION);
  const refs = core.getInput(REFS);

  if (refs !== '') {
    const versions = refs.split('/');
    const version = versions[versions.length - 1];

    console.log(version);
    core.setOutput('version', version);
  } else if (manuallyVersion !== '') {
    console.log(manuallyVersion);
    core.setOutput('version', manuallyVersion);
  } else {
    core.setOutput('version', '1.0.0');
  }
} catch (e) {
  core.setOutput('version', '1.0.0');
}