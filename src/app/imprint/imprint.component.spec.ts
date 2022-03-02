import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';


import { ImprintComponent } from './imprint.component';

describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprintComponent ],
      imports: [
        MatCardModule,
        LayoutModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
