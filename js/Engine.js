let LOGO = {
	el: null,
	create: function () {
		var oLogo = document.createElement('div');
		oLogo.className = 'logo';
		document.body.appendChild(oLogo);
		this.el = oLogo;
	},
	show: function () {
		if(!this.el) {
			this.create();
		}
		
		this.el.style.display = 'block';
	},
	hide: function () {
		this.el.style.display = 'none';
	}
};
/**
	游戏引擎，控制游戏的执行流程
*/
let Engine = {
	bullets:{}, // 存储创建出来的子弹
	enemies: {}, // 存储创建出来的飞机
	init: function () {
		alert('游戏就要开始咯！');

		// 背景图片开始运动
		this.bgMove();

		// 显示LOGO
		LOGO.show();

		// 加载进度条
		let
			iIndex = 1;
			oLoading = document.createElement('img'),
			iTimer = null;
		oLoading.src = 'images/loading1.png';
		oLoading.className = 'loading';
		document.body.appendChild(oLoading);

		// 让loading动起来
		iTimer = setInterval(function () {
			iIndex++;
			oLoading.src = 'images/loading' + iIndex +'.png';
			if(iIndex === 3) {
				iIndex = 0;
			}
		}, 300);

		// 开始游戏
		setTimeout(function () {
			// LOGO消失
			LOGO.hide();
			// 清除定时器
			clearInterval(iTimer);
			// 让加载动画消失
			document.body.removeChild(oLoading);

			// 创建敌我飞机
			Me.show().shoot();

			// 创建敌方飞机
			this.createEnemy();

			// 碰撞检测
			this.checkImpact();
		}.bind(this), 3000);
	},
	bgMove: function () {
		let
			oBox = $('box'),
			iPosY = 0;

		setInterval(function () {
			iPosY += 2;
			oBox.style.backgroundPosition = '0 ' + iPosY + 'px';
		}, 50);
	},
	createEnemy: function () {
		// 创建小型飞机
		setInterval(function () {
			Math.random() > 0.5 ? new Enemy().create(Enemy.prototype.small).move(): '';
		}, 1000);
		// 创建中型飞机
		setInterval(function () {
			Math.random() > 0.6 ? new Enemy().create(Enemy.prototype.middle).move(): '';
		}, 2000);
		// 创建大型飞机
		setInterval(function () {
			Math.random() > 0.7 ? new Enemy().create(Enemy.prototype.large).move(): '';
		}, 5000);
	},
	checkImpact: function () {
		setInterval(function () {
			for(var sBullet in Engine.bullets) {
				for(var sEnemy in Engine.enemies) {
					if(pz(Engine.bullets[sBullet].el, Engine.enemies[sEnemy].el)) {
						Engine.enemies[sEnemy].blood -= 1;

						// 销毁子弹
						Engine.bullets[sBullet].destroy();

						// 血量为0，则销毁飞机
						if(Engine.enemies[sEnemy].blood === 0) {
							Engine.enemies[sEnemy].destroy();
						}
						break;
					}
				}
			}
		}, 30);
	}
};