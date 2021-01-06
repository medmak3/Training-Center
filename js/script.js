//* Appel d'une base, puscher un objet et la faire stocker de nouveau ver LS : Fn1
function getPuschSet(obj, key) {
  var T = JSON.parse(localStorage.getItem(key) || "[]");
  T.push(obj);
  localStorage.setItem(key, JSON.stringify(T));
}

//* Création id automatique, incrementer un nouveau et le stocker LS : Fn2
function createIdIncrement(key) {
  var id = JSON.parse(localStorage.getItem(key) || "1");
  localStorage.setItem(key, id + 1);
  return id;
}

// //* Test partie1 pour création objet student ou teacher : Fn3
function testCreation(mobile, pwd, confirmPwd, lName, fName, module1, module2, module3, module4) {
  if (verifLength(mobile, 8, 8) && pwd === confirmPwd && verifLength(pwd, 5, 5) && verifLength(lName, 3, 25) &&
    validateCh(lName) && verifLength(fName, 3, 25) && validateCh(fName) && (module1 || module2 || module3 || module4) !== "") { return true; }
}

//* Retourner si un email formateur ou etudiant : Fn4
function validateEmailStudentTeacher(email) {
  if (validateEmail(email)) {
    var i = 1;
    var l;
    var partCopyEmail = "";
    while (i < email.length) {
      if (email[i] === "@") {
        l = i + 1;
        while (email[l] !== ".") {
          partCopyEmail = partCopyEmail.concat(email[l]);
          l = l + 1;
          i = i + 1;
        }
      } else {
        if (partCopyEmail !== "") {
          i = email.length;
          if (partCopyEmail === "htk-student") { return "student"; }
          if (partCopyEmail === "htk-teacher") { return "teacher"; }
        }
        i = i + 1;
      }
    }
  }
}

//* Verificatoin de saisie format nom/prénom : Fn5
function validateCh(x) {
  var reg = /^[A-Za-z]+$/; return reg.test(x);
}

//* Recherche selon email dans la base : Fn6
function ExistenceEmail(email, key) {
  var T = JSON.parse(localStorage.getItem(key));
  for (let i = 0; i < T.length; i++) {
    if (T[i].email === email) { i = T.length + 1; return true; }
  }
  return false;
}


//* Contrôle de saisie format email : Fn7
function validateEmail(email) {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}

//* Vérification longeur de chaine de caractère entre min/max : Fn16
function verifLength(ch, min, max) { return ch.length >= min && ch.length <= max; }

//* Donner une valeur selon ce qui est cocher : Fn8
function testChecked(id1, id2, val1, val2) {
  if (document.getElementById(id1).checked) { return val1; }
  else if (document.getElementById(id2).checked) { return val2; }
}

//* Contrôle de saisie Email : Fn9
function controleSaisieExistanceEmail(email, errorIdEmail, ch) {
  if ((validateEmailStudentTeacher(email) === "student" && ExistenceEmail(email, "students") === false)||
    (validateEmailStudentTeacher(email) === "teacher" && ExistenceEmail(email, "teachers") === false)) {
    document.getElementById(errorIdEmail).innerHTML = "";
  } else if (ExistenceEmail(email, "students") || ExistenceEmail(email, "teachers")) {
    document.getElementById(errorIdEmail).innerHTML = ch;
    document.getElementById(errorIdEmail).style.color = "red";
  }
}

//* Contrôle de saisie Pwd : Fn10
function controleSaisiePwd(idpwd, errorIdPwd, minPwd, maxPwd) {
  var pwd = document.getElementById(idpwd).value;
  if (verifLength(pwd, minPwd, maxPwd)) {
    document.getElementById(errorIdPwd).innerHTML = "";
  } else {
    document.getElementById(errorIdPwd).innerHTML = "Merci d'entrer un mot de passe valide";
    document.getElementById(errorIdPwd).style.color = "red";
  }
}

//* Contrôle de saisie confirmPwd : Fn11
function controleSaisieConfirmPwd(idConfirmPwd, errorIdConfirmPwd, idpwd, minConfirmPwd, maxConfirmPwd) {
  var pwd = document.getElementById(idpwd).value;
  var confirmPwd = document.getElementById(idConfirmPwd).value;
  if (confirmPwd !== pwd || !verifLength(confirmPwd, minConfirmPwd, maxConfirmPwd)) {
    document.getElementById(errorIdConfirmPwd).innerHTML = "Mot de passe non conforme";
    document.getElementById(errorIdConfirmPwd).style.color = "red";
  } else {
    document.getElementById(errorIdConfirmPwd).innerHTML = "Validé";
    document.getElementById(errorIdConfirmPwd).style.color = "green";
  }
}

//* Controle de saisie mobile : Fn12
function controlSaisiePhone(idMobile, errorIdMobile) {
  var mobile = document.getElementById(idMobile).value;
  if (verifLength(mobile, 8, 8)) {
    document.getElementById(errorIdMobile).innerHTML = "";
  } else {
    document.getElementById(errorIdMobile).innerHTML = "Veuillez entrer un numéro de 8 chiffres !";
    document.getElementById(errorIdMobile).style.color = "red";
  }
}

//* Controle de saise de nom et prénom : Fn13
function controlSaisieLnameFname(idName, errorIdName) {
  var Name = document.getElementById(idName).value;
  if (verifLength(Name, 3, 25) && validateCh(Name)) {
    document.getElementById(errorIdName).innerHTML = "";
  } else {
    document.getElementById(errorIdName).innerHTML = "Merci d'entrer un nom sans nombres entre 3 et 25 !";
    document.getElementById(errorIdName).style.color = "red";
  }
}

