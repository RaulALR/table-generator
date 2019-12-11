import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TableUtils } from './utils';
import { ITableColumn } from './interfaces/ITableColumn';
import { ISortOption } from './interfaces/ISortOptions';
import { IPaginatorOptions } from './interfaces/IPaginatorOptions';
import { IFooterData } from './interfaces/IFooterData';
import { IButtonOptions } from './interfaces/IButtonOptions';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-table-generator',
    templateUrl: './ngx-table-generator.component.html',
})

export class TableGeneratorComponent implements OnInit, AfterViewInit, OnDestroy {
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onPageEvent = new EventEmitter<any>();
    @Output() buttonEvent = new EventEmitter<any>();
    @Output() rowClick = new EventEmitter<any>();
    @Output() sortChange = new EventEmitter<any>();
    @Output() suboperationAction = new EventEmitter<any>();
    @Output() trashAction = new EventEmitter<any>();
    @Output() multiCheckAction = new EventEmitter<any>();

    @Input() disabledMulticheck = false;
    @Input() footerData: IFooterData; // [{name: 'string', value: 'string'}];

    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    private classList: string;
    public dataColumns: ITableColumn[];
    public displayedColumns: string[] = [];
    public dataSource: any;
    public sortOptionData: ISortOption = null;
    private suboperationsData: any = null;
    private isSub = false;
    public buttonOptionsData: IButtonOptions[] = null;
    public paginatorOptionData: IPaginatorOptions = null;
    public trashOption;
    public multiCheck;
    // Button controls
    public showNewButton = false;
    public showMultiCheckButton: boolean;
    public multiCheckArray = [];
    public multiCheckArrayData = [];
    public multiCheckId: string;
    public dataSourceConnect: Subscription;
    public multiNameToCheck;
    public multiNameValue;
    public decimalNum = 2;
    public sharesNum = 0;
    public suboperationsGeneratedData = [];
    public showSuboperationsGeneratedData = [];
    public multiMinSelected: any = -1;
    public showMulticheck = [];
    public conditionalMulticheck;
    public keysMulticheck;
    public valueMulticheckToCompare;

    constructor(
        public tableUtils: TableUtils,
        public datePipe: DatePipe) {
    }

    @Input('classMap')
    public set classMap(classMap: any) {
        classMap.map((item: any) => {
            this.classList += `${item} `;
        });
    }

    @Input('dataSource')
    public set dataSourceMap(dataSource: any) {
        this.dataSource = dataSource;
    }

    @Input('dataColumnsTable')
    public set columns(columns: ITableColumn[]) {
        this.isSub = this.isSuboperation(columns);
        this.dataColumns = columns;
        this.displayedColumns = this.generateDisplay(columns);
    }

    @Input('sortOptions')
    public set sortOptions(value: ISortOption) {
        this.sort = new MatSort();
        this.sortOptionData = {
            activeSort: value.activeSort || this.dataColumns[0].name,
            direction: value.direction || 'asc'
        };
    }

    @Input('paginatorOption')
    public set paginatorOption(value: IPaginatorOptions) {
        this.paginatorOptionData = {
            resultsLength: value.resultsLength || 0,
            limit: value.limit ? value.limit : 20
        };
    }

    @Input('buttonOptions')
    public set buttonOptions(value: IButtonOptions[]) {
        this.buttonOptionsData = value;
    }

    generateDisplay(data: ITableColumn[]) {
        const array = [];
        data.forEach((item: { name: string; }) => {
            array.push(item.name);
        });
        return array;
    }
    // tslint:disable-next-line:cognitive-complexity
    isSuboperation(columns) {
        if (columns && columns[0].name === 'btnSuboperations') {
            if (columns[0].suboperationData) {
                this.suboperationsData = columns[0].suboperationData;
            }
            if (columns[0].trashOption) {
                this.trashOption = true;
            }
            if (columns[0].multiCheck) {
                this.multiCheck = columns[0].multiCheck;
                this.multiCheckId = columns[0].multiCheck.id;
                this.multiNameToCheck = columns[0].multiCheck && columns[0].multiCheck.multiNameToCheck ?
                    columns[0].multiCheck.multiNameToCheck : null;
                this.multiNameValue = columns[0].multiCheck && columns[0].multiCheck.multiNameValue ?
                    columns[0].multiCheck.multiNameValue : null;
                this.multiMinSelected = columns[0].multiCheck && columns[0].multiCheck.multiMinSelected ?
                    columns[0].multiCheck.multiMinSelected : 0;
                this.conditionalMulticheck = columns[0].multiCheck && columns[0].multiCheck.conditionalMulticheck ?
                    columns[0].multiCheck.conditionalMulticheck : 0;
                this.keysMulticheck = columns[0].multiCheck && columns[0].multiCheck.keysMulticheck ?
                    columns[0].multiCheck.keysMulticheck : 0;
                this.valueMulticheckToCompare = columns[0].multiCheck && columns[0].multiCheck.valueMulticheckToCompare ?
                    columns[0].multiCheck.valueMulticheckToCompare : 0;
            }
            return true;
        }
        return false;
    }

    ngOnInit() { }

    matSortChange($event) {
        this.sortChange.emit($event);
    }

    pageEvent(event) {
        this.multiCheckArray = [];
        this.onPageEvent.emit(event);
    }

