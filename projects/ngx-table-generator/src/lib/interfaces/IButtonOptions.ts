export interface IButtonOptions {
    icon?: string;
    label: string;
    event: string;
    buttonConditions?: IConditionsOption;
}

export interface IConditionsOption {
    value: string;
    condition: any;
}
