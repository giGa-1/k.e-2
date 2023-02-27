

export const replacerComments = (str, find, replace)=>{
    let parts = str.split(find);
    let res = []
    for(let i = 0, result = []; i < parts.length; i++) {
        result.push(parts[i]);
        result.push(replace);
        res = result
    }
    return (
        <>{res}</>
    );
}