$(function() {
  // var bucketList = {};
  
  // function renderBucketItem(item) {
  //   return ""
  //   + "<div class='bucket-thing'>"
  //   + "  <img class='bucket-thing__img' src='"+item.img+"'/>"
  //   + "  <div class='bucket-thing__name'>"+item.name+"</div>"
  //   + "  <div class='bucket-thing__price'>"+item.price+"</div>"
  //   + "  <div class='bucket-thing__count'>"+item.count+"</div>"
  //   + "</div>";
  // }

  // function addToBucketList(id) {
  //   if (!bucketList[id]) {
  //     bucketList[id] = 0;
  //   }
  //   bucketList[id] += 1;
  // }

  // function updateBucketList() {
  //   var $bucketList = $('#bucket-list');
  //   $bucketList.empty();

  //   Object.keys(bucketList)
  //     .forEach(function(id) {
  //       var thing = window.thingById[id];
  //       $(renderBucketItem(Object.assign({}, thing, {count: bucketList[id]})))
  //         .appendTo($bucketList)
  //     })

  //   $('#bucket-preview__count').html(
  //     Object.keys(bucketList)
  //       .reduce(function(acc, key) {
  //         return acc + bucketList[key];
  //       }, 0)
  //   );
  // }

  $('.thing__btn-add').click(function() {
    var id = $(this).parent('.thing').attr('data-id');
    window.addItem(id);
  });
});