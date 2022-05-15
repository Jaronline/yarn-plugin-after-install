import { ConfigurationDefinitionMap, SettingsType } from '@yarnpkg/core'

// extend `.yarnrc.yml` to allow `afterInstall` key
declare module '@yarnpkg/core' {
  interface ConfigurationValueMap {
    afterInstall: string
    afterInstallMode: string
    afterInstallNoMode: string
  }
}

// define `afterInstall` config as string
export const configuration: Partial<ConfigurationDefinitionMap> = {
  afterInstall: {
    description: 'Hook that will always run after install',
    type: SettingsType.STRING,
    default: ''
  },
  afterInstallNoMode: {
    description: 'Hook that will run after install if no mode has been set',
    type: SettingsType.STRING,
    default: ''
  },
  afterInstallMode: {
    description: 'Hook that will run after install if a mode has been set',
    type: SettingsType.STRING,
    default: ''
  }
}
