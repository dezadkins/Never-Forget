export const updateTaskSummary = async (tasks) => {
  //overwrite innerHTML of the incompleted container with the incompleted tasks num
  const taskCountContainer = document.querySelector(".task-num");

  let completedTasks = tasks.filter((task) => {
    return task.isComplete;
  });
  let incompleteTasks = tasks.length - completedTasks.length;
  taskCountContainer.innerHTML = incompleteTasks;

  //overwrite innerHTML of the completed container with the completed tasks num
  const tasksCompletedContainer = document.querySelector(".task-num-completed");

  tasksCompletedContainer.innerHTML = completedTasks.length;

  //overwrite innerHTML of the estimated time container with the estimated time for incomplete tasks
  const estimatedTimeContainer = document.querySelector(".task-time");

  let estimatedTime = 0;
  tasks.forEach((task) => {
    if (!task.isComplete) {
      estimatedTime += task.estimate;
    }
  });

  if (estimatedTime < 99) {
    estimatedTimeContainer.innerHTML = estimatedTime + "min";
  } else {
    //hours with one decimal
    let hours = Math.floor((estimatedTime / 60) * 10) / 10;
    estimatedTimeContainer.innerHTML = `${hours}hrs`;
  }

  //THIS CHANGES LIST TITLE
  let listId = localStorage.getItem("never-forget-currentList");
  let listTitleContainer = document.querySelector(".all-tas");

  let webPageTitle

  if (listId === "null") {
    listTitleContainer.innerHTML = "All Tasks";
    webPageTitle = `Never Forget - All Tasks`
  } else if (listId.startsWith("search:")) {
    listTitleContainer.innerHTML = `Task results for: "${listId.slice(7)}"`;
    webPageTitle = `Never Forget - Search For: ${listId.slice(7)}`
  } else {
    //fetch the user's lists
    const res = await fetch("/lists");
    let resObj = await res.json();
    let listArray = resObj.allLists;

    //filter for the targeted list
    const currentList = listArray.filter((list) => {
      return list.id == listId;
    });
    listTitleContainer.innerHTML = currentList[0].title;
    webPageTitle = `Never Forget - ${currentList[0].title}`
  }

  // Set webpage title
  document.querySelector('title').innerText = webPageTitle
};