//* Contrôle de saisie email : Fn14
function controleSaisieEmail(email, errorIdEmail) {
  if (validateEmailStudentTeacher(email) === ("student" || "teacher")) {
    document.getElementById(errorIdEmail).innerHTML = "";
  }
  else if (email === "") {
    document.getElementById(errorIdEmail).innerHTML = "Champ vide!";
    document.getElementById(errorIdEmail).style.color = "red";
  }
  else {
    document.getElementById(errorIdEmail).innerHTML = "Format invalide/Utilisateur non existant!";
    document.getElementById(errorIdEmail).style.color = "red";
  }
}

//*Convertir ch en ch miniscule : Fn15
function chLowerCase(idCh) {
  var ch = document.getElementById(idCh).value;
  var x=ch.toLowerCase();
  return (x);
}

//* Initialisation des bases abscences/présences : Fn16
function Init(LS, idStudent, idAbsP) {
  var newStudentAP = { idAbsP: idAbsP, idStudent: idStudent, AbsP: 0 };
  getPuschSet(newStudentAP, LS);
} 

//* Création étudiant/teacher : Fn17
function signupStudentTeacher(idlName, idfName, idEmail, idMobile, idPwd, idConfirmPwd, idmodule1, idmodule2, idmodule3, idmodule4, idjGroupe, idnGroupe, idhTeacher, idfTeacher, errorIdlName, errorIdfName, errorIdEmail, errorIdMobile, errorIdPwd, errorIdConfirmPwd) {
  var lName = document.getElementById(idlName).value;
  var fName = document.getElementById(idfName).value;
  var email = chLowerCase(idEmail);
  var mobile = document.getElementById(idMobile).value;
  var pwd = document.getElementById(idPwd).value;
  var confirmPwd = document.getElementById(idConfirmPwd).value;
  var module1 = document.getElementById(idmodule1).value;
  var module2 = document.getElementById(idmodule2).value;
  var module3 = document.getElementById(idmodule3).value;
  var module4 = document.getElementById(idmodule4).value;
  try { var choice = testChecked(idhTeacher, idfTeacher, "Homme", "Femme"); }
  catch (error) { var gr = testChecked(idjGroupe, idnGroupe, "Jour", "Nuit"); }
  controlSaisieLnameFname(idlName, errorIdlName);
  controlSaisieLnameFname(idfName, errorIdfName);
  controleSaisieEmail(email, errorIdEmail);
  controleSaisieExistanceEmail(email, errorIdEmail, 'Email existant !');
  controlSaisiePhone(idMobile, errorIdMobile);
  controleSaisiePwd(idPwd, errorIdPwd, 5, 5);
  controleSaisieConfirmPwd(idConfirmPwd, errorIdConfirmPwd, idPwd, 5, 5);
  if ((testCreation(mobile, pwd, confirmPwd, lName, fName, module1, module2, module3, module4)) && (gr === ("Jour" || "Nuit")) && (validateEmailStudentTeacher(email) === "student") && (ExistenceEmail(email, "students") === false)) {
    //* Object format JSON student
    var idStudent = createIdIncrement('studentId');
    var newStudent = { idStudent: idStudent, fName: fName, lName: lName, email: email, pwd: pwd, confirmPwd: confirmPwd, mobile: mobile, module1: module1, module2: module2, module3: module3, module4: module4, groupe: gr, role: "Student" };
    var idAbsP = createIdIncrement('idAbsP');
    Init("AS", idStudent, idAbsP);
    Init("PS", idStudent, idAbsP);
    getPuschSet(newStudent, 'students');
    alert("Inscription student avec succès !");
  } else if ((testCreation(mobile, pwd, confirmPwd, lName, fName, module1, module2, module3, module4)) && (choice === ("Homme" || "Femme")) && (validateEmailStudentTeacher(email) === "teacher") && (ExistenceEmail(email, "teachers") === false)) {
    //* Object format JSON teacher
    var idTeacher = createIdIncrement('teacherId');
    var newTeacher = { idTeacher: idTeacher, fName: fName, lName: lName, email: email, pwd: pwd, confirmPwd: confirmPwd, mobile: mobile, module1: module1, module2: module2, module3: module3, module4: module4, genre: choice, role: "Teacher" };
    getPuschSet(newTeacher, 'teachers');
    alert("Inscription teacher avec succès !");
  } else {
    alert("Veuillez vérifier SVP !");
  }
}

//* Recherche selon email et password et retourner objet : Fn18
function searchEmailPwd(email, pwd, key) {
  var T = JSON.parse(localStorage.getItem(key) || "[]");
  for (var i = 0; i < T.length; i++) {
    if (T[i].email === email && T[i].pwd === pwd) {
      var studentTeacher = T[i];
    }
  }
  return studentTeacher;
}

//* Aller à la page correspondante et création de la clé:personne connéctée : Fn19
function goToPage(nomPage, keyPersonConnected, studentTeacher) {
  location.replace(nomPage);
  localStorage.setItem(keyPersonConnected, JSON.stringify(studentTeacher));
}

