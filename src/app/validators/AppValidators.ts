import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class AppValidators {
  static notOnlyWhitespace(control:FormControl):ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      return {
        'Whitespace': true
      }
    } else {
      return null
    }
  }
  static checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    // @ts-ignore
    const pass = group.get('newPassword').value;
    // @ts-ignore
    const confirmPass = group.get('newPasswordConfirm').value
    return pass === confirmPass ? null : { notSame: true }
  }

}
