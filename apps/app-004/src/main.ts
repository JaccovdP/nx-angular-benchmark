import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib094Component, summary$ } from '@bench/lib-094';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib094Component, AsyncPipe, JsonPipe],
  template: `<h1>app-004</h1><p>{{ summary$ | async | json }}</p><bench-lib-094 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
