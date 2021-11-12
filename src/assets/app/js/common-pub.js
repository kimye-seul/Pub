var commonPub = {
	common : function(){
		setTimeout(function(){
			commonPub.footer.footerFamilySite();
			commonPub.footer.pageTop();

		},350)
	},

	//header
	header : {

	},

	//footer
	footer : {
		//탑버튼
		pageTop : function(){
			$('#footer .btn_top').off('click').on('click',function(){
				$('html,body').animate({
					scrollTop : 0
				},800)
			})
		},

		// 패밀리사이트
		footerFamilySite : function() {
			var btnFamily = $('#footer .btn_family');
			var listFamily = $('#footer').find('.family_list');
			btnFamily.on('click',function(){
				$(this).toggleClass('on');
				listFamily.slideToggle(300);
			});
			listFamily.find('ul').mCustomScrollbar();
		},	
	}
}