import { newVerb } from './../interfaces/newVerb.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchVerb'
})

export class SearchVerbkPipe implements PipeTransform {

  transform(verbs: newVerb[], searchValue: string): newVerb[] {
    if(!verbs || !searchValue) {
      return verbs;
    }

    return verbs.filter(verb =>
      verb.infinitive.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      verb.past.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      verb.pastParticiple.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }
}
