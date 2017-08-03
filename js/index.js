window.onload = function () {
	var
		oList = $('list'),
		aLi = Array.from(oList.children);

	aLi.forEach(function (v) {
		v.onclick = function () {
			// 隐藏菜单
			oList.style.display = 'none';

			// 游戏初始化
			Engine.init();

			// 设置子弹的发射频率
			let iLevel = Number(this.getAttribute('data-level'));

			switch(iLevel) {
				case 1:
					Me.frequency = 100;
					break;
				case 2:
					Me.frequency = 200;
					break;
				case 3:
					Me.frequency = 500;
					break;
				case 4:
					Me.frequency = 800;
					break;
			}
		}
	});
}