export function validJSON(obj: any) {
    try {
        const helper = JSON.parse(JSON.stringify(obj));
        return true;
    } catch (err) {
        return false;
    }
}

export function validateUser(user: any, resLocal: any): boolean {
    //Check if user has perrmision to alter selected data or if he has admin permissions
    if (user.addedBy.userName == resLocal.user.userName || resLocal.user.admin) {
        return true;
    } else {
        return false;
    }
}
