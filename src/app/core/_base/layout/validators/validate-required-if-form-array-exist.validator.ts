import { FormArray, FormControl } from '@angular/forms';

export const validateRequiredIfFormArrayExist = (arrayFormField: string) => {

  let thisControl: FormControl;
  let formArray: FormArray;

  return (control: FormControl) => {

    if (!control.parent) {
      return null;
    }

    if (!thisControl) {
      thisControl = control;
      formArray = control.parent.get(arrayFormField) as FormArray;
      if (!formArray) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
    }

    if (!formArray) {
      return null;
    }

    if (formArray.length > 0 && !thisControl.value) {
      return { requiredIfFormArrayExist: true };
    }

    return null;

  };

};
