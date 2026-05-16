/* eslint-disable @typescript-eslint/no-var-requires, prettier/prettier */
// Config plugin: works around Xcode 16+/26 vs RN 0.76 fmt consteval failure.
// Adds OTHER_CPLUSPLUSFLAGS=-DFMT_USE_CONSTEVAL=0 to every Pods target and
// patches fmt's base header to neutralize consteval if the flag alone is
// insufficient. Drop this plugin once on RN 0.77+ (Expo SDK 53).
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const HOOK_MARKER = '# fmt-consteval-fix';
const HOOK = `
  ${HOOK_MARKER}
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      flags = config.build_settings['OTHER_CPLUSPLUSFLAGS'] || ['$(inherited)']
      flags = [flags] unless flags.is_a?(Array)
      flags << '-DFMT_USE_CONSTEVAL=0' unless flags.include?('-DFMT_USE_CONSTEVAL=0')
      config.build_settings['OTHER_CPLUSPLUSFLAGS'] = flags
    end
  end
  # Neutralize fmt's consteval qualifier directly in the bundled header.
  Dir.glob(File.join(installer.sandbox.root, '**/fmt/base.h')).each do |header|
    text = File.read(header)
    patched = text.gsub('#  define FMT_USE_CONSTEVAL 1', '#  define FMT_USE_CONSTEVAL 0')
    File.write(header, patched) unless text == patched
  end
  Dir.glob(File.join(installer.sandbox.root, '**/fmt/core.h')).each do |header|
    text = File.read(header)
    patched = text.gsub('#  define FMT_USE_CONSTEVAL 1', '#  define FMT_USE_CONSTEVAL 0')
    File.write(header, patched) unless text == patched
  end
`;

module.exports = function withFmtConstevalFix(config) {
  return withDangerousMod(config, [
    'ios',
    async (cfg) => {
      const podfilePath = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf8');
      if (contents.includes(HOOK_MARKER)) return cfg;
      contents = contents.replace(
        /post_install do \|installer\|/,
        (match) => `${match}${HOOK}`
      );
      fs.writeFileSync(podfilePath, contents);
      return cfg;
    },
  ]);
};
