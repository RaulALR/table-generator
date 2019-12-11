import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TableUtils {
    public deleteInstance(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (value === array[i]) {
                array.splice(i, 1);
                break;
            }
        }
        return array;
    }

    public chargeMultiCheckArray(data, arrayData, id) {
        const array = [];
        for (let i = 0; i < data.length; i++) {
            arrayData.map((item) => {
                if (item === data[i][id]) {
                    array[i] = true;
                }
            });
        }
        return array;
    }

    public transformToNumber(val, decimals) {
        if (val !== undefined && val !== null) {
            decimals = decimals || decimals === 0 ? decimals : 2;
            if (isNaN(val)) {
                return val;
            } else {
                val = val.toLocaleString('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
                if (val.includes(',')) {
                    val = this.covertMillarWithDecimalToSpanish(val);
                } else {
                    val = this.convertMillarToSpanish(val);
                }
                return val;
            }
        } else {
            return '';
        }
    }

    private convertMillarToSpanish(val: any) {
        const splitVal = val.split('');
        if (splitVal.length === 4) {
            splitVal.splice(1, 0, '.');
        }
        val = '';
        splitVal.forEach(element => {
            val += element;
        });
        return val;
    }

    private covertMillarWithDecimalToSpanish(val: any) {
        const splitVal = val.split(',');
        if (splitVal[0].length === 4) {
            let naturalNum = splitVal[0];
            splitVal[0] = '';
            naturalNum = naturalNum.split('');
            naturalNum.splice(1, 0, '.');
            naturalNum.forEach(element => {
                splitVal[0] += element;
            });
            val = `${splitVal[0]},${splitVal[1]}`;
        }
        return val;
    }

    public copyArray(item) {
        let result = null;
        if (!item) {
            return result;
        }
        if (Array.isArray(item)) {
            result = [];
            item.forEach((element) => {
                result.push(this.copyArray(element));
            });
        } else if (item instanceof Object && !(item instanceof Function)) {
            result = {};
            for (const key in item) {
                if (key) {
                    result[key] = this.copyArray(item[key]);
                }
            }
        }
        return result || item;
    }

    public chargeShowMulticheck(conditionalMulticheck, keysMulticheck, valueMulticheckToCompare, data) {
        const showArray = [];
        data.forEach((element, index) => {
            showArray[index] = true;
        });
        if (conditionalMulticheck && keysMulticheck && valueMulticheckToCompare) {
            for (let i = 0; i < keysMulticheck.length; i++) {
                data.forEach((element, index) => {
                    if (!this.suboperationConditional(conditionalMulticheck[i], valueMulticheckToCompare[i], element[keysMulticheck[i]])
                        && showArray[index]) {
                        showArray[index] = false;
                    }
                });
            }

        }
        return showArray;
    }

    public suboperationConditional(conditional, valueToCompare, value) {
        switch (conditional) {
            case '<':
                return parseFloat(value) < parseFloat(valueToCompare);
            case '>':
                return parseFloat(value) > parseFloat(valueToCompare);
            case '===':
                return (value || value === 0 || value === false ? value.toString() : value) ===
                    (valueToCompare || valueToCompare === 0 || valueToCompare === false ? valueToCompare.toString() : valueToCompare);
            case '>=':
                return value >= valueToCompare;
            case '<=':
                return value <= valueToCompare;
            case '<day':
                return (new Date(value).setHours(0) - new Date().setHours(0, 0, 0, 0)) < 0;
            case '>day':
                return (new Date(value).setHours(0) - new Date().setHours(0, 0, 0, 0)) > 0;
        }
    }
}
