export function capitalizeFirstLetter(str:string, locale=navigator.language) {
    return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));
  }
  