//* Connexion utilisateur étudiant/formateur : Fn20
function login() {
  var email = chLowerCase('loginEmail');
  var pwd = document.getElementById("loginPwd").value;
  var connectedTeacher = JSON.parse(localStorage.getItem("connectedTeacher"));
  var connectedStudent = JSON.parse(localStorage.getItem("connectedStudent"));
  controleSaisieEmail(email, 'errorLoginEmail');
  controleSaisiePwd('loginPwd', 'errorLoginPwd', 5, 5);
  var student = searchEmailPwd(email, pwd, "students");
  var teacher = searchEmailPwd(email, pwd, "teachers");
  if ((connectedTeacher !== null && teacher) || (connectedStudent !== null && student)) {
    signOutConnectedUser('errorLoginEmail', 'errorMsgLogin', "Utilisateur déjà connecté!", "Déconnexion de l'utilisateur connecté!");
  }
  if (student && connectedStudent === null && validateEmailStudentTeacher(email) === "student") { goToPage("student.html", "connectedStudent", student); }
  else if (teacher && connectedTeacher === null && validateEmailStudentTeacher(email) === "teacher") { goToPage("teacher.html", "connectedTeacher", teacher); }
  else { alert("Veuillez vérifier votre Email/Mot de passe!"); }
}

//*Création du lien de déconnexion utilisateur déjà connecté  : Fn21
function signOutConnectedUser(errorLoginEmail, errorMsgLogin, ch1, ch2) {
  document.getElementById(errorLoginEmail).innerHTML = ch1;
  document.getElementById(errorLoginEmail).style.color = "red";
  document.getElementById(errorMsgLogin).innerHTML = ch2;
}

//* Vérification note entre min/max : Fn22
function verifNote(note, min, max) { return note >= min && note <= max; }

//* Controle de saisie notes des différentes matières : Fn23
function controlSaisieNote(idVariable, errorIdNote) {
  Note = declarateVariableWithId(idVariable);
  if (verifNote(Note, 0, 20)) {
    document.getElementById(errorIdNote).innerHTML = "";
  } else if (Note !== -1) {
    document.getElementById(errorIdNote).innerHTML = "Merci d'entrer une note entre 0 et 20";
    document.getElementById(errorIdNote).style.color = "red";
  }
}

//*Saisie une note selon id si non note=-1 : Fn24
function declarateVariableWithId(idVariable) {
  try {
    if (document.getElementById(idVariable).value) {
      var variable = document.getElementById(idVariable).value;
    }
  } catch (error) { var variable = -1; }
  return variable;
}

//* Simulateur calcul moyenne de 4 matière avec des coefficents variables : Fn25
function calculMoyenne4matière(idNote1, idNote2, idNote3, idNote4, errorIdNote1, errorIdNote2, errorIdNote3, errorIdNote4, coeff1, coeff2, coeff3, coeff4, idresult) {
  controlSaisieNote(idNote1, errorIdNote1); note1 = declarateVariableWithId(idNote1);
  controlSaisieNote(idNote2, errorIdNote2); note2 = declarateVariableWithId(idNote2);
  controlSaisieNote(idNote3, errorIdNote3); note3 = declarateVariableWithId(idNote3);
  controlSaisieNote(idNote4, errorIdNote4); note4 = declarateVariableWithId(idNote4);

  if (verifNote(note1, 0, 20) && verifNote(note2, 0, 20) &&
    (verifNote(note3, 0, 20) || note3 === -1) && (verifNote(note4, 0, 20) || note4 === -1)) {
    var moy = (note1 * coeff1 + note2 * coeff2 + note3 * coeff3 + note4 * coeff4) / (coeff1 + coeff2 + coeff3 + coeff4);
    document.getElementById(idresult).innerHTML = Math.round(moy);
  }
}

//* Déconnexion utilisateur étudiant/formateur : Fn26
function signOut() {
  var connectedTeacher = JSON.parse(localStorage.getItem("connectedTeacher"));
  if (connectedTeacher !== null) { localStorage.removeItem('connectedTeacher'); }
  else { localStorage.removeItem('connectedStudent'); }
  location.replace("index.html");
}

//* Rechercher l'objet selon id dans le tableau T de la clé key et retourner obj: Fn27
function search(id, key) {
  var T = JSON.parse(localStorage.getItem(key) || "[]");
  for (var i = 0; i < T.length; i++) { if (T[i].idStudent === id) { return T[i]; } }
}

//* Tester module complet étudiant et formateur connecté : Fn28
function testStudentTeacher(i) {
  var connectedTeacher = JSON.parse(localStorage.getItem("connectedTeacher") || "[]");
  var allStudents = JSON.parse(localStorage.getItem("students") || "[]");
  if ((connectedTeacher.module1 !== "" && allStudents[i].module1 !== "") || (connectedTeacher.module2 !== "" && allStudents[i].module2 !== "") ||
    (connectedTeacher.module3 !== "" && allStudents[i].module3 !== "") || (connectedTeacher.module4 !== "" && allStudents[i].module4 !== "")) { return true; }
}

//* Affichage des étudiants selon spécialité pour chaque formateur : Fn29
function displayStudents() {
  var allStudents = JSON.parse(localStorage.getItem("students") || "[]");
  var studentTable = `
                                       <table class = "table text-center">
                                           <thead class = "thead-dark">
                                           <tr>
                                           <th scope="col">Prénom</th>  
                                           <th scope="col">Nom</th>  
                                           <th scope="col">Email</th>  
                                           <th scope="col">Groupe</th>
                                           <th scope="col">Nombres Présences</th> 
                                           <th scope="col">Nombre Abscences</th>
                                        </tr> 
                                       </thead>
                                      <tbody>`;
  for (var i = 0; i < allStudents.length; i++) {
    if (testStudentTeacher(i)) {
      var objPresence = search(allStudents[i].idStudent, "PS");
      var objAbscence = search(allStudents[i].idStudent, "AS");
      studentTable += `
        <tr>
        <td>${allStudents[i].fName}</td>   
        <td>${allStudents[i].lName}</td>   
        <td>${allStudents[i].email}</td>   
        <td>${allStudents[i].groupe}</td>    
        <td>${objPresence.AbsP}</td>
        <td>${objAbscence.AbsP}</td>
        </tr>`;
    }
  }
  studentTable += `
                                    </tbody>
                                    </table>`;
  document.getElementById("studentTable").innerHTML = studentTable;
}

