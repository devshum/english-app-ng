export function checkSlash(word: string) {
  if(word.includes('/')) {
    return word.split('/')[0];
  }
  return word;
}
