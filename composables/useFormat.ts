export default function useFormat() {
  function formatDateVN(isoString: string) {
    const date = new Date(isoString);

    // +7 giờ cho Việt Nam
    date.setHours(date.getHours() + 7);

    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }
  return {
    formatDateVN
  };

}
