var yo = require('yo-yo');
var moment = require('moment');
var translate = require('../translate');

module.exports = function pictureCard(pic){
  var el;

  function render(picture){
    return yo`<div class="card ${picture.liked ? 'liked' : ''}">
      <div class="card-image">
        <img class="activator" src="${picture.url}">
      </div>
      <div class="card-content">
        <a href="/${picture.user.username}" class="card-title">
          <img src="${picture.user.avatar}" class="avatar" />
          <span clss="username">${picture.user.username}</span>
        </a>
        <small class="right time">${translate.date.format(picture.createAt)}</small>
        <p>
          <a class="left" href="#" onclick=${like.bind(null, true)}><i class="fas fa-ban"></i></a>
          <a class="left" href="#" onclick=${like.bind(null, false)}><i class="fas fa-heart"></i></a>
          <span class="left likes">${translate.message('likes', { likes: picture.likes })}</span>
        </p>
      </div>
    </div>`;
  }

  function like(liked){
    pic.liked = liked;
    pic.likes += liked ? 1 : -1;
    var newEl = render(pic);
    yo.update(el, newEl);
    return false;
  }

  el = render(pic);
  return el;
}
