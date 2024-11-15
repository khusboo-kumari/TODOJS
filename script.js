function startTodo() {
    const headerPart = document.querySelector('.headerPart'); 
    const input = document.getElementById('input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todoList');

    headerPart.addEventListener("submit", (e) => {
        e.preventDefault();
        if ( input.value.length > 0) {
            console.log(input.value);
            addTask(input.value);
        }
        input.value = ""; 
    });

  // Add an additional event listener for the 'Enter' key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.length > 0) {
        e.preventDefault();  // Prevent the default form submission
        console.log(input.value);
        addTask(input.value);
        input.value = "";  // Clear the input after adding the task
    }
});


    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (input.value.length > 0) {
            addTask(input.value);
            console.log(input.value);
        }
        input.value = ""; 
    });

    function addTask(task, status = false) {
        task = task.trim();
        if (!task) {  // Check if task is empty or whitespace-only
            alert("Task cannot be blank!");
            return;  // Exit the function if task is invalid
        }
        const taskContainer = document.createElement('div');
        taskContainer.classList.add("task-items");

        const span = document.createElement('span'); 
        const img1 = document.createElement('img'); 
        const img2 = document.createElement('img'); 
        const img3 = document.createElement('img');  // edit

        span.innerText = task;
        span.title = task;

        img1.src = status ? "https://img.icons8.com/?size=100&id=11221&format=png&color=40C057" : "https://img.icons8.com/ios-filled/50/000000/checkmark.png"; 
        img2.src = "https://img.icons8.com/ios-filled/50/000000/delete.png"; 
        img3.src = "https://img.icons8.com/ios-filled/50/000000/edit.png";  // edit  

        img1.alt = "check"; 
        img2.alt = "delete"; 
        img3.alt = "edit";  // edit  

     
        img1.addEventListener("click", () => {
            console.log("checked");
        
            // Toggle between incomplete and completed checkmarks based on the current icon state
            if (img1.src.includes("checkmark.png")) {
                // If the current image is the incomplete state, switch to completed (green check)
                img1.src = "https://img.icons8.com/?size=100&id=11221&format=png&color=40C057";
                todoList.appendChild(taskContainer);
            } else {
                // If the current image is the green check, switch back to the incomplete state
                img1.src = "https://img.icons8.com/ios-filled/50/000000/checkmark.png";
                todoList.insertBefore(taskContainer, todoList.firstChild); // Move to the top of the list when unchecked 
            }
        
            syncTask();
        });
        
        img2.addEventListener("click", () => {
            console.log("delete");
            taskContainer.remove();
            syncTask();
        });

        img3.addEventListener("click", () => {
            console.log("edit");

            if (img3.alt === "edit") {
                const editableInput = document.createElement('input');
                editableInput.type = "text";
                editableInput.value = span.innerText;
                editableInput.classList.add('edit-input');
                span.replaceWith(editableInput);
                editableInput.focus();

                img3.src = "https://img.icons8.com/?size=100&id=84065&format=png&color=40C057";
                img3.alt = "save";

                editableInput.addEventListener("blur", () => {
                    span.innerText = editableInput.value;
                    editableInput.replaceWith(span);
                    img3.src = "https://img.icons8.com/ios-filled/50/000000/edit.png";
                    img3.alt = "edit";
                    syncTask();
                });

                editableInput.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        span.innerText = editableInput.value;
                        editableInput.replaceWith(span);
                        img3.src = "https://img.icons8.com/ios-filled/50/000000/edit.png";
                        img3.alt = "edit";
                        syncTask();
                    }
                });
            }
        });

        img1.className = "check"; 
        img2.className = "delete"; 
        img3.className = "edit";  // edit  

        taskContainer.append(span, img1, img2, img3); 
        todoList.append(taskContainer); 
        todoList.insertBefore(taskContainer, todoList.firstChild);  // Move to the top of the list when added 

        syncTask();
    }

    function syncTask() {
        const currentTasks = document.querySelectorAll(".task-items");
        const taskArr = [];
        currentTasks.forEach((task) => {
            const label = task.querySelector("span").innerText; 
            const status = task.querySelector("img[alt='check']").src.includes("completed"); 
            taskArr.push({ label, status }); 
        });
        localStorage.setItem("tasks", JSON.stringify(taskArr)); 
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; 
        savedTasks.forEach((task) => {
            addTask(task.label, task.status); 
        }); 
    }

    loadTasks();
}

startTodo();
