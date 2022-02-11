import { AbstractControl } from '@angular/forms';

export const validateRequiredFields = (...fields: string[]) => {
  return (control: AbstractControl): { [key: string]: any } => {
    return !!control.value && fields.every(f => control.value[f] !== undefined && !!control.value[f]) ? null : { requiredFields: true };
  };
};
