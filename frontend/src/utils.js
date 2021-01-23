export function copy (obj) {
    try {
        return JSON.parse(JSON.stringify(obj))
    }
    catch (error) {
        console.log('object cannot be cloned', obj)
        return {}
    }
}