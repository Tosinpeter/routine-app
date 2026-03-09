const storage: Record<string, string> = {};

export default {
  setItem: jest.fn((key: string, value: string) => {
    storage[key] = value;
    return Promise.resolve();
  }),
  getItem: jest.fn((key: string) => {
    return Promise.resolve(storage[key] ?? null);
  }),
  removeItem: jest.fn((key: string) => {
    delete storage[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    Object.keys(storage).forEach((k) => delete storage[k]);
    return Promise.resolve();
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(storage))),
  multiGet: jest.fn((keys: string[]) =>
    Promise.resolve(keys.map((key) => [key, storage[key] ?? null]))
  ),
  multiSet: jest.fn((keyValuePairs: [string, string][]) => {
    keyValuePairs.forEach(([key, value]) => {
      storage[key] = value;
    });
    return Promise.resolve();
  }),
  multiRemove: jest.fn((keys: string[]) => {
    keys.forEach((key) => delete storage[key]);
    return Promise.resolve();
  }),
};
