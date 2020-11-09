$(document).ready(function () {
  //get the user id from the url string
  let userId = window.location.search.substring(1).split("=")[1]
  console.log(userId);


  // blogContainer holds all of our blog entries
  const blogContainer = $(".blog-container");
  const entryCategorySelect = $("#category");

  $(document).on("click", "button.newEntry", goToEntry);
  $(document).on("click", "button.delete", handleEntryDelete);
  $(document).on("click", "button.edit", handleEntryEdit);
  entryCategorySelect.on("change", handleCategoryChange);
  var entries;

  // This function grabs posts from the database and updates the view
  function getEntries(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/entries" + categoryString, function (data) {
      console.log("Entries", data);
      entries = data;
      if (!entries || !entries.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete blog entries
  function deleteEntry(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/entries/" + id
    })
      .then(function () {
        getEntries(entryCategorySelect.val());
      });
  }

  // Getting the initial list of posts
  getEntries();

  // InitializeRows handles appending all of our constructed post HTML inside of blogContainer
  function initializeRows() {
    blogContainer.empty();
    let entriesToAdd = [];
    for (var i = 0; i < entries.length; i++) {
      entriesToAdd.push(createNewRow(entries[i]));
    }
    blogContainer.append(entriesToAdd);
  }

  // This function constructs a postcard's HTML
  function createNewRow(entry) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<h5>");
    newPostCategory.text(entry.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
        "-15px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(entry.title + " ");
    newPostBody.text(entry.body);
    var formattedDate = new Date(entry.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do, YYYY");
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("entry", entry);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deleteEntry function
  function handleEntryDelete() {
    let currentEntry = $(this)
      .parent()
      .parent()
      .data("entry");
    deleteEntry(currentEntry.id);
  }

  // This function figures out which blog entry we want to edit
  function handleEntryEdit() {
    var currentEntry = $(this)
      .parent()
      .parent()
      .data("entry");
    window.location.href = "/entry?entry_id=" + currentEntry.id;
  }

  // This function displays a message when there are no posted entries
  function displayEmpty() {
    blogContainer.empty();
    const messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No blog entries, click <a href='/entry'>here</a> to write the first one.");
    blogContainer.append(messageH2);
  }

  // This function reloads new entries when the category changes
  function handleCategoryChange() {
    let newEntryCategory = $(this).val();
    getEntries(newEntryCategory);
  }

  // This function sends user to the New Entry page
  function goToEntry() {
    window.location.href = "/entry?userid=" + userId;
  }
});