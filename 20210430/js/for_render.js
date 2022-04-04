// 登録ボタンが押された時、inputをブランクにして未完了リストに要素を生成して追加する

// 要素取得
let inputFormElm = document.querySelector(".input-form-wrapper");
let todoInputElm = document.getElementById("inputTodo");
let addButtonElm = document.getElementById("addButton");
let categorySelectBoxElm = document.getElementById("category");

// 未完了のtodoリスト要素
// 未完了のtodoアイテム配列
let incompleteListElm = document.getElementById("incompleteList");
let incompleteTodoItems = [];
let incompleteTodoNodes = [];
// 完了のtodoリスト要素
// 完了のtodoアイテム配列
const completeList = document.getElementById("completeList");
let completeTodoItems = [];
let completeTodoNodes = [];
addButtonElm.addEventListener("click", addTodoItem);

/************************************************************
登録ボタンがクリックされたときに発火する関数
*************************************************************/
function addTodoItem() {
  createTodoObject();
  createTodoElement();
  renderTodo(incompleteListElm, incompleteTodoNodes);
  categorySelectBoxElm.value = "0";
  // デバッグ用
  console.log(incompleteTodoItems);
  console.log(incompleteTodoNodes);
}


// todoアイテムを描画する関数
// 引数１：描画する親要素
// 引数２：描画する要素
function renderTodo(ParentElement, todoNodes) {
  let fragment = document.createDocumentFragment();
  for (let i=0; i<todoNodes.length; i++) {      
    fragment.appendChild(todoNodes[i]);
  }
  ParentElement.appendChild(fragment);
}


// incompleteTodoItemsの配列にtodoオブジェクトを追加する
function createTodoObject() {
  let todoItem = {
    title: todoInputElm.value,
    tag: categorySelectBoxElm.value,
    complete: false
  }
  incompleteTodoItems.push(todoItem);
}

function createTodoElement(todoItems) {
  let leftContentElm = makeElement("div", ["left-content"]);
  let categoryTagElm = makeElement("span", ["category-tag", setCategoryTagClass(categorySelectBoxElm.value)]);
  let todoTitleElm = makeElement("p", ["todo-title"]);
  leftContentElm.appendChild(categoryTagElm);
  leftContentElm.appendChild(todoTitleElm);
  
  let rightContentElm = makeElement("div", ["right-content"]);
  let moveCompleteButtonElm = makeElement("button", ["complete-button"], "完了にする");
  let deleteButtonElm = makeElement("button", ["delete-button"], "削除");
  rightContentElm.appendChild(moveCompleteButtonElm);
  rightContentElm.appendChild(deleteButtonElm);
  
  let todoItemElm = makeElement("li", ["todo-item"]);
  todoItemElm.appendChild(leftContentElm);
  todoItemElm.appendChild(rightContentElm);

  // setInnerText(categoryTagElm, tagValue);
  // setInnerText(todoTitleElm, todoValue);

  deleteButtonElm.addEventListener("click", deleteTodoItem);

  incompleteTodoNodes.push(todoItemElm);

  return todoItemElm;
}

// 要素のinnerTextにvalueをセットする関数
// 引数にはtodoのオブジェクト配列を渡す
function setEachValue(todoItems) {
  for (let i=0; i < todoItems.length; i++) {
    todoItems[i].tag
    todoItems[i].title
  }
}

function setInnerText(Element, Value) {
  Element.innerText = Value;
}

// if (isBlank(todoInputElm.value)) {
//   alert("TODOを入力してください。");
//   return;
// }
// if (isSelectedCategory(categorySelectBoxElm.value)) {
//   alert("カテゴリーを選択してください");
//   return;
// }

///////////////////////////////////////////////////////////

// 削除ボタンがクリックされたときに発火する関数
function deleteTodoItem(event, deleteSection) {
  let deleteItemElm = event.target.closest(".todo-item");
  let deleteItemTitle = deleteItemElm.querySelector(".todo-title").innerText;
  console.log(deleteItemElm);
  console.log(deleteItemTitle);

  for (let i=0; i < incompleteTodoItems.length; i++) {
    incompleteTodoItems[i]
  }
}

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
////////////////////////////////////////////////////////////


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

function resetValue(element) {
  element.value = "";
}