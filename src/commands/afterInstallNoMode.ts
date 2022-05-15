import { Command } from 'clipanion'
import { Configuration, CommandContext } from '@yarnpkg/core'
import { executeAfterInstallModeHook } from '../utils'

/**
 * Command to run the `afterInstallNoMode` hook
 */
export class AfterInstallNoModeCommand extends Command<CommandContext> {
  static override paths = [['after-install-no-mode']]

  async execute(): Promise<number> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins)
    return executeAfterInstallModeHook(configuration, false, false)
  }
}
