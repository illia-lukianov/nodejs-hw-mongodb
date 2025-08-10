function parseContactType(value) {
  const allowed = ['work', 'home', 'personal'];
  if (allowed.includes(value)) {
    return value;
  }
  return undefined;
}

export default function parseFilterParams(query) {
  const { contactType } = query;
  return {
    contactType: parseContactType(contactType),
  };
}