    onMultiCheckAction() {
        this.multiCheckAction.emit(this.multiCheckArrayData);
        this.multiCheckArrayData = [];
        this.multiCheckArray = [];
    }

    suboperationClicked(action, row) {
        const data = {
            action: action,
            row: row
        };
        this.suboperationAction.emit(data);
    }

    trashOptionAction(row) {
        this.trashAction.emit(row);
    }
    checkSort(sort) {
        if (sort) {
            return sort;
        } else {
            this.sort = new MatSort();
            this.sort.direction = 'asc';
            this.sort.active = this.sortOptionData.activeSort;
            return this.sort;
        }
    }

    public getObjectToCompare(elem, item) {
        for (let i = 0; i < item.objectToCompare.length; i++) {
            if (item.objectToCompare[i].id === elem[item.name]) {
                return this.parseToDecimal(item.objectToCompare[i].label, item);
            }
        }
    }
    ngAfterViewInit() {
        this.sortChange.emit(this.checkSort(this.sort));
        this.onPageEvent.emit(this.paginator);
        if (this.dataSource.connect) {
            this.dataSourceConnect = this.dataSource.connect().subscribe((data) => {
                if (this.suboperationsData) {
                    this.showSuboperationData(data);
                }
                if (data && this.multiCheck) {
                    this.showMultiCheckButton = true;
                    this.multiCheckArray = this.tableUtils.chargeMultiCheckArray(this.dataSource.data,
                        this.multiCheckArrayData, this.multiCheck.id);
                    if (data.length > 0) {
                        this.showMulticheck = this.tableUtils.chargeShowMulticheck(this.conditionalMulticheck,
                            this.keysMulticheck, this.valueMulticheckToCompare, this.dataSource.data);
                    }
                }
            });
        }

    }

    onRowClick(row, index, event) {
        if (this.multiCheck && event && event.target && event.target.getElementsByTagName('mat-checkbox') &&
            event.target.getElementsByTagName('mat-checkbox').length > 0) {
            if (this.multiCheckArray[index]) {
                this.multiCheckArray[index] = false;
                this.tableUtils.deleteInstance(this.multiCheckArrayData, row[this.multiCheckId]);
            } else {
                this.multiCheckArray[index] = true;
                this.multiCheckArrayData.push(row[this.multiCheckId]);
            }
        } else {
            this.rowClick.emit(row);
        }
    }

    getInstaceName(elem, item) {
        let valueToShow = '';
        if (item.objectInstances) {
            for (let i = 0; i < item.objectInstances.length; i++) {
                if (elem[item.objectInstances[i]]) {
                    valueToShow = elem[item.objectInstances[i]];
                    elem = valueToShow;
                }
            }
            return this.parseToDecimal(valueToShow, item);
        } else {
            if (item.date) {
                return this.datePipe.transform(elem[item.name], 'dd/MM/yyyy');
            }

            return this.parseToDecimal(elem[item.name], item);
        }
    }

    parseToDecimal(value, item) {
        if (item.isShares) {
            return this.tableUtils.transformToNumber(value, this.sharesNum);
        }
        if (item.isCurrency) {
            return this.tableUtils.transformToNumber(value, this.decimalNum);
        }
        return value;
    }

    // tslint:disable-next-line:cognitive-complexity
    public showSuboperationData(data) {
        if (Array.isArray(data) && data.length > 0) {
            data.forEach((item, index) => {
                this.suboperationsGeneratedData[index] = this.tableUtils.copyArray(this.suboperationsData);
                this.checkConditionalOptions(index, item);
                this.showSuboperationsGeneratedData[index] = this.suboperationsGeneratedData[index].length > 0 ? true : false;
            });
        }
    }

    // tslint:disable-next-line:cognitive-complexity
    public checkConditionalOptions(index, item) {
        this.suboperationsGeneratedData[index].forEach((instance, i) => {
            if (instance.conditional && instance.valueToCompare && instance.itemToCompare) {
                if (typeof instance.conditional === 'string') {
                    if (!this.tableUtils.suboperationConditional(instance.conditional, instance.valueToCompare,
                        item[instance.itemToCompare])) {
                        return this.spliceSuboperation(index, i, item);
                    }
                } else {
                    instance.conditional.forEach((elem, j) => {
                        if (!this.tableUtils.suboperationConditional(elem, instance.valueToCompare[j], item[instance.itemToCompare[j]])) {
                            return this.spliceSuboperation(index, i, item);
                        }
                    });
                }
            }
        });
    }

    public getButtonCondition(item) {
        if (item.buttonConditions) {
            if (item.buttonConditions.value && item.buttonConditions.condition
                && item.buttonConditions.value === item.buttonConditions.condition) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    private spliceSuboperation(index: any, i: number, item: any) {
        this.suboperationsGeneratedData[index].splice(i, 1);
        return this.checkConditionalOptions(index, item);
    }

    public isMulticheckDisabled() {
        if (this.disabledMulticheck) {
            return true;
        } else {
            const minSelected = this.multiMinSelected && typeof this.multiMinSelected === 'string'
                ? parseFloat(this.multiMinSelected) : this.multiMinSelected;
            return this.multiCheckArrayData.length <= minSelected;
        }
    }
    ngOnDestroy(): void {
        if (this.dataSourceConnect) {
            this.dataSourceConnect.unsubscribe();
            this.dataSource.disconnect();
        }
    }
}
