
    
//import * as Collections from 'typescript-collections';

export default class Test_Collections{
    
    constructor() { 
        var dict: { [index: string]: Function[]; } = {};
        dict['Matt'] = []; // ok
        console.log(dict['Matt']);
        
     }
}