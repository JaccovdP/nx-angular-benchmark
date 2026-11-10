import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib090Component, summary$ } from '@bench/lib-090';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib090Component, AsyncPipe, JsonPipe],
  template: `<h1>app-000</h1><p>{{ summary$ | async | json }}</p><bench-lib-090 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
