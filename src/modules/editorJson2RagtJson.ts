import { editorJson2RagtJson as editorJson2RagtJsonClient } from '../utils/for-client/converter';
import { editorJson2RagtJson as editorJson2RagtJsonServer } from '../utils/for-server/converter';

const editorJson2RagtJson = ({ env = 'server', editorJson, lang = 'en' }) => {
  return env === 'server'
    ? editorJson2RagtJsonServer(editorJson, lang)
    : editorJson2RagtJsonClient(editorJson, lang);
};

export default editorJson2RagtJson;
