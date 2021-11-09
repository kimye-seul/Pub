var commonPub = {
	common : function(){
		setTimeout(function(){
			commonPub.footerFamilySite();

		},350)
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