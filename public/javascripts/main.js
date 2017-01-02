$(function(){
  $('.addMore').click(function(){

    var model = $(this).attr('data-model');
    var max = $(this).attr('data-model-max');
    var container = '.itemAddContainer.add' + model;
    var child_item ='.itemAdd.add'+ model;
    console.log(child_item)
    if (max){
      if(max == $(container).children().length) return;
    }
    var new_item = $(child_item).first().clone();
    console.log(new_item);
    $(container).append(new_item);
  });
});