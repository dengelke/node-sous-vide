const t = function (t) {
  for (var n = t.slice(0, t.length - 1), u = [], l = 0; l < n.length - 1; ) {
    const f = n[l];
    l += 1;

    for (let o = 1; o < f; o += 1) {
      u.push(n[l]);
      l += 1;
    }

    if (f < 255 && l < n.length) {
      u.push(0);
    }
  }

  return u;
};

module.exports = t;
