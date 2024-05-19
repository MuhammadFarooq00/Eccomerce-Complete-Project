import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type resType =  {
    data: MessageResponse;
} | {
    error: FetchBaseQueryError | SerializedError;
}

export const responseToast = (res: resType, navigate: NavigateFunction | null ,url:string) => {
    if("data" in res){
        toast.success(res.data.message);
        if(navigate) navigate(url)
    }
else{
    const err = res.error as FetchBaseQueryError;
    const messageResponse = err.data as MessageResponse;
    toast.error(messageResponse.message);
}
}


export const getLastmonth = ()=>{
    const currDate = moment();
    currDate.date(1);

    const get6Months: string[] = [];
    const get12Months: string[] = [];

    for(let i=0; i<6; i++){
        const monthDate = currDate.clone().subtract(i,"months");
        const monthname = monthDate.format("MMMM");
        get6Months.unshift(monthname)  
    }
    for(let i=0; i<12; i++){
        const monthDate = currDate.clone().subtract(i,"months");
        const monthname = monthDate.format("MMMM");
        get12Months.unshift(monthname)  
    }

    return {
        get6Months,
        get12Months,
    }
}