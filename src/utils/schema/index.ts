export function createGraphQLEnum(name: string, enumSchema: object) {
  let schemaFields = ``;

  for (const key of Object.keys(enumSchema)) {
    schemaFields += `\n ${key}`;
  }

  return `enum ${name} { ${schemaFields} \n}`;
}
