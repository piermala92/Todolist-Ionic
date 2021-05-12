import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodolistEditPage } from './todolist-edit.page';

describe('TodolistEditPage', () => {
  let component: TodolistEditPage;
  let fixture: ComponentFixture<TodolistEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodolistEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
