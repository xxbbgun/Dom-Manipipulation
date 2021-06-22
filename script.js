/*var searchButton = document.getElementById('searchButton')
var inputText = document.getElementById('inputText')
var output = document.getElementById('output')
var badgeCount = document.getElementById('count')
 function addText(){
     let text = inputText.value
    console.log(text)
   let newButton = document.createElement('button')
   newButton.classList.add('btn')
   newButton.classList.add('btn-outline-primary')
   newButton.classList.add('m-2')
     newButton.setAttribute('type','button')
   newButton.innerText = text
    output.appendChild(newButton)
    badgeCount.innerText = output.children.length
 }

 searchButton.addEventListener('click',addText)
 inputText.addEventListener('blur',addText)

 var inputName = document.getElementById('name')
 var inputUsername = document.getElementById('username')
 var inputNamePrefix = document.getElementById('namePrefix')
var outputTableBody = document.getElementById('outputTableBody')
 var submitData = document.getElementById('submitData')

 function addDataToTable(index){
     let row = document.createElement('tr')
     let cell = document.createElement('th')
     cell.setAttribute('score',row)
     cell.innerHTML = index
     row.appendChild(cell)
     cell = document.createElement('td')
     cell.innerHTML = inputName.value
     row.appendChild(cell)
     cell = document.createElement('td')
     cell.innerHTML = inputUsername.value
     row.appendChild(cell)
     cell = document.createElement('td')
     cell.innerHTML = inputNamePrefix.options[inputNamePrefix.selectedIndex].text
     row.appendChild(cell)
     outputTableBody.appendChild(row)
 }
 var index = 1
 submitData.addEventListener('click',(event)=>{
        
    addDataToTable(index++)
    
 })*/


/*var student ={};
student.name='คุณลุง'
student.username='a@b.com'
student.gender='ชาย'
 
// document.getElementById('output').innerText = student;

var student2 = {};
student2.name='คุณนาย'
student2.username='n@n.com'
student2.gender='หญิง'


/*function addStudentData(student){
   const output = document.getElementById("output")
   let row = document.createElement("div")
   row.classList.add("row")
   let columnName = document.createElement("div")
   columnName.classList.add("col-1")
   columnName.classList.add("offset-1")
   columnName.innerHTML = "ชื่อ"
   let columnValue = document.createElement("div")
   columnValue = document.createElement("row")
   columnValue.classList.add("col")
   columnValue.innerHTML = student.name
   row.appendChild(columnName)
   row.appendChild(columnValue)
   output.appendChild(row)

   row = document.createElement("div")
   row.classList.add("row")
   columnName = document.createElement("div")
   columnName.classList.add("col-1")
   columnName.classList.add("offset-1")
   columnName.innerHTML = "Id"
   columnValue = document.createElement("div")
   columnValue = document.createElement("row")
   columnValue.classList.add("col")
   columnValue.innerHTML = student.username
   row.appendChild(columnName)
   row.appendChild(columnValue)
   output.appendChild(row)

   row = document.createElement("div")
   row.classList.add("row")
   columnName = document.createElement("div")
   columnName.classList.add("col-1")
   columnName.classList.add("offset-1")
   columnName.innerHTML = "gender"
   columnValue = document.createElement("div")
   columnValue = document.createElement("row")
   columnValue.classList.add("col")
   columnValue.innerHTML = student.gender
   row.appendChild(columnName)
   row.appendChild(columnValue)
   output.appendChild(row)
}

var students=[
   student,
   student2,
{
   name:'สมรักษ์',
   username:'m@n.com',
   gender:'ชาย'
}
]*/
function addStudentToTable(index,student) {
	const tableBody = document.getElementById('tableBody')
	let row = document.createElement('tr')
	let cell = document.createElement('th')
	cell.setAttribute('score','row')
	cell.innerHTML = index
	row.appendChild(cell)
	cell = document.createElement('td')
	let names = document.createElement('p')
	
	names.innerHTML = `${student.name} ${student.surname}`
	names.addEventListener('click', function () {
        showsingleClick(student.id)
    })
	cell.appendChild(names)
    row.appendChild(cell)
	cell = document.createElement('td')
	let img = document.createElement('img')
	img.setAttribute('src',student.image)
	img.height = 200
	cell.appendChild(img)
	row.appendChild(cell)
	cell = document.createElement('td')
	cell.innerHTML = student.gpa
	row.appendChild(cell)
cell = document.createElement('td')
	let buttonEdit = document.createElement('button')
	buttonEdit.classList.add('btn')
	buttonEdit.classList.add('btn-primary')
	buttonEdit.setAttribute('type','button')
	buttonEdit.innerText = 'edit'
	buttonEdit.addEventListener('click', function() {
		editStudentGetId(student.id)	
	})
	cell.appendChild(buttonEdit)
	row.appendChild(cell)
	cell = document.createElement('td')
	let button = document.createElement('button')
	button.classList.add('btn')
	button.classList.add('btn-danger')
	button.setAttribute('type','button')
	button.innerText = 'delete'
	button.addEventListener('click',(event) => {
		let confirmMsg = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
		if (confirmMsg){
			deleteStudent(student.id)
		}
		
	})
	cell.appendChild(button)
	row.appendChild(cell)

	
	
	tableBody.appendChild(row)
}

