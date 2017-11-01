(function($) {

	/*==========
		Tab
	============*/

	var Tab = function(container, params) {

		if (!(this instanceof Tab)) return new Tab(container, params);

		//默认配置参数
		var defaults = {

			triggerType: "mouseover",
			effect: "default",
			invoke: 1,
			auto: 3000

		};

		params = params || {};

		for(var def in defaults) {
			if (typeof params[def] == "undefined") {
				params[def] = defaults[def];
			}
		};

		//tab
		var s = this;
		
		//params
		s.params = params;

		//container
		s.container = $(container);

		/*if (s.container.length === 0) return;
		if (s.container.length > 1) {
			s.container.each(function() {
				new Tab($(this), params);
			});
		}*/
		
		//保存单个Tab组件
		s.tab = s.container;
		
		//计数器
		s.loop = 0;

		//保存tab标签列表以及对应的内容
		s.tabItems = s.tab.find('.tab-nav li');
		s.contentItems = s.tab.find('.content-wrap .content-item');

		//设置默认显示位置
		if (s.params.invoke) {
			//计数器
			s.loop = s.params.invoke - 1;
			s.invoke(s.tabItems.eq(s.loop));
			
		}

		//绑定事件
		s.tabItems.on(s.params.triggerType, function() { 
			s.invoke($(this));
		});

		/*if (s.params.triggerType == "mouseover") {
			s.tabItems.on('mouseover', function() {
				
			})
		}
		else if (s.params.triggerType == "click") {
			s.tabItems.on('click', function() {
				alert(2);
			})
			
		}*/

		//自动播放
		if (s.params.auto) {
			//定时器
			s.timer = null;

			s.autoplay();

			s.tab.hover(
				function() {
					clearInterval(timer);
				},
				function() {
					s.autoplay();
				}
			);
			
		};

	};


	/*===========
	  Prototype
	============*/


	Tab.prototype = {

		constructor: Tab,

		//事件驱动函数
		invoke: function(currentTab) {
			var s = this,
				index = currentTab.index(),
				effect = s.params.effect,
				contentItems = s.contentItems;

			//tab选中状态
			currentTab.addClass('actived').siblings().removeClass('actived');

			//切换对应的内容区域以及切换效果
			if (effect === 'default') {
				contentItems.eq(index).addClass('current').siblings().removeClass('current');
			}
			else if (effect === 'fade') {
				contentItems.eq(index).fadeIn().siblings().fadeOut();
			}

			s.params.auto && (s.loop = index);
		
		},

		autoplay: function() {

			var s = this;
				maxLoop = s.tabItems.length - 1;
				interval = s.params.auto,
				tabItems = s.tabItems,
				timer = s.timer,
				loop = s.loop;

			timer = setInterval(function() {

				loop = (loop >= maxLoop) ? 0 : loop + 1;

				tabItems.eq(loop).triggerHandler(s.params.triggerType);

			}, interval)
		}

	}

	window.Tab = Tab;

})(jQuery);
