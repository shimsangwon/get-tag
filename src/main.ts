import core from '@actions/core';
import github from '@actions/github';

const VERSION = 'version';
const REFS = 'refs'

try {
  const manuallyVersion = core.getInput(VERSION);
  const refs = core.getInput(REFS);

  if (refs !== '') {
    const versions = refs.split('/');
    const version = versions[versions.length - 1];

    core.setOutput('version', version);
  } else if (manuallyVersion !== '') {
    core.setOutput('version', '1.0.0');
  }

  core.setOutput('version', '1.0.0');
} catch (e) {
  core.setOutput('version', '1.0.0');
}