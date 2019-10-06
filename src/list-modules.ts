import { extname } from 'path';
import { ListDirectoryOptions, listDirectory } from './list-directory';

export interface ModuleEntry<T = any> {
  name: string;
  path: string;
  module: T;
}

export interface ListModulesOptions extends ListDirectoryOptions {
  extensions: string[];
}

export async function listModules<T = any>(
  dir: string,
  options?: Partial<ListModulesOptions>
): Promise<ModuleEntry<T>[]> {
  const config: ListModulesOptions = {
    // Default options:
    recursive: false,
    filter: () => true,
    extensions: ['js', 'jsx', 'ts', 'tsx'],

    // User options:
    ...options
  };

  const extensions = config.extensions.map((ext) =>
    /^\./.test(ext) ? ext : `.${ext}`
  );

  const files = await listDirectory(dir, {
    recursive: config.recursive,
    filter: (file) =>
      file.isFile() &&
      extensions.includes(extname(file.path)) &&
      config.filter(file)
  });

  const promises = files.map<Promise<ModuleEntry<T>>>(
    async ({ path, name }) => ({
      module: await import(path),
      path,
      name
    })
  );

  const modules = await Promise.all(promises);

  return modules;
}
