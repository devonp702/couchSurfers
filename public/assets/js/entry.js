$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?entry=23)

  const urlArray = window.location.href.split("/");
  const userId = urlArray[urlArray.length - 1];
  const entryId = urlArray[urlArray.length - 2];
  let url = window.location.search;
  // let entryId;
  // Updating - t/f?
  var updating = false;

  // If this exists in our url, pull out the entry id from the url
  // In localhost:8080/?entry_id=1, entryId is 1
  // if (url.indexOf("?entry_id=") !== -1) {
    // entryId = urlArray[urlArray.length - 2];
    getEntryData(entryId);
  // }

  // Getting jQuery references to the entry body, title, form, and category select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var entryForm = $("#entry");
  var entryCategorySelect = $("#category");

  // Adding event listener on "Go to Blog" button
  $(document).on("click", "button.blogBtn", goToBlog);
  // $(document).on("click", "button.nav-link-blog", goToBlog);
  // $(document).on("click", "button.nav-link-resources", goToResources);
  // $(document).on("click", "button.nav-link-logout", goToLogout );
  // $(document).on("click", "button.nav-link-login", goToLogin );

  // Adding an event listener for when the form is submitted
  $(entryForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the entry if we are missing a body or a title
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newEntry object to hand to the database
    var newEntry = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      category: entryCategorySelect.val(),
      UserId: userId
    };

    console.log(newEntry);

    // If we're updating a entry run updateEntry to update an entry
    // Otherwise run submitEntry to create a whole new entry
    if (updating) {
      newEntry.id = entryId;
      updateEntry(newEntry);
    }
    else {
      submitEntry(newEntry);
    }
  });

  // Submits a new entry and brings user to blog page upon completion
  function submitEntry(Entry) {
    $.post("/api/entries/", Entry, function() {
      window.location.href = `/blog/${userId}`;
    });
  }

  // Gets entry data for a entry if we're editing
  function getEntryData(id) {
    $.get(`/api/entries/${entryId}/${userId}`, function(data) {
      if (data) {
        // If this entry exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        entryCategorySelect.val(data.category);

        // If we have a entry with this id, set a flag for us to know to update the entry
        // when we hit submit
        updating = true;
      }
    });
  }
  
// GRAB ID OF ENTRY, PUT ID INTO ROUTE ITSELF, 
  // Update a given entry, bring user to the blog page when done
  function updateEntry(entry) {
    $.ajax({
      method: "PUT",
      url: "/api/entries",
      data: entry
    })
      .then(function() {
        window.location.href = `/blog/${userId}`;
      });
  }

  function goToBlog() {
    window.location.href = `/blog/${userId}`;
  }
  // function goToResources() {
  //   window.location.href = `/resources/${userId}`;
  // }
  // function goToLogout() {
  //   window.location.href = `/logout`;
  // }
  // function goToLogin() {
  //     window.location.href = `/login`;
  // }
});