//* Affichage des abscences/présences des étudiants selon spécialité pour chaque formateur : Fn30
function displayTeacherAP() {
  var allStudents = JSON.parse(localStorage.getItem("students") || "[]");
  var studentTable = `
                                       <table class = "table text-center">
                                           <thead class = "thead-dark">
                                           <tr>
                                           <th scope="col">Prénom</th>  
                                           <th scope="col">Nom</th>  
                                           <th scope="col">Email</th>  
                                           <th scope="col">Présent/Abscent</th> 
                                           </tr> 
                                       </thead>
                                      <tbody>`;
  for (var i = 0; i < allStudents.length; i++) {
    if (testStudentTeacher(i)) {
      studentTable += `
                                                    <tr>
                                                    <td>${allStudents[i].fName}</td>   
                                                    <td>${allStudents[i].lName}</td>   
                                                    <td>${allStudents[i].email}</td>   
                                                    <td> 
                                                    <button class="btn_custom" id="btnP${i}" onclick="gestionStudentsAP(
                                                      ${allStudents[i].idStudent},'PS');disableBtn(${i});">P</button>
                                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button class="btn_custom" id="btnA${i}" onclick="gestionStudentsAP(
                                                    ${allStudents[i].idStudent},'AS');disableBtn(${i});">A</button>
                                                    </td>
                                                    </tr>`;
    }
  }
  studentTable += `
                                            </tbody>
                                            </table>`;
  document.getElementById("studentTableAP").innerHTML = studentTable;
}

// * Création de la base présences et abscences des étudiants : Fn31
function gestionStudentsAP(id, key) {
  var student = search(id, 'students');
  var T = JSON.parse(localStorage.getItem(key) || "[]");
  var l = 0;
  while (l < T.length) {
    if (T[l].idStudent === student.idStudent) {
      T[l].AbsP = Number(T[l].AbsP) + 1;
      l = T.length + 1;
    } else { l = l + 1; }
  }
  localStorage.setItem(key, JSON.stringify(T));
}

//* Affichage des champs à saisir pour le prof connecté selon ces matières : Fn32
function createAllNote(idNote, idErrorNote) {
  try {
    var M = document.getElementById(idNote).value;
    if (verifNote(M, 0, 20)) {
      document.getElementById(idErrorNote).innerHTML = "";
    } else {
      document.getElementById(idErrorNote).innerHTML = "Merci d'entrer une note entre 0 et 20";
      document.getElementById(idErrorNote).style.color = "red";
    }
  } catch (error) { var M = -1; }
  return M;
}

//* Création de la base réelle Notes : Fn33
function saveNotes(id, i) {
  var allNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
  var M1M1 = createAllNote(`noteISO9001${i}`, `errornoteISO9001${i}`);
  var M1M2 = createAllNote(`noteISO14001${i}`, `errornoteISO14001${i}`);
  var M1M3 = createAllNote(`noteISO45001${i}`, `errornoteISO45001${i}`);
  var M2M1 = createAllNote(`noteSoftSkills1${i}`, `errornoteSoftSkills1${i}`);
  var M2M2 = createAllNote(`noteSoftSkills2${i}`, `errornoteSoftSkills2${i}`);
  var M3M1 = createAllNote(`noteMSWord${i}`, `errornoteMSWord${i}`);
  var M3M2 = createAllNote(`noteMSExcel${i}`, `errornoteMSExcel${i}`);
  var M3M3 = createAllNote(`noteMSPowerpoint${i}`, `errornoteMSPowerpoint${i}`);
  var M4M1 = createAllNote(`noteMstrategique${i}`, `errornoteMstrategique${i}`);
  var M4M2 = createAllNote(`noteManagementEquipe${i}`, `errornoteManagementEquipe${i}`);
  var M4M3 = createAllNote(`noteMarketingDigital${i}`, `errornoteMarketingDigital${i}`);
  var M4M4 = createAllNote(`noteMarketingCommercial${i}`, `errornoteMarketingCommercial${i}`);

  if ((verifNote(M4M4, 0, 20) || M4M4 === "" || M4M4 === -1) && (verifNote(M4M3, 0, 20) || M4M3 === "" || M4M3 === -1) &&
    (verifNote(M4M2, 0, 20) || M4M2 === "" || M4M2 === -1) && (verifNote(M4M1, 0, 20) || M4M1 === "" || M4M1 === -1) &&
    (verifNote(M3M3, 0, 20) || M3M3 === "" || M3M3 === -1) && (verifNote(M3M2, 0, 20) || M3M2 === "" || M3M2 === -1) &&
    (verifNote(M3M1, 0, 20) || M3M1 === "" || M3M1 === -1) && (verifNote(M2M2, 0, 20) || M2M2 === "" || M2M2 === -1) &&
    (verifNote(M2M1, 0, 20) || M2M1 === "" || M2M1 === -1) && (verifNote(M1M3, 0, 20) || M1M3 === "" || M1M3 === -1) &&
    (verifNote(M1M2, 0, 20) || M1M2 === "" || M1M2 === -1) && (verifNote(M1M1, 0, 20) || M1M1 === "" || M1M1 === -1)) {

    for (var m = 0; m < allNotes.length; m++) {
      if (allNotes[m].idStudent === id) {
        allNotes[m].M1M1 = M1M1; allNotes[m].M1M2 = M1M2; allNotes[m].M1M3 = M1M3; allNotes[m].M2M1 = M2M1; allNotes[m].M2M2 = M2M2; allNotes[m].M3M1 = M3M1; allNotes[m].M3M2 = M3M2; allNotes[m].M3M3 = M3M3; allNotes[m].M4M1 = M4M1; allNotes[m].M4M2 = M4M2; allNotes[m].M4M3 = M4M3; allNotes[m].M4M4 = M4M4;
        localStorage.setItem("Notes", JSON.stringify(allNotes));
        document.getElementById(`resultSave${i}`).innerHTML = "Opération réussie !";
        document.getElementById(`resultSave${i}`).style.color = "green";
        m = allNotes.length + 1;
        document.getElementById(`saveButton${i}`).disabled = true;
        createButton(id, i);
      }
    }

    if (m === allNotes.length) {
      var idNotes = createIdIncrement('idNotes');
      var objNotes = { idNotes: idNotes, idStudent: id, M1M1: M1M1, M1M2: M1M2, M1M3: M1M3, M2M1: M2M1, M2M2: M2M2, M3M1: M3M1, M3M2: M3M2, M3M3: M3M3, M4M1: M4M1, M4M2: M4M2, M4M3: M4M3, M4M4: M4M4 };
      allNotes.push(objNotes);
      localStorage.setItem("Notes", JSON.stringify(allNotes));
      document.getElementById(`resultSave${i}`).innerHTML = "Opération réussie !";
      document.getElementById(`resultSave${i}`).style.color = "green";
      document.getElementById(`saveButton${i}`).disabled = true;
      createButton(id, i);
    }
  } else {
    alert("Veuillez vérifier vos entrées SVP !");
  }
}

