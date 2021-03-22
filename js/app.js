//you should have constructor
//then you should have a method for renderning 

// new array -> put the unique keywords try to use include keywords then use thei array to put the optioon
//array.include continue 

function Things (title,url,description,keyword){
  this.title=title,
  this.url=url,
  this.description=description,
  this.keyword=keyword,
  Things.all.push(this);
}
Things.all=[];
console.log(Things.all);
Things.prototype.render= function(){
  $('ul').append(`<li>
             <h2>${this.title}</h2>
            <img src="${this.url}" alt="">
            <p>${this.description}</p>
            </li>`);
};

Things.prototype.renderOptions= function(){
  const arr =[];
  if(arr.includes(this.keyword)){
    //   continue;
  }else{
    $('select').append(`<option>${this.keyword}</option>`);
    arr.push(this.keyword);
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
        let item = new Things(images.title,images.image_url,images.description,images.keyword);
        item.render();
        item.renderOptions();
      });
    });

  $('select').on('click', function() {
    const newArr=[];
    let selectedValue = $(this).val();
    newArr.push(selectedValue);
    console.log(newArr);
    newArr.forEach(element=>{
      if (element.keyword===selectedValue) {
          
        }
    });
    for (let i = 0; i < newArr.length; i++) {
        // $('ul').append(`<li><img src=${newArr[i].image_url}></li>`);
    }
});





});


