
let selectedFile; 

document.getElementById('input').addEventListener("change", (event)=>{
	selectedFile = event.target.files[0]; 
});


var myArray = []; 
document.getElementById('button').addEventListener("click", ()=> {
	if(selectedFile) {
		
		let fileReader = new FileReader(); 
		fileReader.readAsBinaryString(selectedFile);
		fileReader.onload = (event) => {
			//console.log(event.target.result); 
			let data = event.target.result; 
			let workbook = XLSX.read(data, {type:"binary"}); 
			//console.log(workbook);
			workbook.SheetNames.forEach(sheet => {
				let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]); 
				//console.log(rowObject);
				myArray = rowObject; 
				console.log(myArray); 
				//document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4);
			}); 
			buildTable(myArray); 
		}
	}
}); 

function buildTable(data) {
	var table = document.getElementById('myTable'); 

	for(var i = 0; i < data.length; i++) {
		var row = `<tr>
						<td>${data[i].Name} </td>
						<td>${data[i].Subject}  </td>
						<td>${data[i].Email}  </td>
						<td>${data[i].Message}  </td>
				   </tr>`
		table.innerHTML += row;
	}
}