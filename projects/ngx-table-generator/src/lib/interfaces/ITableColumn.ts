export interface ITableColumn {
    isCheckbox?: boolean;
    label: string;
    name: string;
    showWhen?: string;
    sort?: boolean;
    data?: boolean;
    multiCheck?: IMultiCheckOption;
    suboperationData?: ISuboperationData[];
    objectInstances?: string[];
    isShares?: boolean;
    isCurrency?: boolean;
}

export interface ISuboperationData {
    label: string;
    conditional?: string[];
    valueToCompare?: string[];
    itemToCompare?: string[];
}

export interface IMultiCheckOption {
    id: string;
    buttonLabel: string;
    multiMinSelected?: string;
    conditionalMulticheck?: string[];
    keysMulticheck?: string[];
    valueMulticheckToCompare?: any[];
}
