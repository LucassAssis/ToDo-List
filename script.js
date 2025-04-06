document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("input-txt");
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("list");
    const error = document.getElementById("error");

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll("#list .task-item").forEach((item) => {
            // Adiciona um objeto ao array Tasks
            const spanItem = item.querySelector(".task-text");
            tasks.push({
                // text é um propriedade, estamos pegando o primeiro filho do item, que é um nó de texto
                text: spanItem
                    .textContent,
                completed: item.classList.contains("complete"),
            });
        });
        // setItem salva o valor no array com uma chave identificadora
        // todoList serve pra identificar os dados no localStorage
        // stringify converte para string JSON
        localStorage.setItem("todoList", JSON.stringify(tasks));
    };

    const loadTasks = () => {
        const savedTasks = localStorage.getItem("todoList");
        if (savedTasks) {
            // Converte a string JSON para objeto JS novamente
            JSON.parse(savedTasks).forEach((task) => {
                const listItem = createTaskItem(task.text, task.completed);
                list.appendChild(listItem);
            });
        }
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            error.textContent = "Não é possível adicionar uma tarefa vazia";
            return;
        }
        error.textContent = "";

        const listItem = createTaskItem(taskText);
        list.appendChild(listItem);

        taskInput.value = "";
        taskInput.focus();

        reorderTasks();
        saveTasks();

    }

    const createTaskItem = (taskText, isCompleted = false) => {
        // Criar o li
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        const spanItem = document.createElement("span");
        spanItem.className = "task-text";
        if (taskText.length > 37) {
            spanItem.textContent = taskText.substring(0, 37) + "...";
        } else {
            spanItem.textContent = taskText;
        }
        if (isCompleted) {
            listItem.classList.add("complete");
            listItem.classList.add("opacity");
        }
        // Criar Botão "Completo"
        const completeBtn = document.createElement("button");
        completeBtn.className = "check-btn li-btn";

        // Imagem do botão "Completo"
        const imgCheck = document.createElement("img");
        imgCheck.src = "./imgs/check-icon.png";
        imgCheck.className = "icon-btn"
        imgCheck.draggable = false;

        // Lógica para adicionar/remover a classe "complete"
        completeBtn.addEventListener("click", () => {
            listItem.classList.toggle("complete");
            listItem.classList.toggle("opacity");

            reorderTasks();
            saveTasks();
        });

        // Criar Botão "Remover"
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn li-btn";
        removeBtn.addEventListener("click", () => {
            listItem.remove();
            saveTasks();
        });

        // Imagem do botão "Remover"
        const imgRemove = document.createElement("img");
        imgRemove.src = "./imgs/remove-icon.png";
        imgRemove.className = "icon-btn";
        imgRemove.draggable = false;

        // Div que conterá os botões
        const btnDiv = document.createElement("div");
        btnDiv.className = "btn-div";


        // Adicionando cada elemento em seu devido lugar
        btnDiv.append(completeBtn, removeBtn);
        completeBtn.appendChild(imgCheck);
        removeBtn.appendChild(imgRemove);
        listItem.appendChild(spanItem);
        listItem.appendChild(btnDiv);


        return listItem;
    };

    loadTasks();

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    const reorderTasks = () => {
        const tasks = document.querySelectorAll("#list .task-item");
        tasks.forEach((task) => {
            if (task.classList.contains("complete")) {
                list.appendChild(task); // Move a tarefa completa para o final
            }
        });
    };


});