function addStudentList(studentList) {
	let counter = 1
	document.getElementById('tableBody').innerHTML = ''
	for (student of studentList) {
		addStudentToTable(counter++, student)
	}
}


function addStudentData(student){
	let idElem = document.getElementById('id')
	idElem.innerHTML = student.id
	let studentIdElem = document.getElementById('studentId')
	studentIdElem.innerHTML = student.studentId
	let nameElem = document.getElementById('name')
	nameElem.innerHTML = `${student.name} ${student.surname}`
	let gpaElem = document.getElementById('gpa')
	gpaElem.innerHTML = student.gpa
	let profileElem = document.getElementById('image')
	profileElem.setAttribute('src',student.image)
	profileElem.height = 200
	
	
}

function onLoad(){
	fetch('https://dv-student-backend-2019.appspot.com/students').then((response) => {
        return response.json()
    }).then(data => {
        hideAll()
        listStudentResult.style.display = "block"
        addStudentList(data);
    })
}

document.getElementById('searchButton').addEventListener('click', (event) => {
	let id = document.getElementById('inputText').value
	console.log(id)
	fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
	.then((response) => {
		return response.json()
	}).then((student) => {
		hideAll()
		addStudentData(student)
		singleStudentResult.style.display = 'block'
	})
})

function addStudentToDB(student) {
	fetch('https://dv-student-backend-2019.appspot.com/students', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(student)
	}).then((response) => {
		return response.json()
	}).then((data) => {
		alert('Add student successfully')
		listStudentResult.style.display = 'block'
		addUserDetail.style.display = 'none'
		showAllStudent()
	})
}

function deleteStudent(id){
	fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
		method: 'DELETE'
	}).then((response) => {
		if (response.status === 200){
			return response.json()
		}else {
			throw Error(response.statusText) //โยนerrorออกมาแล้วให้มีคนมา catchรับ
		}
	}).then(data => {
		alert(`student name ${data.name} is now deleted`)
		showAllStudent()
	}).catch((error) => {
		alert(error)('your input student is not in database')
	})
}

function addStudent(){
	let student = {}
	student.name = document.getElementById('nameInput').value
	student.surname = document.getElementById('surnameInput').value
	student.studentId = document.getElementById('studentIdInput').value
	student.gpa = document.getElementById('gpaInput').value
	student.image = document.getElementById('imageLinkInput').value
	addStudentToDB(student)
}

document.getElementById('addButton').addEventListener('click',(event) => {
	addStudent()
	
})

function showAllStudent() {
	fetch('https://dv-student-backend-2019.appspot.com/students')
	.then((response) => {
		return response.json()
	}).then(data => {
		addStudentList(data)
	})

}

var singleStudentResult = document.getElementById('single_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')
var editPage = document.getElementById('edit_student_result')
function hideAll(){
	singleStudentResult.style.display = 'none'
	listStudentResult.style.display = 'none'
	addUserDetail.style.display = 'none'
	editPage.style.display = 'none'
	
}

document.getElementById('allStudentMenu').addEventListener('click',(event) => {
	hideAll()
	listStudentResult.style.display = 'block'
	showAllStudent()
})

document.getElementById('addStudentMenu').addEventListener('click',(event) => {
	hideAll()
	addUserDetail.style.display = 'block'
})






var editName = document.getElementById('nameInput')
var studentEditSurname = document.getElementById('surnameInput')
var studentEditStudentId = document.getElementById('studentIdInput')
var studentEditGpa = document.getElementById('gpaInput')
var studentEditImage = document.getElementById('imageInput')

function editForm(data) {
    editPage.style.display = "block"
    let idElem = document.getElementById('editid')
    idElem.innerHTML = data.id
    let studentIdElem = document.getElementById('editstudentId')
    studentIdElem.innerHTML = data.studentId
    let nameElem = document.getElementById('editname')
    nameElem.innerHTML = `${data.name} ${data.surname}`
    let gpaElem = document.getElementById('editgpa')
    gpaElem.innerHTML = data.gpa
    let profileElem = document.getElementById('editimage')
    profileElem.setAttribute('src', data.image)
    profileElem.width = 200
    profileElem.height = 200
    editId = data.id
}
var editId
document.getElementById('editButton').addEventListener('click',(event) => {
	editStudent()
	
})
function editStudent() {
	let studentEditData = {}
	studentEditData.id = editId
	studentEditData.name = document.getElementById('editnameInput').value
	studentEditData.surname = document.getElementById('editsurnameInput').value
	studentEditData.studentId = document.getElementById('editstudentIdInput').value
	studentEditData.gpa = document.getElementById('editgpaInput').value
	studentEditData.image = document.getElementById('editimageLinkInput').value
	console.log(JSON.stringify(studentEditData))
	updateToData(studentEditData)

}

function updateToData(data) {
	console.log(id)
	fetch(`https://dv-student-backend-2019.appspot.com/students`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }).then(response => {
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data=> {
        alert('Update successed')
		editForm(data)
    })
}



function editStudentGetId(id) {
	fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
	.then(response => {
		if (response.status == 200) {
			return response.json()
		} else {
			throw Error(response.statusText)
		}
	}).then(data => {
		hideAll()
		editForm(data)
	})

}

function showsingleClick(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
        .then((response) => {
            return response.json()
        }).then(data => {
            hideAll()
            singleStudentResult.style.display = "block"
            addStudentData(data);
        })
}