export const fetchServer = function* (filters, pageinfo, sortinfo) {
	//发出ajax请求
	const { results, count } = yield fetch("/infosearch", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"body": JSON.stringify({ filters, pageinfo, sortinfo })
	}).then(data => data.json());

	return { results, count };
}