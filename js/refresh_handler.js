/**
 * Allows the user to refresh the menu with keyboard shortcuts.
 */

$(window).keydown(e => {
  if (e.ctrlKey && e.keyCode == 77) {
    //  Reloaded
    console.log("Refreshing menu");

    e.preventDefault();

    $("html, body").animate({ scrollTop: 0 }, window.scrollY, () => {
      $('#refresh').click();
    })
  }
})