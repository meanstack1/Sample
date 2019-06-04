$(document).ready(function(){
	$('.remove').click(function(){
		//alert("clicked");
	var id=$(this).val();
	// alert("hi");
	$.post("/remove",{no:id},function(data){
		location.reload('/');

	});
	});
	$('.edit').click(function(){
		var id=$(this).val();
		//alert(id);
		$.post("/edit",{no:id},function(data){
		 alert(data);
		var a=JSON.stringify(data);
		//alert(a);
		 var parseddata=JSON.parse(a);
		 alert(parseddata[0].rollno);
		$("#id").val(parseddata[0]._id);
		$("#username").val(parseddata[0].username);
		$("#mail").val(parseddata[0].mail);
		$("#rollno").val(parseddata[0].Rollno);
		$("#password").val(parseddata[0].password);
		});
		$(".dontshow").show();
	});	
});