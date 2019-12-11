# Table generator
## Introduction

Install the generator: 

```sh
    npm install --save ngx-table-generator
```

This component generates a table with options such as suboperations, buttons, multicheck, receiving a configuration given by the developer.

## Table generator

The module thtat contains the currency mask is this: `TableGenerator`. And it is used as follows (Inputs that appear in the example are mandatory): 

```html
<ngx-table-generator [dataSource]="dataSource" [dataColumnsTable]="dataColumnsTable" [sortOptions]="sortOption" [paginatorOption]="paginatorOption"></ngx-table-generator>
```

#### Inputs

| Input  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| dataSource | MatTableDataSource | Basic object with dataSource structure | mandatory |
| dataColumnsTable | ITableCell[] | Array formed by objects containing the configuration of each column of the table | mandatory |
| sortOptions | ISortOption | Contains the basic sorting configuration  | mandatory |
| paginatorOption | IPaginatorOptions | Contains the basic configuration of pagination  | mandatory |
| disabledMulticheck | boolean | Checks if the multicheck button is disabled | optional |
| footerData | IFooterData[] | Array containing object with the name and value of the fields to be displayed in the footer | optional |
| classMap | string[] | Array with the name of the css classes to be added to the table | optional |
| buttonOptions | IButtonOptions[] | Array containing the configuration objects with the buttons to add  | optional |


#### Output

| Output  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| onPageEvent | EventEmitter | Emits an event with each action on the pagination | optional |
| buttonEvent | EventEmitter | Emits an event that contains the button you clicked | optional |
| rowClick | EventEmitter | Emits an event with the column information that is clicked  | optional |
| sortChange | EventEmitter | Emits an event with each action on the sorter | optional |
| suboperationAction | EventEmitter | Emits an event with the event that has been executed | optional |
| trashAction | EventEmitter | Emits an event when you click on the delete button | optional |
| multiCheckAction | EventEmitter | Emits an event with an array with the selected rows | optional |


## Interfaces

#### ITableColumn

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| isCheckbox | boolean | Indicates if the cell will be checkbox | optional |
| label | string | Name of the header | mandatory |
| name | string | Name of the column. (You must talk to the backend to name the name of the instance to receive in the json equal to the order parameter of that column, otherwise it will not work). The word `btnSuboperations` is reserved, which if placed in the first object of the array activates the suboperations | mandatory |
| showWhen | string | Indicates whether the cell in that column should be visible  | optional |
| sort | boolean | Indicates if the column is sortable  | optional |
| multiCheck | IMultiCheckOption | Multicheck options | optional |
| suboperationData | ISuboperationData[] | Suboperation options  | optional |
| objectInstances | string[] | Array with the names of the instances to go through | optional |
| isShares | boolean | Indicator if it is an shares (4 decimals) | optional |
| isCurrency | boolean | Indicator if it is an currency (2 decimals)  | optional |

#### ISuboperationData

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| label | string | Name of suboperation | mandatory |
| conditional | string[] | Array indicating which logical comparison to use ('<', '>', '===', '>=', '<=', '<day', '>day') | optional |
| valueToCompare | string[] | Array with the value to compare | optional |
| itemToCompare | string[] | Array with the name of the instance to compare | optional |

#### IMultiCheckOption

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| id | string | Name of the instance that will fill the multicheck array | mandatory |
| buttonLabel | string | Multicheck button name | mandatory |
| multiMinSelected | string | Selectable minimum check | optional |
| conditionalMulticheck | string[] | Array indicating which logical comparison to use ('<', '>', '===', '>=', '<=', '<day', '>day') | optional |
| keysMulticheck | string[] | Array with the name of the instance to compare | optional |
| valueMulticheckToCompare | any[] | Array with the value to compare | optional |

#### ISortOption

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| activeSort | string | Indicates if the order is active | optional |
| direction | string | Indicates default direction | optional |

#### IPaginatorOptions

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| resultsLength | string | Result size per page | mandatory |
| limit | string | Limit of rows per page | optional |

#### IFooterData

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| name | string | Name of footerdata | mandatory |
| value | number | Value of footerdata | optional |

#### IButtonOptions

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| icon | string | name of icon to be displayed (material icon) | optional |
| label | string | Name of button | mandatory |
| event | string | Name of event | mandatory |
| buttonConditions | IConditionsOption | Button options | optional |

#### IConditionsOption

| Instance  | Type  | Usage  | Mandatory |
| ------------ | ------------ | ------------ | ------------ |
| value | string | Value to compare  | optional |
| condition | string | Array indicating which logical comparison to use ('<', '>', '===', '>=', '<=', '<day', '>day') | mandatory |


## Example

#### Config table file

```typescript
export namespace TableGlobalOrderView {
    export const dataColumnsTable = [
        {
            name: 'name',
            multiCheck: {
                id: 'multiCheck',
                buttonLabel: 'multiCheck',
                multiMinSelected: '-1',
                conditionalMulticheck: ['===',],
                keysMulticheck: ['test'],
                valueMulticheckToCompare: ['0']
            },
            suboperationData: [
                {
                    label: 'suboperationData1',
                    conditional: ['==='],
                    valueToCompare: ['0'],
                    itemToCompare: ['suboperationData1']
                },
                {
                    label: 'suboperationData2',
                    conditional: ['==='],
                    valueToCompare: ['true'],
                    itemToCompare: ['suboperationData2']
                },
                {
                    label: 'suboperationData3',
                    conditional: ['==='],
                    valueToCompare: ['N'],
                    itemToCompare: ['suboperationData3']
                }
            ],
        },
        {
            label: 'label1',
            name: 'name1',
            objectInstances: ['name1', 'name12'],
            sort: true
        },
        {
            label: 'label2',
            name: 'name2',
            date: true,
            sort: true
        },
        {
            label: 'label3',
            name: 'name3',
            sort: true
        },
        {
            label: 'label4',
            name: 'label4',
            objectToCompare: [{ id: 'N', label: 'No' }, { id: 'Y', label: 'Yes' }],
            sort: true
        },
        {
            label: 'label5',
            name: 'mame5',
            sort: true
        },
        {
            label: 'label6',
            name: 'name6',
            isShares: true,
            sort: true
        },
        {
            label: 'label7',
            name: 'name7',
            isShares: true,
            sort: true
        },
        {
            label: 'label8',
            name: 'name8',
            isCurrency: true,
            sort: true
        }
    ];
    export const paginatorOption = {
        resultsLength: 0,
        limit: 20,
    };

    export const sortOption = {
        activeSort: 'customerId',
        direction: 'asc'
    };

    export const buttonOptions = [
        { icon: 'note_add', label: 'New', event: 'new' },
        { icon: 'note_add', label: 'Delete', event: 'delete', buttonConditions: { value: '', condition: 4 } }
    ];
}

```