import { join } from 'path';
import { listDirectory, Entry } from '../src/lisdir';

const MOCK_PATH = join(__dirname, 'mock', 'main');

const getData = (entries: Entry[]) => entries.map((entry) => entry.name);

describe('list directory', () => {
  it('should list the directory contents', async () => {
    const names = getData(await listDirectory(MOCK_PATH));
    expect(names).toMatchSnapshot();
  });

  it('should use the filter function', async () => {
    const names = getData(
      await listDirectory(MOCK_PATH, {
        filter: (file) => file.isFile()
      })
    );

    expect(names).toMatchSnapshot();
  });

  it('should be able to list the directory with recursion', async () => {
    const names = getData(await listDirectory(MOCK_PATH, { recursive: true }));
    expect(names).toMatchSnapshot();
  });
});
