import { Command } from 'clipanion'
import { Configuration, CommandContext } from '@yarnpkg/core'
import { executeAfterInstallHook } from '../utils'

/**
 * Command to run the `afterInstallAlways` hook
 */
export class AfterInstallAlwaysCommand extends Command<CommandContext> {
  static override paths = [['after-install-always']]

  async execute(): Promise<number> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins)
    return executeAfterInstallHook(configuration, false, false)
  }
}
