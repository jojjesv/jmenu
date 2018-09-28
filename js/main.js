/**
 * jMenu JS entry.
 * @author Johan Svensson
 */

$(() => {
  let busy = false;
  $('#refresh').click(() => {
    if (busy) {
      return;
    }
    busy = true;
    new Menu('#menu-root').fetch().then(() => {
      $('#task-indicator').remove();
      busy = false;
    });
  }).click();

  //  Init github ribbon
  $.get('./fork_me.html', d => {
    $(document.body).append(d);
  });
})