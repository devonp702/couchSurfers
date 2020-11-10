$(document).ready(function() {
    const urlArray = window.location.href.split("/");
    const userId = urlArray[urlArray.length - 1];
    $(document).on("click", "button.nav-link-blog", goToBlog);
    $(document).on("click", "button.nav-link-resources", goToResources);
    $(document).on("click", "button.nav-link-logout", goToLogout );
    $(document).on("click", "button.nav-link-login", goToLogin );

    function goToBlog() {
        window.location.href = `/blog/${userId}`;
    }

    function goToResources() {
        window.location.href = `/resources/${userId}`;
    }
    function goToLogout() {
        window.location.href = `/logout`;
    }
    function goToLogin() {
        window.location.href = `/login`;
    }
})