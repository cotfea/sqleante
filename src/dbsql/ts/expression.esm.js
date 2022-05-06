// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const ops = {
    eq: '=',
    ne: '<>',
    lt: '<',
    lte: '<=',
    gt: '>',
    gte: '>=',
    like: 'LIKE',
    glob: 'GLOB',
    and: 'AND',
    or: 'OR',
    in: 'IN',
    nin: 'NOT IN',
    exist: 'EXIST',
    nexist: 'NOT EXIST',
    between: 'BETWEEN',
    nbetween: 'NOT BETWEEN',
    is: 'IS',
    nis: 'IS NOT'
};
const checkKey = (expression)=>typeof expression === 'object' && Object.keys(expression).length === 1 && new RegExp(/^\$/).test(Object.keys(expression)[0]) && Object.keys(ops).includes(Object.keys(expression)[0].replace(/^\$/, '')) ? true : false
;
const objToArr = (obj)=>Object.keys(obj).reduce((r, c)=>[
            ...r,
            {
                [c]: obj[c]
            }
        ]
    , [])
;
const expressionObjToStr = (eObj, expressionHandler1)=>eObj.v.length === 1 ? `${ops[eObj.k.replace(/^\$/, '')]} ${checkKey(eObj.v[0]) ? `( ${expressionHandler1(eObj.v[0])} )` : eObj.v[0]}` : eObj.v.map((e)=>checkKey(e) ? [
            'and',
            'or'
        ].includes(eObj.k) ? `( ${expressionHandler1(e)} )` : expressionHandler1(e) : e
    ).join(` ${ops[eObj.k.replace(/^\$/, '')]} `)
;
const expressionHandler = (expression)=>{
    const exObj = (e)=>{
        const k = Object.keys(e)[0];
        return {
            k,
            v: Array.isArray(e[k]) ? e[k] : typeof e[k] === 'object' ? objToArr(e[k]) : [
                e[k]
            ]
        };
    };
    return checkKey(expression) ? expressionObjToStr(exObj(expression), expressionHandler) : '';
};
export { checkKey as checkKey };
export { expressionHandler as default };

