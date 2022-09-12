export default function dateFormater(d) {
  if (d) {
    const date = new Date(d);
    const day = date.toLocaleDateString(undefined, { day: "2-digit" });
    const month = date.toLocaleDateString(undefined, { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  } else {
    return false;
  }
}
