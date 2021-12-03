import {addDays} from 'date-fns'
import {Platform} from 'react-native'

export function getPlataformDate(date: Date){
    if(Platform.OS === 'android' || Platform.OS === 'ios'){
        return addDays(date, 1)
    }else{
        return date;
    }
}