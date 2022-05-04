export function validJSON(obj: any) {
    try {
        const helper = JSON.parse(JSON.stringify(obj));
        return true;
    } catch (err) {
        return false;
        
    }
}
