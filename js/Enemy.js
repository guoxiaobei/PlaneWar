/**
	创建敌方飞机
*/
function Enemy() {
	this.el 	= null;
	this.iTimer = null;
	this.iSpeed = 0;
	this.blood  = 0;
}
// 飞机类型
Enemy.prototype.small  = 1;
Enemy.prototype.middle = 2;
Enemy.prototype.large  = 3;
// 创建飞机
Enemy.prototype.create = function (type) {
	var
		oBox = $('box'),
		oEnemy = document.createElement('div');
	switch(type) {
		case Enemy.prototype.small:
			oEnemy.className = 'small';
			this.iSpeed = 10;
			this.blood = 1;
			this.die = ['images/plane1_die1.png', 'images/plane1_die2.png', 'images/plane1_die3.png'];
			break;
		case Enemy.prototype.middle:
			oEnemy.className = 'middle';
			this.iSpeed = 8;
			this.blood = 2;
			this.die = ['images/plane2_die1.png', 'images/plane2_die2.png', 'images/plane2_die3.png', 'images/plane2_die4.png'];
			break;
		case Enemy.prototype.large:
			oEnemy.className = 'large';
			this.iSpeed = 5;
			this.blood = 5;
			this.die = ['images/plane3_die1.png', 'images/plane3_die2.png', 'images/plane3_die3.png', 'images/plane3_die4.png', 'images/plane3_die5.png', 'images/plane3_die6.png'];
			break;
	}
	document.body.appendChild(oEnemy);

	// 随机创建位置
	oEnemy.style.top  = -oEnemy.offsetHeight + 'px';
	oEnemy.style.left = Math.round(Math.random() * (oBox.offsetWidth - oEnemy.offsetWidth)) + oBox.offsetLeft + 'px';

	this.el = oEnemy;

	// 将敌人放到Engine.enemies对象中
	var iKey = new Date().getTime();
	Engine.enemies[iKey] = this;

	this.key = iKey;

	return this;
}
// 运动飞机
Enemy.prototype.move = function () {
	let iWinH = document.documentElement.clientHeight;
	this.iTimer = setInterval(function () {
		this.el.style.top = this.el.offsetTop + this.iSpeed + 'px';

		// 判断飞机是否飞出界面
		if(this.el.offsetTop > iWinH) {
			this.destroy();
		}
	}.bind(this), 50);
}
// 销毁飞机
Enemy.prototype.destroy = function () {
	// 从对象中移除敌人
	delete Engine.enemies[this.key];

	// 清除定时器
	clearInterval(this.iTimer);

	// 死亡动画
	var
		iIndex = 0,
		iTimer = setInterval(function () {
		this.el.style.backgroundImage = 'url('+this.die[iIndex]+')';

		iIndex++;

		if(iIndex >= this.die.length) {
			clearInterval(iTimer);
			// 移除DOM节点
			document.body.removeChild(this.el);
		}
	}.bind(this), 100);
}