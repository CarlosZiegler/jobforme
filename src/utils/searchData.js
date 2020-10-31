export default function searchData(list, target) {
  const result = list.filter(contact => contact[3].toLowerCase().includes(target.toLowerCase()));
  return result;
}