//* Saisie des notes pour teacher: Fn34
function saisieStudentsNotes(id, i) {
  var student = search(id, 'students');
  var connectedTeacher = JSON.parse(localStorage.getItem("connectedTeacher") || "[]");
  document.getElementById("studentlNameNote").innerHTML = student.lName;
  document.getElementById("studentfNameNote").innerHTML = student.fName;
  var studentNotes = "";

  //* Module 1 : QHSE
  if (student.module1 !== "" && connectedTeacher.module1 !== "") {
    if (student.module1 === "QHSE") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteISO9001${i}" placeholder="Note ISO 9001" type="number">
          <span id="errornoteISO9001${i}"></span>
      </div>
      <div class="col-sm-12">
          <input class="form-control" id="noteISO14001${i}" placeholder="Note ISO 14001" type="number">
          <span id="errornoteISO14001${i}"></span>
      </div>
      <div class="col-sm-12">
          <input class="form-control" id="noteISO45001${i}" placeholder="Note ISO 45001" type="number">
          <span id="errornoteISO45001${i}"></span>
      </div>`;
    }
    if (student.module1 === "ISO 9001") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteISO9001${i}" placeholder="Note ISO 9001" type="number">
          <span id="errornoteISO9001${i}"></span>
      </div>`;
    }
    if (student.module1 === "ISO 14001") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteISO14001${i}" placeholder="Note ISO 14001" type="number">
          <span id="errornoteISO14001${i}"></span>
      </div>`;
    }
    if (student.module1 === "ISO 45001") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteISO45001${i}" placeholder="Note ISO 45001" type="number">
          <span id="errornoteISO45001${i}"></span>
      </div>`;
    }
  }

  //* Module 2 : Soft Skills
  if (student.module2 !== "" && connectedTeacher.module2 !== "") {
    if (student.module2 === "Soft Skills") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteSoftSkills1${i}" placeholder="Note Soft Skills 1" type="number">
          <span id="errornoteSoftSkills1${i}"></span>
      </div>
      <div class="col-sm-12">
      <input class="form-control" id="noteSoftSkills2${i}" placeholder="Note Soft Skills 2" type="number">
      <span id="errornoteSoftSkills2${i}"></span>
      </div>`;
    }
    if (student.module2 === "Soft Skills 1") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteSoftSkills1${i}" placeholder="Note Soft Skills 1" type="number">
          <span id="errornoteSoftSkills1${i}"></span>
      </div>`;
    }
    if (student.module2 === "Soft Skills 2") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteSoftSkills2${i}" placeholder="Note Soft Skills 2" type="number">
          <span id="errornoteSoftSkills2${i}"></span>
      </div>`;
    }
  }

  //* Module 3 : MS Office
  if (student.module3 !== "" && connectedTeacher.module3 !== "") {
    if (student.module3 === "MS Office") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteMSWord${i}" placeholder="Note MS Word" type="number">
          <span id="errornoteMSWord${i}"></span>
      </div>
      <div class="col-sm-12">
          <input class="form-control" id="noteMSExcel${i}" placeholder="Note MS Excel" type="number">
          <span id="errornoteMSExcel${i}"></span>
      </div>
      <div class="col-sm-12">
          <input class="form-control" id="noteMSPowerpoint${i}" placeholder="Note MS PowerPoint" type="number">
          <span id="errornoteMSPowerpoint${i}"></span>
      </div>`;
    }
    if (student.module3 === "MS Word") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteMSWord${i}" placeholder="Note MS Word" type="number">
          <span id="errornoteMSWord${i}"></span>
      </div>`;
    }
    if (student.module3 === "MS Excel") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteMSExcel${i}" placeholder="Note MS Excel" type="number">
          <span id="errornoteMSExcel${i}"></span>
      </div>`;
    }
    if (student.module3 === "MS Powerpoint") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteMSPowerpoint${i}" placeholder="Note MS PowerPoint" type="number">
          <span id="errornoteMSPowerpoint${i}"></span>
      </div>`;
    }
  }

  //* Module 4 : Management & Marketing
  if (student.module4 !== "" && connectedTeacher.module4 !== "") {
    if (student.module4 === "Management & Marketing") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteMstrategique${i}" placeholder="Note Management Stratégique" type="number">
          <span id="errornoteMstrategique${i}"></span>
      </div>
      <div class="col-sm-12">
          <input class="form-control" id="noteManagementEquipe${i}" placeholder="Note Management d'équipe" type="number">
          <span id="errornoteManagementEquipe${i}"></span>
      </div>
      <div class="col-sm-12">
          <input class="form-control" id="noteMarketingDigital${i}" placeholder="Note Marketing Digital" type="number">
          <span id="errornoteMarketingDigital${i}"></span>
      </div> 
      <div class="col-sm-12">
      <input class="form-control" id="noteMarketingCommercial${i}" placeholder="Note Marketing Commercial" type="number">
      <span id="errornoteMarketingCommercial${i}"></span>
      </div>`;
    }
    if (student.module4 === "Management stratégique") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteMstrategique${i}" placeholder="Note Management Stratégique" type="number">
          <span id="errornoteMstrategique${i}"></span>
      </div>`;
    }
    if (student.module4 === "Management d'équipes") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteManagementEquipe${i}" placeholder="Note Management d'équipes" type="number">
          <span id="errornoteManagementEquipe${i}"></span>
      </div>`;
    }
    if (student.module4 === "Marketing Digital") {
      studentNotes += `
      <div class="col-sm-12">
          <input class="form-control" id="noteMarketingDigital${i}" placeholder="Note Marketing Digital" type="number">
          <span id="errornoteMarketingDigital${i}"></span>
      </div>`;
    }
    if (student.module4 === "Marketing Commercial") {
      studentNotes += `
      <div class="col-sm-12">
      <input class="form-control" id="noteMarketingCommercial${i}" placeholder="Note Marketing Commercial" type="number">
      <span id="errornoteMarketingCommercial${i}"></span>
      </div>`;
    }
  }
  studentNotes += `  <div class="row">
        <div class="col-sm-10">
        <button type="submit"
        class="btn btn-light btn-radius btn-brd grd1" id="saveButton${i}" onclick="saveNotes(${student.idStudent},${i})">Enregistrer        </button>
        <div id="resultSave${i}" class="font-weight-bold h6"></div>
        </div>
        </div>`;
  document.getElementById("studentNotes").innerHTML = studentNotes;
}

