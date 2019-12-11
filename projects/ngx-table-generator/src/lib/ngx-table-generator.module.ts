import { NgModule } from '@angular/core';
import {
    MatTableModule, MatSortModule, MatButtonModule, MatMenuModule, MatIconModule,
    MatPaginatorModule, MatCheckboxModule, MatCardModule, MatSidenavModule
} from '@angular/material';

import { CommonModule, DatePipe } from '@angular/common';
import { NgxSpanishPipeModule } from 'ngx-spanish-pipe';
import { TableUtils } from './utils';
import { TableGeneratorComponent } from './ngx-table-generator.component';

@NgModule({
    declarations: [
        TableGeneratorComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatCardModule,
        MatSidenavModule,
        NgxSpanishPipeModule
    ],
    exports: [
        TableGeneratorComponent
    ],
    providers: [
        TableUtils,
        DatePipe
    ],
})
export class TableGeneratorModule { }
