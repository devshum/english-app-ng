export function checkSlash(word: any) {
  if(word.includes('/')) {
    return word.split('/')[0];
  }
  return word;
}
