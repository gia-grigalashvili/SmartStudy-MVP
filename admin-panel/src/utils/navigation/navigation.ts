
export const normalize = (p?: string) => (p ? p.replace(/^\/|\/$/g, "") : "");

export const pathMatches = (current: string, candidate?: string) => {
  if (!candidate) return false;
  return current === candidate || current.startsWith(candidate + "/");
};

export const arraysEqual = (a: string[], b: string[]) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

