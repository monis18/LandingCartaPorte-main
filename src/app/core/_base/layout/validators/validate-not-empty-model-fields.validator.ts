import { AbstractControl } from '@angular/forms';

export const validateNotEmptyModelFields = (...fields: string[]) => {
  return (control: AbstractControl): { [key: string]: any } => {
    return !!control.value &&
      fields.every(field => control.value[field] !== undefined && control.value[field] && control.value[field] !== '')
      ? null : { modelId: true };
  };
};
