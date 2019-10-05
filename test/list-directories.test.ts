import { join } from 'path';
import { listDirectory } from '../src/lisdir';

const MOCK_PATH = join(__dirname, 'mock', 'main');

describe('list directories', () => {
  it('should list the directory contents', async () => {
    const contents = await listDirectory(MOCK_PATH);
    const names = contents.map(({ name }) => name);

    expect(names).toMatchSnapshot();
  });

  it('should use the filter function', async () => {
    const contents = await listDirectory(MOCK_PATH, {
      filter: (file) => file.isFile()
    });

    const names = contents.map(({ name }) => name);

    expect(names).toMatchSnapshot();
  });

  it('should be able to list the directory with recursion', async () => {
    const contents = await listDirectory(MOCK_PATH, { recursive: true });
    const names = contents.map(({ name }) => name);

    expect(names).toMatchSnapshot();
  });
});
