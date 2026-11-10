import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib099Component, summary$ } from '@bench/lib-099';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib099Component, AsyncPipe, JsonPipe],
  template: `<h1>app-009</h1><p>{{ summary$ | async | json }}</p><bench-lib-099 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
