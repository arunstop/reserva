export const useCounter = ()=> useState<number>('counter', ()=>0);

export const counterPlus= ()=> {
    useCounter().value++
    console.log(useCounter().value);
};
export const counterMinus= ()=> {
    useCounter().value--
    console.log(useCounter().value);
};