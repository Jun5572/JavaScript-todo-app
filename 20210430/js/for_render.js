// 要素取得
let inputFormElm = document.querySelector(".input-form-wrapper");
let todoInputElm = document.getElementById("inputTodo");
let addButtonElm = document.getElementById("addButton");
let sortButtonElm = document.getElementById("sortButton");
let searchButtonElm = document.getElementById("searchButton");
let categorySelectBoxElm = document.getElementById("category");

const incompleteListId = document.querySelector("#incompleteList").id;
const completeListId = document.querySelector("#completeList").id;
let lastId = 1;

// 操作元となるtodoリスト要素
let todoItemObjectArray = [];


// 登録されたtodoをオブジェクト配列へプッシュ
function addTodoObjectArray() {
  let todoItemObject = {
    id: lastId,
    title: todoInputElm.value,
    category: categorySelectBoxElm.value,
    isComplete: false
  }
  todoItemObjectArray.push(todoItemObject);
  lastId++;
  return todoItemObjectArray;
}

function removeTodoObjectArray(target) {
  let index = todoItemObjectArray.findIndex(todo => todo.id == target.id);
  todoItemObjectArray.splice(index, 1);
}

// ターゲットとなるtodoアイテムのステータスを変更
function changeStatus(target) {
  let index = todoItemObjectArray.findIndex(todo => todo.id == target.id);
  todoItemObjectArray[index].isComplete = !todoItemObjectArray[index].isComplete;
}

// todoアイテムをレンダーする関数
// originalData：レンダーするオブジェクト配列
// isComplete：true(完了) or false(未完了)
function renderTodo(originalData, isComplete) {
  let renderSelector = '';
  let renderTargets = [];
  let buttonSelector = '';
  let buttonText = '';
  let html = '';
  
  // isCompleteの状態によって表示させるセクションを変更
  if (!isComplete) {
    // complete:falseのtodoの配列が生成される
    renderTargets = originalData.filter( data => !data.isComplete);
    buttonClassName = "complete-button";
    buttonText = '完了にする';
    buttonSelector = ".complete-button";
    renderSelector = incompleteListId;
  } else {
    // complete:trueのtodoの配列が生成される
    renderTargets = originalData.filter( data => data.isComplete);
    buttonClassName = "incomplete-button";
    buttonText = '未完了にする';
    buttonSelector = ".incomplete-button";
    renderSelector = completeListId;
  }
  // htmlテキストを生成
  renderTargets.forEach(target => {
    let optionClassName = setCategoryTagClass(target.category);
    html +=`
      <li id=${target.id} class="todo-item">
        <div class="left-content">
          <span class="category-tag ${optionClassName}">${target.category}</span>
          <p class="todo-title">${target.title}</p>
        </div>
        <div class="right-content">
          <button class=${buttonClassName}>${buttonText}</button>
          <button class="delete-button">削除</button>
        </div>
      </li>
    `;
  });
  const element = document.getElementById(renderSelector);
  element.innerHTML = html;

  let todoItems = [...element.querySelectorAll(".todo-item")];
  if (todoItems) {
    todoItems.forEach(todoItem => {
      todoItem.querySelector(buttonSelector).addEventListener("click", switchTodoItem);
      todoItem.querySelector(".delete-button").addEventListener("click", deleteTodoItem);
    });
  }

}

///////////////////////////////////////////////////////////



// カテゴリーの種類によってタグの色分け
function setCategoryTagClass(selectValue) {
  let className;
  switch (selectValue) {
    case "仕事":
      className = "work";
    break;
    case "プライベート":
      className = "private";  
    break;
    case "家族":
      className = "family";
    break;
    case "その他":
      className = "other";
    break;
    default:
      className = "other";
    break;
    }
    return className;
  }
  
  
// 空欄かチェックする関数////////////////////
// 空欄：戻り値：true
// 空欄ではない：戻り値：false
function isBlank(value) {
  return value === "" ? true : false; 
}
/////////////////////////////////////////


// セレクトボックスが「選択してください」のまま送信されていないかチェック
function isSelectedCategory(selectValue) {
  return selectValue === "0" ? true : false;
}
/////////////////////////////////////////////////////////////




// 登録ボタンがクリックされたときに発火する関数
function addTodoItem() {
  addTodoObjectArray();
  renderTodo(todoItemObjectArray, false);
  renderTodo(todoItemObjectArray, true);
}

// 完了ボタンが押されたときに発火する関数
function switchTodoItem(event) {
  let target = event.target.closest(".todo-item");
  changeStatus(target);
  renderTodo(todoItemObjectArray, false);
  renderTodo(todoItemObjectArray, true);
}

// 削除ボタンがクリックされたときに発火する関数
function deleteTodoItem(event) {
  let target = event.target.closest(".todo-item");
  removeTodoObjectArray(target);
  renderTodo(todoItemObjectArray, false);
  renderTodo(todoItemObjectArray, true);
}

// 並べ替えボタンがクリックされたときに発火する関数
function sortTodo() {
  todoItemObjectArray.sort((first, second) => {
    let firstCategory = first.category;
    let secondCategory = second.category;
    
    if (firstCategory < secondCategory) {
      return -1;
    }
    if (firstCategory > secondCategory) {
      return 1;
    }
    return 0;
  })
  console.log("todoItemObjectArray=", todoItemObjectArray);
  renderTodo(todoItemObjectArray, false);
  renderTodo(todoItemObjectArray, true);
}

// 絞り込みボタンがクリックされたときに発火する関数
function searchTodo() {
  let resultTodos = '';
  let searchCategoryType = document.getElementById("searchType").value;
  console.log("絞込みカテゴリー", searchCategoryType);
  resultTodos = todoItemObjectArray.filter((todo) => todo.category == searchCategoryType);
  console.log("serchResult=",resultTodos);

}


// utility
// 要素を生成してクラスを付与する関数。value値が存在したらinnerTextにvalue値をセット
function makeElement(tagName, classNames, value) {
  let element = document.createElement(tagName);
  if (!classNames == "") {
    classNames.forEach(className => {
      element.classList.add(className);
    });
  }
  if (!value == "") {
    element.innerText = value;
  }
  return element;
}


addButtonElm.addEventListener("click", addTodoItem);
sortButtonElm.addEventListener("click", sortTodo);
searchButtonElm.addEventListener("click", searchTodo);

