export default function groupByAttribute(objetoArray, propriedade) {
	return objetoArray.reduce((acc, obj) => {
		const key = obj[propriedade];
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
}
