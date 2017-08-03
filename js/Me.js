/**
	我方飞机对象
*/
let Me = {
	el: null,
	frequency: null,
	create: function () {
		let me = document.createElement('div');
		me.className = 'me';
		document.body.appendChild(me);

		this.el = me;
	},
	show: function () {
		if(!this.el) {
			this.create();
		}

		let
			iWinW = document.documentElement.clientWidth,
			iWinH = document.documentElement.clientHeight;
		// 指定初始化的位置
		this.el.style.left = (iWinW - this.el.offsetWidth ) / 2 + 'px';
		this.el.style.top  = iWinH - this.el.offsetHeight + 'px';

		// 添加移动事件
		document.onmousemove = function (e) {
			let
				oBox = $('box'),
				ev = e || window.event,
				iLeft = ev.clientX - this.el.offsetWidth / 2;

			// 左侧边界
			if(iLeft < oBox.offsetLeft) {
				iLeft = oBox.offsetLeft;
			}

			// 右侧边界
			var iMax = oBox.offsetLeft + oBox.offsetWidth - this.el.offsetWidth;
			if(iLeft > iMax) {
				iLeft = iMax;
			}
			this.el.style.left = iLeft + 'px';
		}.bind(this);

		// 支持链式编程
		return this;
	},
	shoot: function () {
		setInterval(function () {
			new Bullet().create().move();
		}, this.frequency);
	}
};