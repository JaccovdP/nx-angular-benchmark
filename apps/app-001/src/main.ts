import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib091Component, summary$ } from '@bench/lib-091';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib091Component, AsyncPipe, JsonPipe],
  template: `<h1>app-001</h1><p>{{ summary$ | async | json }}</p><bench-lib-091 />`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
