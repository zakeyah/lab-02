'use strict';
const keywordsArr=[];


function Things (item){
  this.title=item.title,
  this.image_url=item.image_url,
  this.description=item.description,
  this.keyword=item.keyword,
  Things.all.push(this);
}
Things.all=[];
console.log(Things.all);

Things.prototype.render= function(){
  let template = $('#item-templet').html();
  let newItem = Mustache.render(template, this);
  return newItem;
};

Things.prototype.renderOptions= function(){
  if(!(keywordsArr.includes(this.keyword))){
    $('select').append(`<option>${this.keyword}</option>`);
    keywordsArr.push(this.keyword);
  }
};


$(document).ready(function () {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  const chosePage = num =>{
    $.ajax(`../data/page-${num}.json`, ajaxSettings)
      .then(data => {
        data.forEach(images => {
          let item = new Things(images);
          $('ul').append(item.render());
          item.renderOptions();
        });


  };
  chosePage(1);
  $('select').on('change', function() {
    let selectedValue = $(this).val();
    $('ul').empty();
    Things.all.forEach(elment=>{
      if(elment.keyword===selectedValue){
        $('ul').append(elment.render());
      }
    });

  });

  $('#page1').on('click', function(event) {
    event.preventDefault();
    chosePage(1);
    $('select').empty();
    $('ul').empty();
    // Things.all.forEach(item=>{
     
    //   // $('ul').append(elment.render());
    //   // elment.renderOptions();
    //   console.log(item.renderOptions());
    // });

  });

  $('#page2').on('click', function() {
    chosePage(2);
    // $('select').empty();
    $('ul').empty();
    // Things.all.forEach(elment=>{
     
    //   // $('ul').append(elment.render());
    //   elment.renderOptions();
    // });

  });








});


