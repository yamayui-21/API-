"use strict";


window.onload = (e)=>{
	const URL_WEATHER = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
	const option = {responseType: "blob"};
	const ax1 = axios.get(URL_WEATHER + "210000.json", option);// 岐阜
	const ax2 = axios.get(URL_WEATHER + "240000.json", option);// 三重
	const ax3 = axios.get(URL_WEATHER + "230000.json", option);// 愛知


	function createObjAPI([...opt_API],[...opt_prop_name]=[],json={},callback=""){
		Promise.all([...opt_API]).then(res=>{
			console.log("All completed!!");
			let json = {};
			let i = -1;
			const json_prop_name = [...opt_prop_name];
			const json_array = [];
	
			for(let r of res) {
				r.data.text().then(str=>{
					
					const prop = json_prop_name[++i];
					const jsons = JSON.parse(str);
					json_array.push([prop,jsons]);
					
					let json = Object.fromEntries(json_array);
					if(i >= res.length -1){
						callback(json);
					}
					
				});
			}
		}).catch(err=>{
			console.log("Something went wrong...");
			console.log(err);
		});
	};
	/*
	createObjAPI([APIを取得する],[APIプロパティ名],"APIオブジェクト名",json=>{
		console.log(json.ax1);
	});*/
	createObjAPI([ax1,ax2,ax3],["ax1","ax2","ax3"],"ObjAPI",json=>{
		console.log(json.ax1);
		console.log(json.ax2);
		console.log(json.ax3);
	});
}

