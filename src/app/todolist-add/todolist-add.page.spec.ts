import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodolistAddPage } from './todolist-add.page';

describe('TodolistAddPage', () => {
  let component: TodolistAddPage;
  let fixture: ComponentFixture<TodolistAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodolistAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
