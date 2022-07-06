export interface ContextOptions {
  hasPermission: (
    value?: string | string[] | undefined,
    def?: boolean,
  ) => boolean
  createLoading: AnyFunction<any>
}

export let context: ContextOptions = {
  hasPermission: () => false,
  createLoading: () => {},
}

export const initDirectiveModule = async (_context: ContextOptions) => {
  context = _context
}
