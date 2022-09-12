import identicon from "identicon";
function generateAvatar(seed) {
  let source = "";
  identicon.generate({ id: seed, size: 45 }, function (err, buffer) {
    if (err) throw err;
    source = buffer;
  });

  return source;
}

export default generateAvatar;
