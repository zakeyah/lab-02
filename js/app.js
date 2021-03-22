'use strect';
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
  $('ul').append(`<li>
             <h2>${this.title}</h2>
            <img src="${this.image_url}" alt="">
            <p>${this.description}</p>
            </li>`);
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

  $.ajax('../data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(images => {
        let item = new Things(images);
        item.render();
        item.renderOptions();
      });
    });

  $('select').on('click', function() {
    let selectedValue = $(this).val();
    $('ul').empty();
    for(let i =0 ; i<Things.all.length;i++){
      if(Things.all[i].keyword===selectedValue){
        Things.all[i].render();
      }
    }

  });





});


