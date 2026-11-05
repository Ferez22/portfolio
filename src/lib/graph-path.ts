/** Shared by the landing agent graph and MDX workflow diagrams. */

/** Orthogonal polyline → rounded SVG path + length (for packet dashes). */
export function rpath(pts: [number, number][], r = 14) {
  const p = pts.filter((q, i) => i === 0 || q[0] !== pts[i - 1][0] || q[1] !== pts[i - 1][1]);
  const c: [number, number][] = [p[0]];
  for (let i = 1; i < p.length - 1; i++) {
    const [a, b, d] = [c[c.length - 1], p[i], p[i + 1]];
    if ((a[0] === b[0] && b[0] === d[0]) || (a[1] === b[1] && b[1] === d[1])) continue;
    c.push(b);
  }
  c.push(p[p.length - 1]);
  let len = 0;
  for (let i = 1; i < c.length; i++) len += Math.hypot(c[i][0] - c[i - 1][0], c[i][1] - c[i - 1][1]);
  let s = `M${c[0][0]} ${c[0][1]}`;
  for (let i = 1; i < c.length - 1; i++) {
    const [a, b, d] = [c[i - 1], c[i], c[i + 1]];
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const l2 = Math.hypot(d[0] - b[0], d[1] - b[1]);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    s += ` L${b[0] - ((b[0] - a[0]) / l1) * rr} ${b[1] - ((b[1] - a[1]) / l1) * rr} Q${b[0]} ${b[1]} ${b[0] + ((d[0] - b[0]) / l2) * rr} ${b[1] + ((d[1] - b[1]) / l2) * rr}`;
  }
  const e = c[c.length - 1];
  return { d: `${s} L${e[0]} ${e[1]}`, len: Math.round(len) };
}
