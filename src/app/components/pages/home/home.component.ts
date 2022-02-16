import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { DotsInfo } from 'src/app/model/dots/dots-info';
import { DotsInfoShell } from 'src/app/model/dots/dots-info-shell';
import { DotsService } from 'src/app/model/dots/dots.service';
import { Hit } from 'src/app/model/dots/hit';
import { ValidatePositive } from 'src/app/services/validators/validate-positive';
import { TokenStorageService } from '../../../services/auth/token-storage.service';

const DEFAULT_R = 3;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;
  $hits: Subject<Hit[]> = new Subject<Hit[]>();
  pointForm: FormGroup;
  xValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
  rValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
  canvasRadius = DEFAULT_R;
  canvasSize = 600;
  yMax = 3;
  yMin = -5;

  errorMessageSubmitting = '';
  isErrorSubmitting = false;

  istooManyRCanvasError = false;
  

  constructor(private fb: FormBuilder, private token: TokenStorageService, private dotsService: DotsService) {
      this.pointForm = fb.group({
        x: ['', [Validators.required]],
        y: ['0', [Validators.min(this.yMin + 0.00000001), Validators.max(this.yMax - 0.00000001), Validators.required, Validators.maxLength(9)]],
        r: ['', [Validators.required, ValidatePositive]]
      });
   }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      login: this.token.getLogin()
    };
    this.getHits();
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  submitDot(dots: DotsInfoShell) {
    this.istooManyRCanvasError = false;
    
    for (let i in dots.x) {
      for (let j in dots.r) {
            let dot = new DotsInfo(dots.x[i], dots.y, dots.r[j]);
            this.dotsService.addDots(dot).subscribe(
                data => {
                  this.isErrorSubmitting = false;
                  this.getHits();
                },
                error => {
                  this.isErrorSubmitting = true;
                  this.errorMessageSubmitting = error.error.message;
                }
            
          );
      }
    }
    
  }

  submitCanvasDot(dot: DotsInfo) {
    this.istooManyRCanvasError = false;

    let state = this.multiSelectRState();
    if (this.rForm?.invalid) {
      if (this.rForm?.invalid && this.rForm.untouched){
        this.rForm.markAsTouched();
      } 
      return;
    }
    else if (state.state != 1) {
      this.istooManyRCanvasError = true;
      return;
    }
    this.dotsService.addDots(dot).subscribe(
        data => {
          this.isErrorSubmitting = false;
          this.getHits();
        },
        error => {
          this.isErrorSubmitting = true;
          this.errorMessageSubmitting = error.error.message;
        }
    
    );
  }

  getHits() {
    this.dotsService.getDots().subscribe(
      hits => {
        this.$hits.next(hits as Hit[]);
        this.isErrorSubmitting = false;
      },
      error => {

        this.errorMessageSubmitting = error.error.message;
        this.isErrorSubmitting = true;
        
      }
    );
  }

  clearHits() {
    this.istooManyRCanvasError = false;
    this.dotsService.deleteDots().subscribe(
        data => {
          this.$hits.next([]);
          this.isErrorSubmitting = false;
        },
        error => {
          this.errorMessageSubmitting = error.error.message;
          this.isErrorSubmitting = true;
        }
    );
  }

  get xForm() {
    return this.pointForm.get('x');
  }

  get yForm() {
    return this.pointForm.get('y');
  }

  get rForm() {
    return this.pointForm.get('r');
  }

  changeR() {
    this.istooManyRCanvasError = false;

    let state = this.multiSelectRState();
  
    if (this.rForm?.invalid || state.state != 1) {
      this.canvasRadius = DEFAULT_R;
    }
    else {
      this.canvasRadius = state.value;
    }
  }

  multiSelectRState() {
    let counter = 0;
    let value;
    counter += this.rForm?.value.length;
    value = this.rForm?.value[this.rForm?.value.length - 1];
 
    return {
      state: counter,
      value: value
    };
}

}
