import {FormControl, ValidationErrors} from "@angular/forms";

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
}
