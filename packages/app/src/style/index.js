/**
 * Combine styles
 * @param {String[]} args styles
 */
export function combine(...args) {
    let s = '';
    for(let a of args)
        s += a + ' ';
    return s.trim();
}

/**
 * Conditionally returns a style
 * @param {Boolean} condition If condition, then classname is added
 * @param {String} style The added style
 */
 export function conditional(condition, style) {
    return condition ? style : "";
}