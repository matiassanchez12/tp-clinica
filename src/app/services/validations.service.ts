import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  constructor() {}

  spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces ? { containsSpaces: true } : null;
  }

  validateImages(control: AbstractControl | string): {
    imageFormat: boolean;
  } | null {
    const nameFile: string =
      typeof control === 'string' ? control : control.value;

    if (
      nameFile &&
      [
        '.jpeg',
        '.jpg',
        '.png',
        '.gif',
        '.bmp',
        '.tiff',
        '.tif',
        '.svg',
        '.raw',
        '.webp',
        '.heic',
        '.heif',
        '.psd',
      ].some((format) => nameFile.includes(format))
    ) {
      return null;
    }

    return { imageFormat: true };
  }
}
