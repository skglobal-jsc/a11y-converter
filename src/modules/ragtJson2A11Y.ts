const ragtJson2A11Y = ({
  env = 'server',
  ragtJson,
  metaOpt = {},
  playerBarOption,
}) => {
  if (env === 'server') {
    return import('../utils/for-server/converter.js').then(
      ({ ragtJson2A11Y }) => ragtJson2A11Y(ragtJson, metaOpt)
    );
  }
  return import('../utils/for-client/converter.js').then(({ ragtJson2A11Y }) =>
    ragtJson2A11Y(ragtJson, metaOpt, playerBarOption)
  );
};

export default ragtJson2A11Y;
