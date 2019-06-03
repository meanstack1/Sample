$(document).ready(function(){
	//alert('hi')
	$(".edit").click(function(){
		var id =$(this).val();
		$.post("/edit",{no:id},function(data){
			location.reload("/");
		});
	});
	$(".remove").click(function(){
		var id =$(this).val();
		$.post("/remove",{no:id},function(data){
			alert("removed successfully")
			location.reload("/");

		});
	});
});