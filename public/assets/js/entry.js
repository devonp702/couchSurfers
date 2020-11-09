$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?entry=23)

    console.log( window.location.search.substring(1).split("=")[1] )
    let url = window.location.search;
    let entryId;
    let userId;
    // Updating - t/f?
    var updating = false;
  
    // If this exists in our url, pull out the entry id from the url
    // In localhost:8080/?entry_id=1, entryId is 1
    if (url.indexOf("?entry_id=") !== -1) {
      entryId = url.split("=")[1];
      getEntryData(entryId);
      userId = url.split("=")[2];
      getEntryData(userId);
    }
  
    // Getting jQuery references to the entry body, title, form, and category select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var entryForm = $("#entry");
    var entryCategorySelect = $("#category");
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
        category: entryCategorySelect.val()
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
        window.location.href = "/blog";
      });
    }
  
    // Gets entry data for a entry if we're editing
    function getEntryData(id) {
      $.get("/api/entries/" + id, function(data) {
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
    
  
    // Update a given entry, bring user to the blog page when done
    function updateEntry(entry) {
      $.ajax({
        method: "PUT",
        url: "/api/entries",
        data: entry
      })
        .then(function(authUser) {
          window.location.href = "/blog?userid=" + authUser.id;
        });
    }
  });