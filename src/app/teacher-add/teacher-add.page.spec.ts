import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddPage } from './teacher-add.page';

describe('TeacherAddPage', () => {
  let component: TeacherAddPage;
  let fixture: ComponentFixture<TeacherAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
