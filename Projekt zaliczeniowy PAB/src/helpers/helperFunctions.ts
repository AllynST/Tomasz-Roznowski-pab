import { threadModel } from "../dataModels/schemas";
import date from "date-and-time";

export function validateUser(user: any, resLocal: any): boolean {
    //Check if user has perrmision to alter selected data or if he has admin permissions
    if (
        user.addedBy.userName == resLocal.user.userName ||
        resLocal.user.admin
    ) {
        return true;
    } else {
        return false;
    }
}

export async function archiveRoutine() {   
    const unarchived = await threadModel.find({
        $and: [
            {
                posts:{$not: {$size: 0}} 
            },
            { archived: false },
        ],
    });    
    unarchived.forEach((item)=>{
        if (archiveEligibility(item.posts[item.posts.length-1].createdAt)) {
            item.archived = true;
            item.save();
        }
    })  
}

function archiveEligibility(InputDate: Date): Boolean {
   
    const today  = new Date(Date.now());
    
    if (date.addDays(InputDate, 7).getTime() <today.getTime()) {
        
        return true;
    }
    return false;
}
