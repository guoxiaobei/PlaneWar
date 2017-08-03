/**
	创建子弹的构造函数
*/
function Bullet() {
	this.el = null;
	this.iTimer = null;
}
/**
	创建子弹
*/
Bullet.prototype.create = function () {
	let
		oBullet = document.createElement('div');
	oBullet.className = 'bullet';
	document.body.appendChild(oBullet);

	// 初始化子弹所在的位置
	oBullet.style.left = Me.el.offsetLeft + Me.el.offsetWidth / 2 - oBullet.offsetWidth / 2 + 'px';
	oBullet.style.top  = Me.el.offsetTop - oBullet.offsetHeight + 'px';

	this.el = oBullet;

	// 将子弹存储到Engine中
	var iKey = new Date().getTime();
	Engine.bullets[iKey] = this;
	this.key = iKey;

	return this;
}
/**
	移动子弹
*/
Bullet.prototype.move = function () {
	this.iTimer = setInterval(function () {
		this.el.style.top = this.el.offsetTop - 10 + 'px';

		// 判断子弹是否飞出界面
		if(this.el.offsetTop < -this.el.offsetHeight) {
			this.destroy();
		}
	}.bind(this), 50);
}
/**
销毁子弹
*/
Bullet.prototype.destroy = function () {
	// 将子弹从数组中移除
	delete Engine.bullets[this.key];
	// 清除定时器
	clearInterval(this.iTimer);
	// 将节点从页面中移除
	document.body.removeChild(this.el);
}