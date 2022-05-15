import type { Plugin, Project } from '@yarnpkg/core'
import { configuration } from './config'
import { AfterInstallCommand } from './commands/afterInstall'
import { executeAfterInstallHook } from './utils'
import type { InstallOptions } from '@yarnpkg/core/lib/Project'
import { AfterInstallAlwaysCommand } from './commands/afterInstallAlways'

const plugin: Plugin = {
  configuration,
  commands: [AfterInstallCommand, AfterInstallAlwaysCommand],
  hooks: {
    afterAllInstalled: async (project: Project, options: InstallOptions): Promise<void> => {
      const exitCode = await executeAfterInstallHook(project.configuration, true, Boolean(options.mode))
      if (exitCode) {
        throw new Error('The `afterInstall` hook failed, see output above.')
      }
    }
  }
}

export default plugin
