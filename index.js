(async function () {
  let employees;
  let selectedEmployee;
  let data = await fetch("./data.json");
  employees = await data.json();
  selectedEmployee = employees[0];
  console.log(selectedEmployee);

  const employees__list = document.querySelector(".employee__list--table");
  const employees__detail = document.querySelector(".employee__detail--table");

  function renderEmployeeList() {
    employees__list.innerHTML = "";
    employees.map((ele) => {
      let name = `${ele.firstName} ${ele.lastName}`;
      let employ_div = document.createElement("span");
      employ_div.id = ele.id;
      employ_div.textContent = name;
      let delete_icon = document.createElement("img");
      delete_icon.setAttribute(
        "src",
        "https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
      );
      delete_icon.className = "delete_emp";
      employ_div.append(delete_icon);
      if (ele.id == selectedEmployee.id) employ_div.className = "selected";
      employees__list.append(employ_div);
    });
  }
  renderEmployeeList();

  function renderEmployeeDetail() {
    employees__detail.innerHTML = "";
    const avatar = document.createElement("img");
    avatar.setAttribute("src", selectedEmployee.avatar);
    const name = document.createElement("div");
    name.textContent = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
    const email = document.createElement("div");
    email.textContent = selectedEmployee.email;
    const address = document.createElement("div");
    const dob = document.createElement("div");
    address.textContent = selectedEmployee.address;
    dob.textContent = selectedEmployee.dob;

    employees__detail.append(avatar, name, email, address, dob);
  }

  renderEmployeeDetail();

  employees__list.addEventListener("click", (e) => {
    if (e.target.tagName == "SPAN" && e.target.id != selectedEmployee.id) {
      const selected = document.getElementById(selectedEmployee.id);
      selected.className = "";
      const emp = employees.find((ele) => ele.id == e.target.id);
      e.target.className = "selected";
      console.log(emp);
      selectedEmployee = emp;
      renderEmployeeDetail();
    } 
    else if (e.target.tagName == "IMG") {
       console.log(e.target.parentNode.id);
       employees = employees.filter((ele) => ele.id != e.target.parentNode.id);
       if(employees.length!=0){
        if (e.target.parentNode.id == selectedEmployee.id)
            selectedEmployee = employees[0];
        renderEmployeeDetail();
       } 
       else{
        console.log("1")
        employees__detail.innerHTML="";
       }     
       renderEmployeeList();
    }
  });

  const btn = document.querySelector(".add_btn");
  const body = document.querySelector(".body");
  const form = document.querySelector(".form_div");

  btn.addEventListener("click", () => {
    body.style.filter = "blur(3px)";
    form.style.display = "flex";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    body.style.filter = "";
    form.style.display = "none";
    const formData = new FormData(form);
    const values = [...formData.entries()];
    console.log(values);
    const dob = values[5][1].split("-").reverse().join("-");
    const data = {
      id: (employees.length + 1001).toString(),
      firstName: values[0][1],
      lastName: values[1][1],
      address: values[3][1],
      avatar: values[4][1],
      dob: dob,
      email: values[2][1],
    };
    console.log(data);
    employees.push(data);
    renderEmployeeList();
  });

  const close_btn = document.querySelector(".close_btn");

  close_btn.addEventListener("click", () => {
    body.style.filter = "";
    form.style.display = "none";
  });
})();
