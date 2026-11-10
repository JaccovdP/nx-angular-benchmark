import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib095Component, summary$ } from '@bench/lib-095';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib095Component, AsyncPipe, JsonPipe],
  template: `<h1>app-005</h1><p>{{ summary$ | async | json }}</p><bench-lib-095 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
