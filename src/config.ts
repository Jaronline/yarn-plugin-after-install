import { ConfigurationDefinitionMap, SettingsType } from '@yarnpkg/core'

// extend `.yarnrc.yml` to allow `afterInstall` key
declare module '@yarnpkg/core' {
  interface ConfigurationValueMap {
    afterInstallAlways: string
    afterInstall: string
  }
}

// define `afterInstall` config as string
export const configuration: Partial<ConfigurationDefinitionMap> = {
  afterInstallAlways: {
    description: 'Hook that will always run after install',
    type: SettingsType.STRING,
    default: ''
  },
  afterInstall: {
    description: 'Hook that will run after install if no mode has been set',
    type: SettingsType.STRING,
    default: ''
  }
}
