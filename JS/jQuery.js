jQuery(document).ready(function($) {
	
	$(".sub-nav li a").on("click", function(){

		$this = $(this);

		if (!$this.hasClass('active'))
		{
			$this.parent().siblings().find(".active").removeClass('active').find('img').remove();
			$this.addClass('active').append('<img src="assets/arrow.png">');
		}
	});

	$.ajax({
		url: 'team.xml',
		type: 'GET',
		dataType: 'xml',
		
		success: function(data){

			team_member = $(data).find("team member");
			team = $(".team");
			
			team_member.each(function(){

				$this = $(this);

				team.append("<div class='member-wrapper'><img class='member-image' src='" + $this.find("image").text() + 
							"'/><a class='member' href='#'><span class='member-name'>" + 
							$this.find("name").text() + "</span><span class='member-title'>" + 
							$this.find("jtitle").text() + "</span></a></div><div class='member-detail'><div class='member-name-title'><span class='member-name'>" + 
							$this.find("name").text() + "</span><span class='member-title'>" + 
							$this.find("jtitle").text() + "</span></div><div class='close'>Close</div><div class='member-description'></div></div>");
			});

			$(".member-image, .member").on("click", function(){	

					$this = $(this);
					
					if(!$this.parent().hasClass('active-member'))
					{
						$this.parent().addClass('active-member').next(".member-detail").addClass('active-member');
						$this.parent().siblings(".member-wrapper").addClass('inactive-member');

						index = $this.parent().index()/2 + 1;
						description = $(data).find("desc").eq(index-1).text();
						$this.parent().next(".member-detail").find(".member-description").text(description);
						$this.parent().next(".member-detail").slideDown();
					}
			});

			$(".close").on("click", function(){

				$this = $(this);
				$this.parent().slideUp();
				$this.parents(".team").children().removeClass('inactive-member').removeClass('active-member');

			});
		},

		error: function(){
			alert("Loading data error!");
		}
	});
});