//* Affichage des notes des étudiants selon spécialité pour chaque formateur : Fn35
function displayTeacherNotes() {
  var allStudents = JSON.parse(localStorage.getItem("students") || "[]");
  var studentTable = `
                                       <table class = "table text-center">
                                           <thead class = "thead-dark">
                                           <tr>
                                           <th scope="col">Prénom</th>  
                                           <th scope="col">Nom</th>  
                                           <th scope="col">Email</th>  
                                           <th scope="col">Saisie Notes</th>
                                           <th scope="col">Moyennes</th> 
                                       </thead>
                                      <tbody>`;
  for (var i = 0; i < allStudents.length; i++) {
    if (testStudentTeacher(i)) {
      studentTable += `
                                                    <tr>
                                                    <td>${allStudents[i].fName}</td>   
                                                    <td>${allStudents[i].lName}</td>   
                                                    <td>${allStudents[i].email}</td>   
                                                    <td> 
                                                    <div><a class="hover-btn-new log orange table-dark" href="#" data-toggle="modal"
                                                    data-target=".flNotes" onclick="saisieStudentsNotes(${allStudents[i].idStudent},${i})"><span>Donner Notes</span></a></div>
                                                    </td>
                                                    <td><span id="resultMoy${i}" </span>
                                                    </td>
                                                    </tr>`;
    }
  }
  studentTable += `
                                            </tbody>
                                            </table>`;
  document.getElementById("studentTableNotes").innerHTML = studentTable;
}

// * Désactivation des bouttons abscence/présence pour chaque étudiant : Fn36
function disableBtn(i) {
  document.getElementById(`btnP${i}`).disabled = true;
  document.getElementById(`btnA${i}`).disabled = true;
}

//* Stockage des demandes des visiteurs dans la base "visitors" : Fn37
function contactMsg() {
  var lName = document.getElementById("lNameVisitor").value;
  var fName = document.getElementById("fNameVisitor").value;
  var mobile = document.getElementById("phoneVisitor").value;
  var email = document.getElementById("emailVisitor").value;
  var msg = document.getElementById("msgVisitor").value;
  controlSaisieLnameFname("lNameVisitor", 'errorlNameVisitor');
  controlSaisieLnameFname('fNameVisitor', 'errorfNameVisitor');
  controlSaisiePhone('phoneVisitor', 'errorPhoneVisitor');

  if (validateEmail(email)) { document.getElementById("errorEmailVisitor").innerHTML = ""; }
  else if (email === "") {
    document.getElementById("errorEmailVisitor").innerHTML = "Champ vide!";
    document.getElementById("errorEmailVisitor").style.color = "red";
  } else {
    document.getElementById("errorEmailVisitor").innerHTML = "Format invalide";
    document.getElementById("errorEmailVisitor").style.color = "red";
  }

  if (msg !== "") { document.getElementById("errorMsgVisitor").innerHTML = ""; }
  else {
    document.getElementById("errorMsgVisitor").innerHTML = "Veuillez écrire un message !";
    document.getElementById("errorMsgVisitor").style.color = "red";
  }

  if (validateEmail(email) && verifLength(mobile, 8, 8) && verifLength(lName, 3, 25) &&
    validateCh(lName) && verifLength(fName, 3, 25) && validateCh(fName) && msg !== "") {
    var id = createIdIncrement('idVisitor');
    var visitor = { idVisitor: id, fName: fName, lName: lName, email: email, phone: mobile, msg: msg, role: "visitor" };
    getPuschSet(visitor, 'visitors');
    document.getElementById("msgSuccess").innerHTML = "Message envoyé avec succès !";
    document.getElementById("msgSuccess").style.color = "green";
  } else { alert("Veuillez vérifier vos informations SVP !"); }
}

