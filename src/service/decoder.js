const Entities = require('html-entities').XmlEntities;

export default function decoder(str) {
  let stringDecoded;
  const partExists = str.substring(
    str.lastIndexOf('&'),
    str.lastIndexOf(';') + 1,
  );
  if (partExists !== undefined) {
    const stringArray = str.split(' ');
    stringArray.forEach((value) => {
      const part = value.substring(
        value.lastIndexOf('&'),
        value.lastIndexOf(';') + 1,
      );
      if (part) {
        const entities = new Entities();
        const valueDecoded = entities.decode(part);
        const valueReplaced = value.replace(part, valueDecoded);
        stringArray[stringArray.indexOf(value)] = valueReplaced;
        stringDecoded = stringArray.join(' ');
      }
    });
  }
  return stringDecoded || str;
}
