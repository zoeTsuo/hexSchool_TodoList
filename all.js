let data = [];

const txt = document.querySelector(".card input");
const btn_add = document.querySelector(".btn_add");
const tab = document.querySelector(".tab");
const tab_all =document.querySelector(".tab .tabAll");
const tab_li = document.querySelectorAll(".tab li");
const list = document.querySelector(".list");
const undo_txt = document.querySelector(".undo_txt"); 
const btn_del = document.querySelector(".delete_done"); 

//sample job
let job ={};
job.content = "把冰箱發霉的蘋果拿去丟";
job.checked = "";
data.push(job);

renderData(data);

//select tab for filter job
tab.addEventListener('click', function(e){
    tabShow(e.target);
})

//delete done job
btn_del.addEventListener('click', function(e){
    e.preventDefault();
    let undo_job = data.filter(function(item){
        return item.checked !== "checked";
    })
    data = undo_job;
    // data.forEach(function(item, index){        
    //     if (item.checked == "checked"){
    //         data.splice(index, 1);
    //     }
                    
    // })
    tabDefault();
    renderData(data);
})

//set tab status
function tabShow(tab_obj){
    disableAllTab();
    tab_obj.setAttribute("class", "active");
    let jobFilter = data.filter(function(item){
        if (tab_obj.innerHTML == "待完成"){
            return item.checked == "";
        }else if (tab_obj.innerHTML == "已完成"){
            return item.checked == "checked";
        }else{
            return item;
        }
    })
    renderData(jobFilter);
}

function disableAllTab() {
    tab_li.forEach(function(item, index){
        item.setAttribute("class", "");
    })
}

function tabDefault(){
    disableAllTab();
    tab_all.setAttribute("class", "active");
}

//add job
btn_add.addEventListener('click', function(e){
    e.preventDefault();
    if (txt.value.trim() == "" ){
        alert("請輸入代辦事項！");
        return;
    }    
    let item = {};
    item.content = txt.value;
    item.checked = "";
    data.push(item);
    tabDefault();
    renderData(data);
    txt.value = "";
})

//del job
list.addEventListener('click', function(e){
    if (e.target.getAttribute("class") == "delete"){
        let idx = e.target.getAttribute("data-num");
        data.splice(idx, 1);
        renderData(data);
    }
    if (e.target.getAttribute("type") == "checkbox"){
        let idx = e.target.getAttribute("data-num");
        if (data[idx].checked == "checked") {
            data[idx].checked = "";
        } else {
            data[idx].checked = "checked";
        }
        countData();
    }
})

//list all job
function renderData(show_data) {
    let str = ""; 
    let undo_num = 0;
    show_data.forEach(function(item, index){
        if (item.checked == "") {
            undo_num += 1;
        }
        str += `
        <li>
            <label class="checkbox">
            <input type="checkbox" data-num="${index}" ${item.checked}/>
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
        </li>
        `;
    })    
    list.innerHTML = str;
    countData();
}

//count undo job
function countData() {
    let undo_num = 0;
    data.forEach(function(item){
        if (item.checked == "") 
            undo_num += 1;        
    })
    undo_txt.textContent = `${undo_num} 個待完成項目`;
}