//* Affichage des formateurs dynamiquement : Fn38
function displayTeachers() {
  var allTeachers = JSON.parse(localStorage.getItem("teachers") || "[]");
  var teacherTable = `
  <div class="container">
      <div class="row">`;
  for (var i = 0; i < allTeachers.length; i++) {
    teacherTable += `
    <div class="col-lg-4 col-md-6 col-12">
		  			<div class="our-team">
              <div class="team-img">`;
    if (allTeachers[i].genre === "Homme") {
      teacherTable += `<img src="images/Teachers_Men/teacher_men3.jpg">`;
    } else {
      teacherTable += `<img src="images/Teachers_Women/teacher_women1.jpg">`;
    }
    teacherTable += `
							<div class="social">
								<ul>
									<li><a href="#" class="fa fa-facebook"></a></li>
									<li><a href="#" class="fa fa-twitter"></a></li>
									<li><a href="#" class="fa fa-linkedin"></a></li>
									<li><a href="#" class="fa fa-skype"></a></li>
								</ul>
							</div>
						</div>
            <div class="team-content">
							<h3 class="title">${allTeachers[i].fName}&nbsp;&nbsp;${allTeachers[i].lName}</h3>
              `;
    if (allTeachers[i].genre === "Homme") {
      teacherTable += `<span class="post">Formateur n° ${i + 1}<span>`;
    } else {
      teacherTable += `<span class="post">Formatrice n° ${i + 1}<span>`;
    }
    teacherTable += `</div>
                	</div>
        </div>`;
  }
  teacherTable += `          
				</div><!-- end row -->
        </div><!-- end container -->
        `;
  document.getElementById("teacherTable").innerHTML = teacherTable;
}

//* Affichage nombres Abscence/présence pour un étudiant : Fn39
function displayStudentsAP() {
  var connectedStudent = JSON.parse(localStorage.getItem("connectedStudent") || "[]");
  var objPresence = search(connectedStudent.idStudent, "PS");
  var objAbscence = search(connectedStudent.idStudent, "AS");
  document.getElementById("prAffiche").innerHTML = objPresence.AbsP;
  document.getElementById("absAffiche").innerHTML = objAbscence.AbsP;
  if (objAbscence.AbsP > 4) {
    document.getElementById("elimination").innerHTML = "Vous êtes éliminé(e) !";
    document.getElementById("elimination").style.color = "red";
  }
}

//* Affichage des notes pour un étudiant : Fn40
function displayStudentsNotes() {
  var connectedStudent = JSON.parse(localStorage.getItem("connectedStudent") || "[]");
  var allNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
  var studentNotes = `<table class = "table">
                    <thead class = "thead-dark">
                    <th scope="col">Matière</th>  
                    <th scope="col">Note</th>  
                    </thead>
                    <tbody>`;
  for (var i = 0; i < allNotes.length; i++) {
    if (connectedStudent.idStudent === allNotes[i].idStudent) {
      if (allNotes[i].M1M1 !== "" && allNotes[i].M1M1 !== -1) {
        studentNotes += `
        <tr>
        <td>ISO 9001</td><td>${allNotes[i].M1M1}</td>
        </tr> `;
      }
      if (allNotes[i].M1M2 !== "" && allNotes[i].M1M2 !== -1) {
        studentNotes += `
        <tr>
        <td>ISO 14001 </td><td> ${allNotes[i].M1M2}</td>
        </tr> `;
      }
      if (allNotes[i].M1M3 !== "" && allNotes[i].M1M3 !== -1) {
        studentNotes += `
        <tr>
        <td>ISO 45001 </td><td> ${allNotes[i].M1M3}</td>
        </tr> `;
      }
      if (allNotes[i].M2M1 !== "" && allNotes[i].M2M1 !== -1) {
        studentNotes += `
        <tr>
        <td>Soft Skills 1 </td><td> ${allNotes[i].M2M1}</td>
        </tr> `;
      }
      if (allNotes[i].M2M2 !== "" && allNotes[i].M2M2 !== -1) {
        studentNotes += `
        <tr>
        <td>Soft Skills 2</td><td> ${allNotes[i].M2M2}</td>
        </tr> `;
      }
      if (allNotes[i].M3M1 !== "" && allNotes[i].M3M1 !== -1) {
        studentNotes += `
        <tr>
        <td>MS Word </td><td> ${allNotes[i].M3M1}</td>
        </tr> `;
      }
      if (allNotes[i].M3M2 !== "" && allNotes[i].M3M2 !== -1) {
        studentNotes += `
        <tr>
        <td>MS Excel </td><td> ${allNotes[i].M3M2}</td>
        </tr> `;
      }
      if (allNotes[i].M3M3 !== "" && allNotes[i].M3M3 !== -1) {
        studentNotes += `
        <tr>
        <td>MS Powerpoint</td><td>${allNotes[i].M3M3}</td>
        </tr> `;
      }
      if (allNotes[i].M4M1 !== "" && allNotes[i].M4M1 !== -1) {
        studentNotes += `
        <tr>
        <td>Management stratégique</td><td>${allNotes[i].M4M1}</td>
        </tr> `;
      }
      if (allNotes[i].M4M2 !== "" && allNotes[i].M4M2 !== -1) {
        studentNotes += `
        <tr>
        <td>Management d'équipes</td><td>${allNotes[i].M4M2}</td>
        </tr> `;
      }
      if (allNotes[i].M4M3 !== "" && allNotes[i].M4M3 !== -1) {
        studentNotes += `
        <tr>
        <td>Marketing digital</td><td>${allNotes[i].M4M3}</td>
        </tr> `;
      }
      if (allNotes[i].M4M4 !== "" && allNotes[i].M4M4 !== -1) {
        studentNotes += `
        <tr>
        <td>Marketing commercial</td><td>${allNotes[i].M4M4}</td>
        </tr>
        </tbody>
        </table>`;
      }
    }
  }
  document.getElementById("afficheStudentNotes").innerHTML = studentNotes;
}

