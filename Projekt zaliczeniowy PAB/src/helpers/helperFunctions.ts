export function validJSON(obj: any) {
    try {
        const helper = JSON.parse(JSON.stringify(obj));
        return true;
    } catch (err) {
        return false;
        
    }
}
//TODO CREATE FUNCTION TO CHECK IF OBJ WITH CERTAIN ID EXISTS (id,model) np (4,threadModel)