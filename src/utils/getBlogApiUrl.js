// Prepend path slash if needed
function addPathSlash(path) {
  if (path[0] !== '/') {
    return `/${path}`;
  }

  return path;
}

// Funtion to get local or production blog API access URL
export function getBlogApiUrl(apiResourcePath, apiEnv = process.env.NODE_ENV) {
  const apiResourcePathType = typeof apiResourcePath;
  const apiEnvType = typeof apiEnv;

  if (apiResourcePathType !== 'string') {
    throw Error(
      `Param "apiResourcePath" expected string. But got ${apiResourcePathType}`
    );
  }
  if (apiEnvType !== 'string') {
    throw Error(`Param "apiEnv" expected string. But got ${apiEnvType}`);
  }
  if (apiEnv === 'development') {
    return `https://localhost:3000${addPathSlash(apiResourcePath)}`;
  }

  return `https://api.hellowrld.tech${addPathSlash(apiResourcePath)}`;
}
