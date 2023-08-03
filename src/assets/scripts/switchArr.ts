import { Dispatch } from "react";




export const switchArr = (setStateArr: React.Dispatch<React.SetStateAction<any[]>>, newValue: any,  id:string = 'value', value:string = 'checked') => {
    setStateArr(stateArr => stateArr.map(stateValue => {
        if(stateValue[id] == newValue[id]) {
            stateValue[value] = true;
        }  else {
            stateValue.checked = false
        }
        return stateValue
    }))
}
