import fs, { Dirent } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

export interface Entry extends Dirent {
  path: string;
}

export interface ListDirectoryOptions {
  recursive: boolean;
  filter: (file: Entry) => boolean;
}

export async function listDirectory(
  dir: string,
  options?: Partial<ListDirectoryOptions>
) {
  const config: ListDirectoryOptions = {
    // Default options:
    recursive: false,
    filter: () => true,

    // User options:
    ...options
  };

  const list: Entry[] = [];

  const dirents = await readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const entry: Entry = Object.assign(dirent, {
      path: join(dir, dirent.name)
    });

    if (entry.isDirectory() && config.recursive) {
      list.push(...(await listDirectory(entry.path, config)));
    } else {
      if (config.filter(entry)) {
        list.push(entry);
      }
    }
  }

  return list;
}
