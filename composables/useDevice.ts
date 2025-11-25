export const useDevice = () => {
  const ua = process.server
    ? useRequestHeaders()["user-agent"] || ""
    : navigator.userAgent;

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(ua);

  return {
    isMobile
  };
};
