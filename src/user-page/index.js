



import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import template from './template'

page('/:username', loadUser, header, function (ctx, next) {
  var main = document.getElementById('main-container');
  title(`RuniGram - ${ctx.params.username}`);
  empty(main).appendChild(template(ctx.user));
  $('.materialboxed').materialbox();
});

page('/:username/:id', loadUser, header, function (ctx, next) {
  var main = document.getElementById('main-container');
  title(`RuniGram - ${ctx.params.username}`);
  empty(main).appendChild(template(ctx.user));
  /*$('.modal').modal({
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
      },
    complete: function () {
      page(`/${ctx.params.username}`)
    }
  });*/

});

async function loadUser(ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
    next()
  } catch (err) {
    console.log(err)
  }
}
