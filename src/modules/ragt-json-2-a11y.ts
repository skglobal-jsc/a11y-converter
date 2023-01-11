import { ragtJson2a11y as ragtJson2a11yClient } from '../utils/for-client/converter';
import { ragtJson2a11y as ragtJson2a11yServer } from '../utils/for-server/converter';

const ragtJson2A11Y = (
  env: string = 'server',
  ragtJson,
  metaOpt: MetaOptions = {},
  playerBarOption
) => {
  return env === 'server'
    ? ragtJson2a11yServer(ragtJson, metaOpt)
    : ragtJson2a11yClient(ragtJson, metaOpt, playerBarOption);
};

export default ragtJson2A11Y;
