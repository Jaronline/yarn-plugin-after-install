import type { Configuration } from '@yarnpkg/core'
import { execute } from '@yarnpkg/shell'

/**
 * Execute the `afterInstall` hook
 *
 * @param {Configuration} configuration Configuration
 * @param {boolean} printPreamble Whether to print a preamble before execution
 * @param {InstallMode} mode Wether an install mode has been used
 * @returns {number} Exit code
 */
export const executeAfterInstallHook = async (
  configuration: Configuration,
  printPreamble: boolean,
  mode?: boolean
): Promise<number> => {
  const afterInstall = configuration.get(mode ? 'afterInstall' : 'afterInstallAlways')
  // https://github.com/yarnpkg/berry/blob/4f88b35c90695fb83c296b57f64cbf8dd2f88a9a/packages/plugin-dlx/sources/commands/dlx.ts#L47
  const isDlx = !!configuration.projectCwd?.endsWith(`dlx-${process.pid}`)
  if (afterInstall && !isDlx) {
    if (printPreamble) {
      // TODO use a LightReport to write this to STDOUT, being careful to check for the `--json` flag from the user
      console.log('Running `afterInstall` hook...')
    }
    return execute(
      afterInstall,
      [],
      configuration.projectCwd
        ? {
            cwd: configuration.projectCwd
          }
        : undefined
    )
  }
  return 0
}
