import { join } from 'path';
import { listModules, ModuleEntry } from '../src/lisdir';

const MOCK_PATH = join(__dirname, 'mock', 'main');

const getData = (entries: ModuleEntry[]) =>
  entries.map((entry) => ({ name: entry.name, module: entry.module }));

describe('list modules', () => {
  it('should list all the module of a directory', async () => {
    const modules = getData(await listModules(MOCK_PATH));
    expect(modules).toMatchSnapshot();
  });

  it('should list all the modules (recursive)', async () => {
    const modules = getData(await listModules(MOCK_PATH, { recursive: true }));
    expect(modules).toMatchSnapshot();
  });

  it('should return only `.tsx` files', async () => {
    const modules = getData(
      await listModules(MOCK_PATH, {
        extensions: ['.tsx']
      })
    );

    expect(modules).toMatchSnapshot();
  });
});
