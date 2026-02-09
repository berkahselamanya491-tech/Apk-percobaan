function cekPassword() {
  var pass = document.getElementById("pasword").value;
  var paswordBenar = "1234";

  if (pass === paswordBenar) {

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("introPage").style.display = "block";

    var video = document.getElementById("introVideo");
    video.play();

    video.onended = function() {
      masukMenu();
    };

  } else {
    document.getElementById("error").innerText = "password salah!";
  }
}

function skipVideo(){
  masukMenu();
}

function masukMenu(){
  document.getElementById("introPage").style.display = "none";
  document.getElementById("menuPage").style.display = "block";
}
let currentFileIndex = null;

function refreshProjectList(){
  let select = document.getElementById("projectList");
  select.innerHTML = "";

  for(let i=0;i<localStorage.length;i++){
    let key = localStorage.key(i);
    if(key.startsWith("project_")){
      let option = document.createElement("option");
      option.value = key;
      option.text = key.replace("project_","");
      select.appendChild(option);
    }
  }
}

function buatProject(){
  let nama = document.getElementById("projectName").value;
  if(nama=="") return alert("Isi nama project!");

  localStorage.setItem("project_"+nama, JSON.stringify([]));
  refreshProjectList();
  alert("Project dibuat!");
}

function simpanFile(){
  let project = document.getElementById("projectList").value;
  let file = document.getElementById("fileName").value;
  let isi = document.getElementById("fileContent").value;

  if(!project || file=="") return alert("Lengkapi dulu!");

  let data = JSON.parse(localStorage.getItem(project));

  if(currentFileIndex !== null){
    data[currentFileIndex] = {nama:file, isi:isi};
  } else {
    data.push({nama:file, isi:isi});
  }

  localStorage.setItem(project, JSON.stringify(data));
  currentFileIndex = null;
  tampilFile();
}

function tampilFile(){
  let project = document.getElementById("projectList").value;
  let fileList = document.getElementById("fileList");
  fileList.innerHTML = "";

  if(!project) return;

  let data = JSON.parse(localStorage.getItem(project));

  data.forEach((f,index)=>{
    fileList.innerHTML += 
    `<div onclick="editFile(${index})" style="cursor:pointer;">
      ${f.nama}
     </div>`;
  });
}

function editFile(index){
  let project = document.getElementById("projectList").value;
  let data = JSON.parse(localStorage.getItem(project));

  document.getElementById("fileName").value = data[index].nama;
  document.getElementById("fileContent").value = data[index].isi;

  currentFileIndex = index;
}

function hapusFile(){
  let project = document.getElementById("projectList").value;
  if(currentFileIndex === null) return alert("Pilih file dulu!");

  let data = JSON.parse(localStorage.getItem(project));
  data.splice(currentFileIndex,1);

  localStorage.setItem(project, JSON.stringify(data));

  document.getElementById("fileName").value="";
  document.getElementById("fileContent").value="";
  currentFileIndex=null;

  tampilFile();
}

function exportFile(){
  let isi = document.getElementById("fileContent").value;
  let nama = document.getElementById("fileName").value;

  if(nama=="") return alert("Isi nama file!");

  let blob = new Blob([isi], {type:"text/plain"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nama+".txt";
  a.click();
}

window.onload = refreshProjectList;