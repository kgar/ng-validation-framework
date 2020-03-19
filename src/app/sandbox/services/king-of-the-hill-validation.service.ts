import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KingOfTheHillValidationService {
  validate(name: string, animationType: string): Observable<boolean> {
    const containsInvalidCombination =
      name?.toLocaleLowerCase()?.trim() === 'king of the hill' && animationType !== 'anime';
    const isValid = !containsInvalidCombination;
    return of(isValid).pipe(delay(2500));
  }
}
