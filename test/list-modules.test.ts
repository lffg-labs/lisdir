import { join } from 'path';
import { listModules } from '../src/lisdir';

const MOCK_PATH = join(__dirname, 'mock', 'main');

describe('list modules', () => {
  it('should list all the module of a directory', async () => {
    const modules = await listModules(MOCK_PATH);
    expect(modules).toMatchSnapshot();
  });

  it('should list all the modules (recursive)', async () => {
    const modules = await listModules(MOCK_PATH, { recursive: true });
    expect(modules).toMatchSnapshot();
  });

  it('should return only `.tsx` files', async () => {
    const modules = await listModules(MOCK_PATH, {
      extensions: ['.tsx']
    });

    expect(modules).toMatchSnapshot();
  });
});