//* Calcul et affichage des moyennes des modules complets : Fn41
function calculallNotes(id, i) {
  var allNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
  for (var k = 0; k < allNotes.length; k++) {
    if (id === allNotes[k].idStudent) {
      if (allNotes[k].M1M1 !== "" && allNotes[k].M1M1 !== -1 && allNotes[k].M1M2 !== "" &&
        allNotes[k].M1M2 !== -1 && allNotes[k].M1M3 !== "" && allNotes[k].M1M3 !== -1) {
        calculMoyenne("Module QHSE: ", allNotes[k].M1M1, allNotes[k].M1M2, allNotes[k].M1M3, 0, 2, 2.5, 3, 0, `afficheMoy1${i}`);
      }
      if (allNotes[k].M2M1 !== "" && allNotes[k].M2M1 !== -1 && allNotes[k].M2M2 !== "" && allNotes[k].M2M2 !== -1) {
        calculMoyenne("Module Soft Skills: ", allNotes[k].M2M1, allNotes[k].M2M2, 0, 0, 2, 3, 0, 0, `afficheMoy2${i}`);
      }
      if (allNotes[k].M3M1 !== "" && allNotes[k].M3M1 !== -1 && allNotes[k].M3M2 !== "" && allNotes[k].M3M2 !== -1 &&
        allNotes[k].M3M3 !== "" && allNotes[k].M3M3 !== -1) {
        calculMoyenne("Module MS Office: ", allNotes[k].M3M1, allNotes[k].M3M2, allNotes[k].M3M3, 0, 2, 4, 3, 0, `afficheMoy3${i}`);
      }
      if (allNotes[k].M4M1 !== "" && allNotes[k].M4M1 !== -1 && allNotes[k].M4M2 !== "" && allNotes[k].M4M2 !== -1 &&
        allNotes[k].M4M3 !== "" && allNotes[k].M4M3 !== -1 && allNotes[k].M4M4 !== "" && allNotes[k].M4M4 !== -1) {
        calculMoyenne("Module Management & Marketing: ", allNotes[k].M4M1, allNotes[k].M4M2, allNotes[k].M4M3, allNotes[k].M4M4, 2, 3, 3.5, 3, `afficheMoy4${i}`);
      }
    }
  }
}

//* Calcul moyenne pour formateur: Fn42
function calculMoyenne(ch, n1, n2, n3, n4, c1, c2, c3, c4, id) {
  moy = (n1 * c1 + n2 * c2 + n3 * c3 + n4 * c4) / (c1 + c2 + c3 + c4);
  document.getElementById(id).innerHTML = ch + Math.round(moy);
}

//* Test module complet pour etudiant et formateur connecté: Fn43
function testExistModule(id) {
  var objStudent = search(id, 'students');
  var connectedTeacher = JSON.parse(localStorage.getItem("connectedTeacher") || "[]");
  if ((objStudent.module1 === "QHSE" && connectedTeacher.module1 !== "") ||
    (objStudent.module2 === "Soft Skills" && connectedTeacher.module2 !== "") ||
    (objStudent.module3 === "MS Office" && connectedTeacher.module3 !== "") ||
    (objStudent.module4 === "Management & Marketing" && connectedTeacher.module4 !== "")) { return true; }
}

//* Création du boutton moyennes en cas de module complet : Fn44
function createButton(id, i) {
  var allStudents = JSON.parse(localStorage.getItem("students") || "[]");
  var buttonMoy = "";
  if (testExistModule(id)) {
    buttonMoy += `<a class="hover-btn-new log orange table-dark" href="#" data-toggle="modal"
              onclick="calculallNotes(${allStudents[i].idStudent},${i})"><span>Moyenne</span></a>
              <p><p class="font-weight-bold" id="afficheMoy1${i}"></p>
              <p class="font-weight-bold" id="afficheMoy2${i}"></p>
              <p class="font-weight-bold" id="afficheMoy3${i}"></p>
              <p class="font-weight-bold" id="afficheMoy4${i}"></p></p>`;
  } else { buttonMoy += `<span class="font-weight-bold">Pas de module</span>`; }
  document.getElementById(`resultMoy${i}`).innerHTML = buttonMoy;
}