import { readFileSync } from 'fs';
import { join } from 'path';
import { Translation } from '../interfaces';

export const dts = (keys: Translation[]): string => {
  const declareType =
    'type MessageKey =' + keys.map(key => `"${key.key}"`).join('|') + ';\n\n';
  const origPath = join(__dirname, '../../assets/react-intl.d.ts');
  const orig = readFileSync(origPath, { encoding: 'utf-8' });

  return (
    declareType +
    orig.replace(/^\s*id: string;/m, '            id: MessageKey;')
  );
};
