const omit = <T>(obj: T, property: keyof T | (keyof T)[]) => {
  if (Array.isArray(property)) {
    const entries = Object.entries(obj).filter((item) => {
      const [key] = item;
      return !property.includes(key as keyof T);
    });

    return Object.fromEntries(entries);
  }

  const { [property]: _unused, ...rest } = obj;

  return rest;
};

export default omit;
