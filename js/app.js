'use strict';
let keywordsArr = [];


function Things(item) {
  this.title = item.title,
  this.image_url = item.image_url,
  this.description = item.description,
  this.keyword = item.keyword,
  this.horns = item.horns;
  Things.all.push(this);
}
Things.all = [];


Things.prototype.render = function () {
  let template = $('#item-templet').html();
  let newItem = Mustache.render(template, this);
  return newItem;
};

Things.prototype.renderOptions = function () {
  if (!(keywordsArr.includes(this.keyword))) {
    $('select').append(`<option>${this.keyword}</option>`);
    keywordsArr.push(this.keyword);
  }
};
const sortByTitle = arr => {
  return arr.sort(function (a, b) {
    return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0;
  });
};
const sortByHorns = arr => {
  return arr.sort(function (a, b) {
    return a.horns - b.horns;
  });
};

$('#by-title').on('change', function () {
  $('ul').empty();
  sortByTitle(Things.all);
  Things.all.forEach(item => {
    $('ul').append(item.render());
  });
});

$('#by-horns').on('change', function () {
  $('ul').empty();
  sortByHorns(Things.all);
  Things.all.forEach(item => {
    $('ul').append(item.render());
  });
});


$(document).ready(function () {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  const chosePage = num => {
    Things.all = [];
    keywordsArr = [];
    $.ajax(`./../data/page-${num}.json`, ajaxSettings)
      .then(data => {
        data.forEach(images => {
          let item = new Things(images);
          $('ul').append(item.render());
          item.renderOptions();
        });
        console.log('befor', Things.all);
      });

  };
  chosePage(1);
  $('select').on('change', function () {
    let selectedValue = $(this).val();
    $('ul').empty();
    Things.all.forEach(elment => {
      if (elment.keyword === selectedValue) {
        $('ul').append(elment.render());
      }
    });

  });

  $('#page1').on('click', function () {
    chosePage(1);
    $('select').empty();
    $('ul').empty();
    Things.all.forEach(item => {
      $('ul').append(item.render());
      item.renderOptions();
    });

  });

  $('#page2').on('click', function () {
    chosePage(2);
    $('select').empty();
    $('ul').empty();
    Things.all.forEach(elment => {
      $('ul').append(elment.render());
      elment.renderOptions();
    });

  });








});


