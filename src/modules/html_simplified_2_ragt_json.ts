import htmlSimplified2EditorJson from './html_simplified_2_editor_json';
import { editorJson2RagtJson } from '../utils/converter';

const htmlSimplified2RagtJson = (htmlSimplified: string) => {
  // Step1: Convert html simplified to editor json
  const editorJson = htmlSimplified2EditorJson(htmlSimplified);

  // Step2: Convert editor json to ragt json
  const ragtJson = editorJson2RagtJson(editorJson);

  return ragtJson;
};

export default htmlSimplified2RagtJson;