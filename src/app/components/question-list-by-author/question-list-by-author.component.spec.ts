import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListByAuthorComponent } from './question-list-by-author.component';

describe('QuestionListByAuthorComponent', () => {
  let component: QuestionListByAuthorComponent;
  let fixture: ComponentFixture<QuestionListByAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListByAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
