// 登録ボタンが押された時、inputをブランクにして未完了リストに要素を生成して追加する
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", addTodo);

function addTodo() {
  // inputタグ要素を取得
  const todoForm = document.getElementById("inputTodo");
  // inputタグのvalueを取得
  let inputText = todoForm.value;

  // inputタグの中身が空欄だった場合はここで処理終了
  if (inputText === "") return;

  // liタグ生成　todo-itemクラスを付与
  const li = document.createElement("li");
  li.className = "todo-item";

  // pタグ生成　todo-titleクラスを付与し、pタグ内にinputFormの値を格納
  const p = document.createElement("p");
  p.className = "todo-title";
  p.textContent = inputText;

  // 完了buttonを生成　complete-buttonクラスを付与
  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.textContent = "完了";
  // 完了ボタンのクリックイベントを登録
  completeButton.addEventListener("click", (e) => {
    // 完了ボタンが押されたpタグを取得するための記述
    const addTarget = e.target.closest(".todo-item");
    
    // liタグを生成
    const li = document.createElement("li");
    li.className = "todo-item";
    
    // pタグ生成
    const p = document.createElement("p");
    p.className = "todo-title";
    p.innerText = addTarget.firstElementChild.innerText;
    li.appendChild(p);
    
    // 戻すボタン生成 back-buttonクラスを付与
    const backButton = document.createElement("button");
    backButton.className = "back-button";
    backButton.textContent = "戻す";
    
    // 削除ボタンを生成 delete-buttonクラスを付与
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";
    
    // 削除ボタンのクリックイベントを登録
    deleteButton.addEventListener("click", (e) => {
      deleteTodo(e);
    });
    
    // 戻す・削除ボタン要素を内包するdiv要素を生成 option-buttonsクラスを付与
    const div = document.createElement("div");
    div.className = "option-buttons";
    div.appendChild(backButton);
    div.appendChild(deleteButton);    
    li.appendChild(div);

    const ul = document.getElementById("completeList");
    ul.appendChild(li);

    document.getElementById("incompleteList").removeChild(addTarget);
  });

  // 削除ボタンを生成 delete-buttonクラスを付与
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";
  // 削除ボタンのクリックイベントを登録
  deleteButton.addEventListener("click", (e) => {
    deleteTodo(e);
  });

  // 完了・削除ボタン要素を内包するdiv要素を生成 option-buttonsクラスを付与
  const div = document.createElement("div");
  div.className = "option-buttons";
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // liタグの子要素にpタグとdivタグを追加
  li.appendChild(p);
  li.appendChild(div);
  // incompleteListの子要素に生成したli要素を追加
  const ul = document.getElementById("incompleteList");
  ul.appendChild(li);

  // inputタグの内容を空にする
  todoForm.value = "";
};

function deleteTodo(event) {
  const deleteTarget = event.target.closest(".todo-item");
  deleteTarget.parentNode.removeChild(deleteTarget);
}