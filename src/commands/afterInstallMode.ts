import { Command } from 'clipanion'
import { Configuration, CommandContext } from '@yarnpkg/core'
import { executeAfterInstallModeHook } from '../utils'

/**
 * Command to run the `afterInstallMode` hook
 */
export class AfterInstallModeCommand extends Command<CommandContext> {
  static override paths = [['after-install-mode']]

  async execute(): Promise<number> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins)
    return executeAfterInstallModeHook(configuration, false, true)
  }
}
