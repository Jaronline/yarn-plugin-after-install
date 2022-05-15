import type { Plugin, Project } from '@yarnpkg/core'
import { configuration } from './config'
import { AfterInstallModeCommand } from './commands/afterInstallMode'
import { executeAfterInstallHook, executeAfterInstallModeHook } from './utils'
import type { InstallOptions } from '@yarnpkg/core/lib/Project'
import { AfterInstallCommand } from './commands/afterInstall'
import { AfterInstallNoModeCommand } from './commands/afterInstallNoMode'

const plugin: Plugin = {
  configuration,
  commands: [AfterInstallCommand, AfterInstallModeCommand, AfterInstallNoModeCommand],
  hooks: {
    afterAllInstalled: async (project: Project, options: InstallOptions): Promise<void> => {
      const exitCode = await executeAfterInstallHook(project.configuration, true)
      if (exitCode) {
        throw new Error('The `afterInstall` hook failed, see output above.')
      }

      const hasMode = options.mode !== undefined
      const modeExitCode = await executeAfterInstallModeHook(project.configuration, true, hasMode)
      if (modeExitCode) {
        throw new Error(`The \`afterInstall${hasMode ? '' : 'No'}Mode\` hook failed, see output above.`)
      }
    }
  }
}

export default plugin
