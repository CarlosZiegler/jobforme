export default function searchData(list, target) {

    const result = list.filter((contact, index, arrayProfile) => {
        return contact[3].toLowerCase().includes(target.toLowerCase())
    })
    return result
}
