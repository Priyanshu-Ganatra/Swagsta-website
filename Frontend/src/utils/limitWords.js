export const limitWords = (str = '', limit) => {
    if (str.split(' ').length > limit) {
        return str.split(' ').slice(0, limit).join(' ') + '...'
    }
    return str
}