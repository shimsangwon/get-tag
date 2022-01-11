const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');

const VERSION = 'version';
const REFS = 'refs'

/**
 * 1. 수동으로 입력한 값이 있다면, 우선적용
 * 2. 만약 없다면 현재값 적용
 * 3. 그런데, semver 형식이 아니라면 에러
 */

try {
  const manuallyVersion = core.getInput(VERSION);
  const ref = github.context.ref

  let version = null;
  if (manuallyVersion !== '') {
    version = semver.coerce(manuallyVersion, {}).version;
  } else {
    const refs = ref.split('/');
    version = refs[refs.length - 1];
  }

  if (semver.valid(version, {})) {
    core.setOutput('version', version);
  } else {
    core.setFailed(`입력한 버전(${manuallyVersion !== '' ? manuallyVersion : ref}, ${version}) 이 SEMVER 형식에 맞지 않습니다.`);
  }
} catch (e) {
  core.setFailed(e.message);
}