export const parseToken = () => {
  const url = window.location.href;
  const params = url.split('#access_token=');
  const validToken = params.filter((param) => param.includes('Bearer'));

  return validToken.pop();
};

export default parseToken;
