import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent {
  @Input() reactiveForm!: FormGroup;
  first: string = 'first';
  second: string = 'second';
  third: string = 'third';

  getSectionClass(value: string) {
    const easy = this.reactiveForm.controls['password'].hasError('onlyLetters')
    || this.reactiveForm.controls['password'].hasError('onlyNumbers')
    || this.reactiveForm.controls['password'].hasError('onlyLetters');

    const middle = this.reactiveForm.controls['password'].hasError('lettersAndNumbers')
    || this.reactiveForm.controls['password'].hasError('lettersAndSymbols')
    || this.reactiveForm.controls['password'].hasError('numbersAndSymbols');

    if (this.reactiveForm.controls['password'].hasError('minlength')) {
      return 'sections__box--easy';
    }

    if (value === 'first') {
      if (easy) {
      return 'sections__box--easy';
      }
    }

    if (value === 'first' || value === 'second') {
      if (middle && !easy) {
      return 'sections__box--medium';
      }
    }

    if (!this.reactiveForm.controls['password'].hasError('lettersNumbersSymbols')
      && !middle
      && !easy
      && this.reactiveForm.value.password
    ) {
      return 'sections__box--strong';
    }

    return 'sections__box';
  }
}
