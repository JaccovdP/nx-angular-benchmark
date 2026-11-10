import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib092Component, summary$ } from '@bench/lib-092';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib092Component, AsyncPipe, JsonPipe],
  template: `<h1>app-002</h1><p>{{ summary$ | async | json }}</p><bench-lib-092 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
