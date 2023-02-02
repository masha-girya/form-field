import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './classes/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'form-field';
  reactiveForm: FormGroup = this.formBuilder.group({
        password: [null, Validators.compose([
          Validators.required,
          Validators.minLength(8),
          CustomValidators.patternValidator(/(?=.*?[0-9])(?=.*?[A-Za-z]).+/, { lettersAndNumbers: true }),
          CustomValidators.patternValidator(/(?=.*[^0-9A-Za-z])(?=.*?[A-Za-z]).+/, { lettersAndSymbols: true }),
          CustomValidators.patternValidator(/(?=.*?[0-9])(?=.*[^0-9A-Za-z]).+/, { numbersAndSymbols: true }),
          CustomValidators.patternValidator(/\d/, { onlyNumbers: true }),
          CustomValidators.patternValidator(/[A-Za-z]*$/, { onlyLetters: true }),
          CustomValidators.patternValidator(/\W/, { onlySymbols: true }),
          CustomValidators.patternValidator(/(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*[^0-9A-Za-z]).+/, { lettersNumbersSymbols: true }),
        ])],
     });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  submit() {
    console.log(this.reactiveForm.controls['password'].errors);
    console.log(this.reactiveForm.controls['password'].hasError('lettersNumbersSymbols'))
    console.log(this.reactiveForm.value);
  }
}
